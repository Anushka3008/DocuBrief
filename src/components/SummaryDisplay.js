import React from 'react';

const SummaryDisplay = ({ summary, error }) => {
  if (error) {
    return (
      <div
        className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 
                   border border-rose-200 shadow-md text-rose-800"
        role="alert"
      >
        <strong className="font-bold text-lg">Oops!</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  if (summary) {
    return (
      <div
        className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 
                   border border-indigo-100 shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-purple-200 pb-2">
          Summary
        </h2>
        <div className="summary-content text-gray-800 leading-relaxed whitespace-pre-wrap">
          {summary}
        </div>
      </div>
    );
  }

  return null;
};

export default SummaryDisplay;
