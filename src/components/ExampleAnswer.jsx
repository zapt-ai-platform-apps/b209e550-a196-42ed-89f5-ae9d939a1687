import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { createEvent } from '../supabaseClient';

export default function ExampleAnswer({ question }) {
  const [showExampleAnswer, setShowExampleAnswer] = useState(false);
  const [exampleAnswer, setExampleAnswer] = useState('');
  const [loadingExampleAnswer, setLoadingExampleAnswer] = useState(false);

  const handleShowExampleAnswer = async () => {
    if (exampleAnswer) {
      setShowExampleAnswer(true);
      return;
    }
    setLoadingExampleAnswer(true);
    try {
      const prompt = `
Provide an example of a full-mark answer for the following A-Level Physics question in markdown format.

Question:
${question}
`;
      const response = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'text',
      });
      setExampleAnswer(response.response);
      setShowExampleAnswer(true);
    } catch (error) {
      console.error('Error fetching example answer:', error);
      alert('An error occurred while fetching the example answer.');
    } finally {
      setLoadingExampleAnswer(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleShowExampleAnswer}
        className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${
          loadingExampleAnswer ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loadingExampleAnswer}
      >
        {loadingExampleAnswer ? 'Loading Example Answer...' : 'Show Example Answer'}
      </button>
      {showExampleAnswer && exampleAnswer && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Example Answer</h3>
          <ReactMarkdown className="prose">{exampleAnswer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}