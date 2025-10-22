import React, { useState } from 'react';
import Header from '../components/Header';

const Toolkit = () => {
  const [activeTab, setActiveTab] = useState('appetite');

  return (
    <div className="min-h-screen bg-bg">
      <Header title="Toolkit" />

      <main className="max-w-[1680px] mx-auto p-5.5 space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('appetite')}
            className={`px-3.5 py-2.5 border border-border rounded-xl font-bold cursor-pointer ${
              activeTab === 'appetite'
                ? 'bg-gradient-to-b from-brand-2 to-brand border-transparent text-white'
                : 'bg-white'
            }`}
          >
            Appetite Builder
          </button>
          <button
            onClick={() => setActiveTab('wordings')}
            className={`px-3.5 py-2.5 border border-border rounded-xl font-bold cursor-pointer ${
              activeTab === 'wordings'
                ? 'bg-gradient-to-b from-brand-2 to-brand border-transparent text-white'
                : 'bg-white'
            }`}
          >
            Wordings Creator & Picker
          </button>
        </div>

        {activeTab === 'appetite' && (
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
            <h3 className="text-xl font-bold mb-4">Appetite Builder</h3>
            <p className="text-muted">Build business rules and appetite templates.</p>
          </div>
        )}

        {activeTab === 'wordings' && (
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
            <h3 className="text-xl font-bold mb-4">Wordings Creator & Picker</h3>
            <p className="text-muted">Create and manage policy wordings.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Toolkit;
