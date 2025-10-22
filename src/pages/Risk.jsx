import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const Risk = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-bg">
      <Header title={`Risk ${id}`} />

      <main className="max-w-[1680px] mx-auto p-5.5 space-y-4">
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
