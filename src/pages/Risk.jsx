import React from 'react';
import { useParams } from 'react-router-dom';

const Risk = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="max-w-7xl mx-auto space-y-6">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-[0_10px_30px_rgba(17,20,24,.06),0_2px_8px_rgba(17,20,24,.04)]">
          <h2 className="text-2xl font-bold mb-4">Risk Detail</h2>
          <p className="text-muted">Risk ID: {id}</p>
          <p className="text-muted mt-4">This is a placeholder for the risk detail page.</p>
        </div>
      </main>
    </div>
  );
};

export default Risk;
