import React, { useState, useEffect } from 'react';
import { generateSummary } from './services/apiAccess';
import { processFile } from './services/fileProcessor';
import FileUploader from './components/FileUploader';
import SummaryDisplay from './components/SummaryDisplay';
import './App.css';
import './loader.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');
  const [fileName, setFileName] = useState('');

  // Process the file when it is selected
  useEffect(() => {
    const handleFileProcessing = async () => {
      if (file) {
        setLoading(true);
        setError(null);
        setSummary('');

        try {
          const documentText = await processFile(file);
          const generatedSummary = await generateSummary(documentText, summaryLength);
          setSummary(generatedSummary);
        } catch (e) {
          setError(e.message);
          console.error('Error during file processing or summary generation:', e);
        } finally {
          setLoading(false);
        }
      }
    };
    handleFileProcessing();
  }, [file, summaryLength]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-2xl p-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl border border-gray-100">
        
        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-xl sm:text-2xl font-semibold mb-2 text-gray-500 font-serif">
            Hi! Welcome to
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-pink-400 tracking-tight mb-4">
            DocuBrief
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
            Get smart summaries in an instant.
          </p>
        </header>
        
        {/* File Uploader */}
        <FileUploader onFileChange={setFile} fileName={fileName} />

        {/* Controls */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <label htmlFor="summary-length" className="text-gray-700 font-semibold">
              Summary Length:
            </label>
            <select
              id="summary-length"
              className="form-select block w-auto min-w-[120px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={summaryLength}
              onChange={(e) => setSummaryLength(e.target.value)}
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex items-center space-x-2">
              <div className="loader"></div>
              <span className="text-sm text-gray-500 font-medium">Generating summary...</span>
            </div>
          )}
        </div>
        
        {/* Summary Display */}
        <SummaryDisplay summary={summary} error={error} />
      </div>
    </div>
  );
};

export default App;