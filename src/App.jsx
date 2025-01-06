import React, { useState } from 'react';
import QuestionForm from './components/QuestionForm';
import ResultDisplay from './components/ResultDisplay';

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">A-Level Physics Marking App</h1>
      <QuestionForm setResult={setResult} />
      {result && <ResultDisplay result={result} />}
      <footer className="mt-8">
        <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
}