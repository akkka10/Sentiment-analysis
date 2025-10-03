
import React from 'react';
import { AnalysisResult, Sentiment } from '../types';
import SentimentIcon from './SentimentIcon';

interface AnalysisResultCardProps {
  result: AnalysisResult;
}

const sentimentDetails = {
  [Sentiment.Positive]: {
    label: 'Positive',
    textColor: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    progressColor: 'bg-green-500',
  },
  [Sentiment.Negative]: {
    label: 'Negative',
    textColor: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    progressColor: 'bg-red-500',
  },
  [Sentiment.Neutral]: {
    label: 'Neutral',
    textColor: 'text-gray-500',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    progressColor: 'bg-gray-500',
  },
};

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ result }) => {
  const details = sentimentDetails[result.sentiment];
  const scorePercentage = (result.score * 100).toFixed(0);

  return (
    <div className={`w-full max-w-md p-6 rounded-2xl shadow-lg border ${details.borderColor} ${details.bgColor} dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 ease-in-out`}>
      <div className="flex flex-col items-center space-y-4">
        <SentimentIcon sentiment={result.sentiment} />
        <h2 className="text-2xl font-bold dark:text-white">Analysis Result</h2>
        <p className={`text-4xl font-extrabold ${details.textColor}`}>{details.label}</p>
        <div className="w-full text-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Confidence Score</p>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${details.progressColor} transition-all duration-500 ease-out`}
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">{scorePercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultCard;
