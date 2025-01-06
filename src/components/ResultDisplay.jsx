import React from 'react';
import MarkScheme from './MarkScheme';
import ExampleAnswer from './ExampleAnswer';

export default function ResultDisplay({ result }) {
    return (
        <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Your Result</h2>
            <p className="mb-2">
                <strong>Mark Awarded:</strong> {result.mark} / {result.total_marks}
            </p>
            <div className="mb-4">
                <strong>Rationale:</strong>
                <p>{result.rationale}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
                <MarkScheme question={result.question} />
                <ExampleAnswer question={result.question} />
            </div>
        </div>
    );
}