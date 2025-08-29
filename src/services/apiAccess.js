const API_KEY = process.env.REACT_APP_API_KEY;

// Helper to wait for a specified time
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateSummary = async (text, length) => {
  if (!API_KEY) {
    throw new Error("API key is missing. Please set API_KEY in your .env file.");
  }

  const promptMap = {
    'short': `Summarize the following document in 2-3 sentences, highlighting only the most critical information.`,
    'medium': `Provide a concise, 4-6 sentence summary of the following document, including key points and main ideas.`,
    'long': `Generate a detailed summary of the following document in 8-10 sentences, ensuring all essential information and supporting details are included.`
  };

  const prompt = `${promptMap[length]}\n\nDocument:\n\n${text}`;
  const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
  const payload = { contents: chatHistory };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

  let retries = 0;
  let delay = 1000;
  const maxRetries = 5;

  while (retries < maxRetries) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429) { // rate limit
          await sleep(delay);
          delay *= 2;
          retries++;
          continue;
        }
        throw new Error(`API response was not ok: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      const candidateText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidateText) return candidateText;

      throw new Error('No summary found in the API response.');

    } catch (e) {
      if (retries >= maxRetries - 1) throw e;
      retries++;
      await sleep(delay);
      delay *= 2;
    }
  }
};
