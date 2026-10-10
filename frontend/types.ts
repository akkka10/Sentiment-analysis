
export enum Sentiment {

  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
}

export interface AnalysisResult {
  sentiment: Sentiment;
  score: number;
}
