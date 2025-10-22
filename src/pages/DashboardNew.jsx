import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardNew = () => {
  const navigate = useNavigate();

  // Seed data
  const SEED = [
    {id:"a0",insured:"Atlas Foods Group",broker:"Howden",lob:"Property",product:"Food & Bev Package",biz:"Renewal",eff:"2025-10-01",premium:190000,stage:"Cleared",age:"5h",priority:"Medium",channel:"Broker"},
    {id:"a1",insured:"Orion AeroSystems",broker:"Crestline Broking",lob:"Property",product:"Aviation PAR",biz:"New",eff:"2025-11-01",premium:980000,stage:"Quoted",age:"3d",priority:"High",channel:"Broker"},
    {id:"a2",insured:"Hyperion Biotech",broker:"Apex Risk Partners",lob:"Specialty",product:"Life Science Liability",biz:"New",eff:"2025-12-12",premium:460000,stage:"Submissions",age:"1d",priority:"Medium",channel:"Direct"},
    {id:"a3",insured:"Neptune Offshore Wind",broker:"Westshore Willis",lob:"Marine",product:"Offshore Construction",biz:"Renewal",eff:"2025-12-31",premium:1875000,stage:"Bound",age:"6h",priority:"High",channel:"Broker"},
    {id:"a4",insured:"Lumenova Data Centers",broker:"Cairnstone",lob:"Property",product:"NatCat Excess",biz:"Renewal",eff:"2025-10-30",premium:1320000,stage:"Bound",age:"5d",priority:"High",channel:"Direct"},
    {id:"a5",insured:"Phoenix Rail & Freight",broker:"Gullwing Re",lob:"Casualty",product:"Excess Liability",biz:"New",eff:"2025-11-05",premium:720000,stage:"Quoted",age:"4d",priority:"Medium",channel:"MGA"},
    {id:"a6",insured:"Vivid Motors EV",broker:"Aon Global",lob:"Specialty",product:"Tech E&O",biz:"New",eff:"2025-11-20",premium:540000,stage:"Submissions",age:"1d",priority:"High",channel:"Broker"},
    {id:"a7",insured:"Evergreen Supermarkets",broker:"Lockton City",lob:"Property",product:"Retail Package",biz:"Renewal",eff:"2025-12-01",premium:310000,stage:"Submissions",age:"7h",priority:"Medium",channel:"Direct"},
    {id:"a8",insured:"Silverline Hospitality",broker:"Marsh Europe",lob:"Property",product:"Hotels PAR",biz:"New",eff:"2025-10-12",premium:880000,stage:"Quoted",age:"2d",priority:"High",channel:"Broker"},
    {id:"a9",insured:"NorthSea Energy",broker:"Aon Offshore",lob:"Marine",product:"Offshore Construction",biz:"Renewal",eff:"2025-12-31",premium:1750000,stage:"Bound",age:"2d",priority:"High",channel:"Broker"}
  ];

  const [data] = useState(SEED);
  const [filters, setFilters] = useState({
    stage: '',
    biz: '',
    lob: '',
    priority: '',
    search: ''
  });

  const currency = (n) => (+n).toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter(r => {
      const okStage = !filters.stage || r.stage === filters.stage;
      const okBiz = !filters.biz || r.biz === filters.biz;
      const okLOB = !filters.lob || r.lob === filters.lob;
      const okPri = !filters.priority || r.priority === filters.priority;
      const okQ = !filters.search ||
        [r.insured, r.broker, r.product, r.lob, r.stage, r.biz, r.priority, String(r.premium)]
          .join(' ').toLowerCase().includes(filters.search.toLowerCase());
      return okStage && okBiz && okLOB && okPri && okQ;
    });
  }, [data, filters]);

  // KPIs
  const kpis = useMemo(() => {
    const bounds = filteredData.filter(r => r.stage === 'Bound').reduce((a, b) => a + (+b.premium || 0), 0);
    const quoted = filteredData.filter(r => r.stage === 'Quoted').reduce((a, b) => a + (+b.premium || 0), 0);
    const inbound = filteredData.filter(r => r.stage === 'Submissions').length;
    const newPrem = filteredData.filter(r => r.biz === 'New').reduce((a, b) => a + (+b.premium || 0), 0);
    const renPrem = filteredData.filter(r => r.biz === 'Renewal').reduce((a, b) => a + (+b.premium || 0), 0);
    return [
      { label: 'Written', value: bounds, type: 'currency' },
      { label: 'Quoted', value: quoted, type: 'currency' },
      { label: 'Inbound (7d)', value: inbound, type: 'number' },
      { label: 'New', value: newPrem, type: 'currency' },
      { label: 'Renewal', value: renPrem, type: 'currency' }
    ];
  }, [filteredData]);

  // Chart data
  const chartData = useMemo(() => {
    const byStage = { 'Cleared': 0, 'Submissions': 0, 'Quoted': 0, 'Bound': 0 };
    filteredData.forEach(r => {
      if (byStage[r.stage] !== undefined) byStage[r.stage] += +r.premium || 0;
    });

    const newCount = filteredData.filter(r => r.biz === 'New').length;
    const renCount = filteredData.filter(r => r.biz === 'Renewal').length;

    return { byStage, newVsRenewal: { New: newCount, Renewal: renCount } };
  }, [filteredData]);

  const resetFilters = () => {
    setFilters({
      stage: '',
      biz: '',
      lob: '',
      priority: '',
      search: ''
    });
  };

  const BarChart = ({ data, labels }) => {
    const max = Math.max(...Object.values(data), 1);
    const width = 600;
    const height = 220;
    const padding = 30;
    const barWidth = (width - 2 * padding) / labels.length * 0.6;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[220px]">
        {labels.map((label, i) => {
          const value = data[label] || 0;
          const x = padding + i * ((width - 2 * padding) / labels.length) + ((width - 2 * padding) / labels.length - barWidth) / 2;
          const barH = (height - 70) * (value / max);

          return (
            <g key={label}>
              <rect
                x={x}
                y={height - 40 - barH}
                width={barWidth}
                height={barH}
                rx="6"
                ry="6"
                fill="#750006"
              />
              <text
                x={x + barWidth / 2}
                y={height - 20}
                fontSize="12"
                fill="#6B757E"
                textAnchor="middle"
              >
                {label}
              </text>
              <text
                x={x + barWidth / 2}
                y={height - 48 - barH}
                fontSize="12"
                fill="#2A2F33"
                textAnchor="middle"
              >
                {typeof value === 'number' && value >= 1000 ? currency(value) : value}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="max-w-7xl mx-auto space-y-6">
        {/* Filters */}
        <section className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
          <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
            <strong>Filters</strong>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white cursor-pointer font-bold hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
          <div className="px-4 py-3.5">
            <div className="flex gap-2 flex-wrap">
              <select
                value={filters.stage}
                onChange={(e) => setFilters({...filters, stage: e.target.value})}
                className="px-3 py-2 rounded-lg border border-border bg-white cursor-pointer font-bold"
              >
                <option value="">Stage: All</option>
                <option>Cleared</option>
                <option>Submissions</option>
                <option>Quoted</option>
                <option>Bound</option>
              </select>
              <select
                value={filters.biz}
                onChange={(e) => setFilters({...filters, biz: e.target.value})}
                className="px-3 py-2 rounded-lg border border-border bg-white cursor-pointer font-bold"
              >
                <option value="">Business: All</option>
                <option>New</option>
                <option>Renewal</option>
              </select>
              <select
                value={filters.lob}
                onChange={(e) => setFilters({...filters, lob: e.target.value})}
                className="px-3 py-2 rounded-lg border border-border bg-white cursor-pointer font-bold"
              >
                <option value="">LOB: All</option>
                <option>Property</option>
                <option>Casualty</option>
                <option>Specialty</option>
                <option>Marine</option>
              </select>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="px-3 py-2 rounded-lg border border-border bg-white cursor-pointer font-bold"
              >
                <option value="">Priority: All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                placeholder="Search…"
                className="px-3 py-2 rounded-lg border border-border bg-white font-bold"
              />
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="grid grid-cols-5 gap-4">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="relative flex items-center justify-between border border-border rounded-xl bg-white p-4 shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
              <div>
                <div className="text-xs text-muted uppercase tracking-[0.12em]">{kpi.label}</div>
                <div className="text-[28px] font-extrabold">
                  {kpi.type === 'currency' ? currency(kpi.value) : kpi.value}
                </div>
              </div>
              <div className="font-extrabold text-green">↑</div>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section className="grid grid-cols-[1.3fr_1fr] gap-4">
          <div className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
            <div className="px-4 py-3.5 border-b border-border">
              <strong>Premium by Stage</strong>
            </div>
            <div className="px-4 py-3.5">
              <BarChart data={chartData.byStage} labels={['Cleared', 'Submissions', 'Quoted', 'Bound']} />
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
            <div className="px-4 py-3.5 border-b border-border">
              <strong>New vs Renewal Count</strong>
            </div>
            <div className="px-4 py-3.5">
              <BarChart data={chartData.newVsRenewal} labels={['New', 'Renewal']} />
            </div>
          </div>
        </section>

        {/* Team Book Table */}
        <section className="bg-surface border border-border rounded-2xl shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
          <div className="px-4 py-3.5 border-b border-border">
            <strong>Team Book</strong>
          </div>
          <div className="px-4 py-3.5">
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Client</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">LOB</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Product</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">New/Renewal</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Stage</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Est. Premium</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Priority</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Broker</th>
                    <th className="px-2.5 py-2.5 border-b border-border text-xs uppercase tracking-[0.12em] text-muted text-left">Effective</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => navigate(`/risk/${r.id}`)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.insured}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.lob}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.product}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.biz}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.stage}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{currency(r.premium)}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.priority}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.broker}</td>
                      <td className="px-2.5 py-2.5 border-b border-border text-sm">{r.eff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardNew;
