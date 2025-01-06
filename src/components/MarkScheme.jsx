import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { createEvent } from '../supabaseClient';

export default function MarkScheme({ question }) {
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [markScheme, setMarkScheme] = useState('');
  const [loadingMarkScheme, setLoadingMarkScheme] = useState(false);

  const handleShowMarkScheme = async () => {
    if (markScheme) {
      setShowMarkScheme(true);
      return;
    }
    setLoadingMarkScheme(true);
    try {
      const prompt = `
Provide the official A-Level Physics mark scheme for the following question in markdown format.

Question:
${question}
`;
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });
      setMarkScheme(response.response);
      setShowMarkScheme(true);
    } catch (error) {
      console.error('Error fetching mark scheme:', error);
      alert('An error occurred while fetching the mark scheme.');
    } finally {
      setLoadingMarkScheme(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleShowMarkScheme}
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer mb-2 sm:mb-0 ${
          loadingMarkScheme ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loadingMarkScheme}
      >
        {loadingMarkScheme ? 'Loading Mark Scheme...' : 'Show Mark Scheme'}
      </button>
      {showMarkScheme && markScheme && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Mark Scheme</h3>
          <ReactMarkdown className="prose">{markScheme}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}