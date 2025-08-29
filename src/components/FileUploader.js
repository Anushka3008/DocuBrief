import React from 'react';

const FileUploader = ({ onFileChange, fileName }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileChange(droppedFile);
    }
  };

  return (
    <div 
      className="relative p-10 text-center cursor-pointer rounded-2xl bg-gradient-to-br from-pink-100 via-blue-50 to-pink-100 border border-pink-100 shadow-md"
      onClick={() => document.getElementById('file-input').click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <svg
        className="mx-auto h-16 w-16 text-pink-300 mb-4"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-20"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mt-4 text-lg text-gray-700 font-semibold">
        <span className="text-pink-400 font-bold">Drag & Drop</span> your file here
      </p>
      <p className="text-sm text-gray-500 mt-1">or click to browse</p>
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => onFileChange(e.target.files[0])}
      />

      {fileName && (
        <div className="mt-6 text-center text-md text-gray-700 font-medium">
          Selected file: <span className="text-purple-600">{fileName}</span>
        </div>
      )}
    </div>
  );
};

export default FileUploader;