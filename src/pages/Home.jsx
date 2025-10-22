import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();

  const SEED = [
    {id:"a0",insured:"Atlas Foods Group",broker:"Howden",lob:"Property",product:"Food & Bev Package",biz:"Renewal",eff:"2025-10-01",premium:190000,stage:"Cleared",priority:"Medium"},
    {id:"a1",insured:"Orion AeroSystems",broker:"Crestline Broking",lob:"Property",product:"Aviation PAR",biz:"New",eff:"2025-11-01",premium:980000,stage:"Quoted",priority:"High"},
    {id:"a2",insured:"Hyperion Biotech",broker:"Apex Risk Partners",lob:"Specialty",product:"Life Science Liability",biz:"New",eff:"2025-12-12",premium:460000,stage:"Submissions",priority:"Medium"},
  ];

  const currency = (n) => (+n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});

  return (
    <div className="min-h-screen bg-bg">
      <Header title="Home" />

      <main className="max-w-[1680px] mx-auto p-5.5 space-y-4">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
          <h2 className="text-2xl font-bold mb-4">Welcome to Underwriting Workbench</h2>
          <p className="text-muted">Navigate through the app using the menu above.</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {SEED.map(r => (
            <div key={r.id} onClick={() => navigate(`/risk/${r.id}`)} className="bg-white border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="font-bold mb-2">{r.insured}</div>
              <div className="text-sm text-muted mb-2">{r.product}</div>
              <div className="text-xs text-muted">{currency(r.premium)}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
