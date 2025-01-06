export const buildPrompt = (question, answer) => `
You are an A-Level Physics examiner. Given the following student answer, mark it according to the official mark scheme and provide a detailed rationale for each mark awarded.

Question:
${question}

Student Answer:
${answer}

Provide the output in JSON format with the following structure:
{
  "mark": <number>,
  "total_marks": <number>,
  "rationale": "detailed explanation"
}
`;