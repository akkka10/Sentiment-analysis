
export enum Sentiment {
  // Positive = 'POSITIVE',
  // Negative = 'NEGATIVE',
  // Neutral = 'NEUTRAL',
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
}

export interface AnalysisResult {
  sentiment: Sentiment;
  score: number;
}
