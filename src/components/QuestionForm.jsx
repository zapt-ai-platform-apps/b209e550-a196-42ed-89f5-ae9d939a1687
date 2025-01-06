import React, { useState } from 'react';
import { sendChatGPTRequest } from '../utils/api';
import { buildPrompt } from '../utils/promptBuilder';

export default function QuestionForm({ setResult }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    setLoading(true);

    const prompt = buildPrompt(question, answer);

    try {
      const response = await sendChatGPTRequest(prompt);
      console.log('Result:', response);
      setResult({ ...response, question });
    } catch (error) {
      alert('An error occurred while processing your answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
          Question
        </label>
        <textarea
          id="question"
          className="w-full p-2 border border-gray-300 rounded box-border"
          rows="4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the physics question here..."
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">
          Your Answer
        </label>
        <textarea
          id="answer"
          className="w-full p-2 border border-gray-300 rounded box-border"
          rows="6"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer here..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Marking...' : 'Submit'}
      </button>
    </form>
  );
}