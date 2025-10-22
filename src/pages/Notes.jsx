import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Save, Plus, Search, X } from 'lucide-react';

const Notes = () => {
  const [searchParams] = useSearchParams();
  const riskId = searchParams.get('id') || 'default';

  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyNotes, setShowMyNotes] = useState(true);

  const currentUser = 'Marin Nikolla';

  // Load notes from localStorage
  useEffect(() => {
    const key = `notes_${riskId}`;
    try {
      const stored = localStorage.getItem(key);
      const loadedNotes = stored ? JSON.parse(stored) : [];

      // Seed if empty
      if (loadedNotes.length === 0) {
        const now = Date.now();
        const demo = [
          {id:'n1',title:'General note for underwriting risk',text:'Lorem ipsum dolor sit amet consectetur. Turpis id dui donec eros ultricies pretium nisi lectus massa...',tags:['General note'],files:[],user:currentUser,ts:now-4*3600000,version:2},
          {id:'n2',title:'Interesting information',text:'Short research snippet...',tags:['Underwriting research'],user:currentUser,ts:now-24*3600000,version:1},
          {id:'n3',title:'Broker information for rating',text:'Broker contact and approach...',tags:['Broker contact'],user:currentUser,ts:now-26*3600000,version:1}
        ];
        setNotes(demo);
        localStorage.setItem(key, JSON.stringify(demo));
      } else {
        setNotes(loadedNotes);
      }
    } catch {
      setNotes([]);
    }
  }, [riskId]);

  // Save notes to localStorage
  const saveNotes = (updatedNotes) => {
    const key = `notes_${riskId}`;
    localStorage.setItem(key, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const timeAgo = (ts) => {
    const d = Math.floor((Date.now() - ts) / 86400000);
    if (d > 0) return `${d} days ago`;
    const h = Math.floor((Date.now() - ts) / 3600000);
    if (h > 0) return `${h} hours ago`;
    const m = Math.floor((Date.now() - ts) / 60000);
    return `${m || 1} mins ago`;
  };

  const newNote = () => {
    const note = {
      id: 'n' + Date.now(),
      title: 'New note',
      text: '',
      tags: [],
      files: [],
      user: currentUser,
      ts: Date.now(),
      version: 1
    };
    const updated = [note, ...notes];
    saveNotes(updated);
    setCurrentNote(note);
  };

  const saveCurrentNote = (silent = false) => {
    if (!currentNote) return;

    const updated = notes.map(n => n.id === currentNote.id ? {...currentNote, version: (currentNote.version || 1) + 1} : n);
    saveNotes(updated);
    setCurrentNote({...currentNote, version: (currentNote.version || 1) + 1});
    if (!silent) alert('Saved');
  };

  const openNote = (id) => {
    const note = notes.find(n => n.id === id);
    if (note) setCurrentNote({...note});
  };

  const addTag = () => {
    const tag = prompt('New tag');
    if (!tag || !currentNote) return;
    setCurrentNote({...currentNote, tags: [...(currentNote.tags || []), tag]});
  };

  const removeTag = (index) => {
    if (!currentNote) return;
    const newTags = [...currentNote.tags];
    newTags.splice(index, 1);
    setCurrentNote({...currentNote, tags: newTags});
    saveCurrentNote(true);
  };

  const filteredNotes = notes.filter(n => {
    const matchesQuery = !searchQuery ||
      (n.title + n.text + (n.tags || []).join(' ')).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUser = !showMyNotes || n.user === currentUser;
    return matchesQuery && matchesUser;
  }).sort((a, b) => b.ts - a.ts);

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-[360px_1fr] gap-4">
          {/* Left: List */}
          <section className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
            <div className="px-3.5 py-3 border-b border-border flex justify-between items-center">
              <button onClick={newNote} className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-white cursor-pointer font-bold hover:bg-gray-50">
                <Plus size={16} /> New note
              </button>
              <button onClick={() => saveCurrentNote()} className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-white cursor-pointer font-bold hover:bg-gray-50">
                <Save size={16} /> Save
              </button>
            </div>
            <div className="px-3.5 py-3">
              <div className="flex gap-2">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setSearchQuery(searchQuery)}
                  placeholder="Search notes, tags… (Enter)"
                  className="flex-1 px-2.5 py-2.5 border border-border rounded-lg bg-white"
                />
                <button className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-white cursor-pointer font-bold hover:bg-gray-50">
                  <Search size={16} /> Search
                </button>
              </div>
              <div className="mt-2.5">
                <label className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-full text-xs bg-white">
                  <input
                    type="checkbox"
                    checked={showMyNotes}
                    onChange={(e) => setShowMyNotes(e.target.checked)}
                  />
                  My notes
                </label>
              </div>
              <div className="mt-2.5 space-y-2.5">
                {filteredNotes.length === 0 ? (
                  <div className="text-muted">No notes yet.</div>
                ) : (
                  filteredNotes.map(n => (
                    <div
                      key={n.id}
                      onClick={() => openNote(n.id)}
                      className="border border-border rounded-xl p-2.5 cursor-pointer hover:shadow-[0_6px_16px_rgba(17,20,24,.06)]"
                    >
                      <div className="text-xs text-muted">{timeAgo(n.ts)}</div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-full text-xs bg-white my-1.5">
                        General note
                      </div>
                      <div className="font-extrabold">{n.title}</div>
                      <div className="text-sm text-muted line-clamp-3">{n.text}</div>
                      <div className="text-xs text-muted mt-1.5">Created by {n.user || '—'}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Right: Viewer */}
          <section className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)] min-h-[500px]">
            <div className="px-3.5 py-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-full text-xs bg-white">
                  👤 Assigned to <strong>{currentUser}</strong>
                </span>
                <span className="text-muted text-sm">This note needs to be assigned to self to enable editing</span>
              </div>
              <div className="flex gap-1.5 mt-2">
                {currentNote?.tags?.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-full text-xs bg-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-3.5 py-3">
              <div className="flex gap-1.5 mb-2">
                {currentNote?.tags?.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-full text-xs bg-white">
                    {tag}
                    <button onClick={() => removeTag(idx)} className="hover:text-brand">×</button>
                  </span>
                ))}
                <button onClick={addTag} className="inline-flex items-center gap-2 px-2.5 py-1 border border-border rounded-lg bg-white cursor-pointer font-bold text-xs hover:bg-gray-50">
                  + Tag
                </button>
              </div>
              <input
                value={currentNote?.title || ''}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                placeholder="Note title"
                className="w-full px-2.5 py-2.5 border border-border rounded-lg bg-white mb-2.5"
              />
              <div className="mt-2.5">
                <input
                  type="file"
                  multiple
                  className="w-full px-2.5 py-2.5 border border-border rounded-lg bg-white"
                />
              </div>
              <textarea
                value={currentNote?.text || ''}
                onChange={(e) => setCurrentNote({...currentNote, text: e.target.value})}
                placeholder="Write your note…"
                className="w-full h-[280px] px-2.5 py-2.5 border border-border rounded-lg bg-white mt-2.5 resize-none"
              />
              <div className="text-muted text-sm mt-2">
                {currentNote ? `Date created: ${new Date(currentNote.ts).toLocaleString()}${currentNote.version ? ` (Version ${currentNote.version})` : ''}` : ''}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Notes;
