import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const WorkQueue = () => {
  const navigate = useNavigate();

  const SEED = [
    {id:"a0",insured:"Atlas Foods Group",broker:"Howden",lob:"Property",product:"Food & Bev Package",biz:"Renewal",eff:"2025-10-01",premium:190000,stage:"Cleared",priority:"Medium",channel:"Broker"},
    {id:"a1",insured:"Orion AeroSystems",broker:"Crestline Broking",lob:"Property",product:"Aviation PAR",biz:"New",eff:"2025-11-01",premium:980000,stage:"Quoted",priority:"High",channel:"Broker"},
    {id:"a2",insured:"Hyperion Biotech",broker:"Apex Risk Partners",lob:"Specialty",product:"Life Science Liability",biz:"New",eff:"2025-12-12",premium:460000,stage:"Submissions",priority:"Medium",channel:"Direct"},
    {id:"a3",insured:"Neptune Offshore Wind",broker:"Westshore Willis",lob:"Marine",product:"Offshore Construction",biz:"Renewal",eff:"2025-12-31",premium:1875000,stage:"Bound",priority:"High",channel:"Broker"},
    {id:"a4",insured:"Lumenova Data Centers",broker:"Cairnstone",lob:"Property",product:"NatCat Excess",biz:"Renewal",eff:"2025-10-30",premium:1320000,stage:"Bound",priority:"High",channel:"Direct"},
    {id:"a5",insured:"Phoenix Rail & Freight",broker:"Gullwing Re",lob:"Casualty",product:"Excess Liability",biz:"New",eff:"2025-11-05",premium:720000,stage:"Quoted",priority:"Medium",channel:"MGA"},
    {id:"a6",insured:"Vivid Motors EV",broker:"Aon Global",lob:"Specialty",product:"Tech E&O",biz:"New",eff:"2025-11-20",premium:540000,stage:"Submissions",priority:"High",channel:"Broker"},
    {id:"a7",insured:"Evergreen Supermarkets",broker:"Lockton City",lob:"Property",product:"Retail Package",biz:"Renewal",eff:"2025-12-01",premium:310000,stage:"Submissions",priority:"Medium",channel:"Direct"}
  ];

  const STAGES = ['Cleared', 'Submissions', 'Quoted', 'Bound'];
  const [data, setData] = useState(SEED);
  const [search, setSearch] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);

  const currency = (n) => (+n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});

  const filteredData = data.filter(r => {
    if (!search) return true;
    return [r.insured, r.broker, r.product, r.lob, r.stage].join(' ').toLowerCase().includes(search.toLowerCase());
  });

  const byStage = STAGES.reduce((acc, stage) => {
    acc[stage] = filteredData.filter(r => r.stage === stage);
    return acc;
  }, {});

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    if (!draggedItem) return;

    setData(data.map(r => r.id === draggedItem.id ? {...r, stage: newStage} : r));
    setDraggedItem(null);
  };

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'bg-brand text-white';
    if (priority === 'Low') return 'bg-gray-400 text-white';
    return 'bg-muted text-white';
  };

  const getStageClass = (stage) => {
    if (stage === 'Cleared') return 'bg-gray-200 text-gray-800';
    if (stage === 'Submissions') return 'bg-blue text-white border-transparent';
    if (stage === 'Quoted') return 'bg-amber text-white border-transparent';
    if (stage === 'Bound') return 'bg-green text-white border-transparent';
    return 'bg-gray-100';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="max-w-7xl mx-auto space-y-6">
        <div className="sticky top-24 z-40 flex items-center gap-2.5 p-2.5 bg-white border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
          <div className="flex-1 flex gap-2 items-center bg-white border border-border rounded-xl px-3 py-2.5">
            <Search size={18} className="text-grey" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cards by client, broker, product..."
              className="flex-1 border-none outline-none text-sm"
            />
          </div>
        </div>

        <section className="grid grid-cols-4 gap-4">
          {STAGES.map(stage => (
            <div
              key={stage}
              className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)] flex flex-col min-h-[80vh] transition-shadow hover:shadow-[0_12px_30px_rgba(17,20,24,.08),0_4px_12px_rgba(17,20,24,.06)]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-border bg-gray-50">
                <strong>{stage}</strong>
                <span className="text-xs text-muted">{byStage[stage].length}</span>
              </div>
              <div className="flex-1 p-4 space-y-3 overflow-visible">
                {byStage[stage].length === 0 ? (
                  <div className="text-center text-muted italic py-10">Drop risks here</div>
                ) : (
                  byStage[stage].map(r => (
                    <div
                      key={r.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, r)}
                      onClick={() => navigate(`/risk/${r.id}`)}
                      className="bg-white border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all hover:transform hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(17,20,24,.12)]"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-semibold ${getStageClass(r.stage)}`}>
                          {r.stage}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-2xl border border-border text-xs ${getPriorityClass(r.priority)}`}>
                          {r.priority}
                        </span>
                      </div>
                      <div className="font-bold text-base mb-2 leading-tight">{r.insured}</div>
                      <div className="text-sm text-muted mb-2">{r.product} • {r.lob}</div>
                      <div className="text-xs text-muted mb-3">{currency(r.premium)} • {r.broker}</div>
                      <div className="px-3 py-2 bg-gray-50 rounded-lg text-xs text-muted border-l-[3px] border-brand">
                        <div className="flex justify-between items-center">
                          <span>In {r.stage}</span>
                          <span className="font-semibold text-brand">2d</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default WorkQueue;
