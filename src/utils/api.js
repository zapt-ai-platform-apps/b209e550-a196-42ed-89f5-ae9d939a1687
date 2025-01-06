import { createEvent } from '../supabaseClient';

export const sendChatGPTRequest = async (prompt) => {
  try {
    const result = await createEvent('chatgpt_request', {
      prompt: prompt,
      response_type: 'json',
    });
    return result.response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};