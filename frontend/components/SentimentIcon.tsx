
import React from 'react';
import { Sentiment } from '../types';

interface SentimentIconProps {
  sentiment: Sentiment;
}

const SentimentIcon: React.FC<SentimentIconProps> = ({ sentiment }) => {
  const iconData = {
    [Sentiment.Positive]: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    [Sentiment.Negative]: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    [Sentiment.Neutral]: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const { bgColor, textColor, icon } = iconData[sentiment];

  return (
    <div className={`flex items-center justify-center h-16 w-16 rounded-full ${bgColor} ${textColor}`}>
      {icon}
    </div>
  );
};

export default SentimentIcon;
