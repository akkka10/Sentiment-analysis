
// import { AnalysisResult, Sentiment } from '../types';

// // This is a mock service. In a real application, you would use axios or fetch
// // to call your backend API here.
// export const analyzeText = (text: string): Promise<AnalysisResult> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!text.trim()) {
//         reject(new Error('Text cannot be empty.'));
//         return;
//       }

//       // Mock logic to determine sentiment
//       const positiveWords = ['happy', 'excellent', 'good', 'great', 'love', 'amazing', 'beautiful'];
//       const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'disaster'];

//       const words = text.toLowerCase().split(/\s+/);
//       let score = 0;

//       words.forEach(word => {
//         if (positiveWords.includes(word)) score++;
//         if (negativeWords.includes(word)) score--;
//       });

//       let sentiment: Sentiment;
//       if (score > 0) {
//         sentiment = Sentiment.Positive;
//       } else if (score < 0) {
//         sentiment = Sentiment.Negative;
//       } else {
//         sentiment = Sentiment.Neutral;
//       }

//       const mockResult: AnalysisResult = {
//         sentiment,
//         score: Math.min(Math.abs(score) / 5, 1), // Normalize score to be between 0 and 1
//       };

//       resolve(mockResult);
//     }, 1500); // Simulate network delay
//   });
// };
// // services / sentimentService.ts
import axios from 'axios';
import type { AnalysisResult, Sentiment } from '../types';

// This function now calls a real backend API.
export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  // IMPORTANT: Replace this URL with the actual URL of your backend endpoint.
  const API_ENDPOINT = 'http://localhost:5000/api/analyze';
  if (!API_ENDPOINT) {
    throw new Error('API endpoint is not configured.');
  }


  try {
    // We send a POST request to our backend.
    // The second argument is the data we're sending, called the "body".
    // The backend will expect the text inside an object, e.g., { "text": "some words" }
    const response = await axios.post<AnalysisResult>(API_ENDPOINT, { text: text });

    // Axios automatically puts the JSON response from the server in the `data` property.
    console.log(response.data)
    return response.data;

  } catch (error) {
    // If the network request fails or the server sends an error...
    if (axios.isAxiosError(error) && error.response) {
      // The backend probably sent a specific error message.
      throw new Error(error.response.data.message || 'An error occurred during analysis.');
    } else {
      // A generic network error occurred.
      throw new Error('Could not connect to the sentiment analysis service.');
    }
  }
};