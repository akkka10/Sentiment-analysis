
import React, { useState, useRef, useCallback } from 'react';
import { analyzeText } from './services/sentimentService';
import { AnalysisResult } from './types';
import Spinner from './components/Spinner';
import AnalysisResultCard from './components/AnalysisResultCard';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileText = e.target?.result as string;
        setText(fileText);
        setError(null);
        setResult(null);
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
      };
      reader.readAsText(file);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter some text .');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysisResult = await analyzeText(text);
      setResult(analysisResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Sentiment Analysis <span className="text-blue-600 dark:text-blue-400">AI</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Uncover the emotion behind words instantly.
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full">
          <div className="flex flex-col space-y-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here .."
              className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out bg-gray-50 dark:bg-gray-700 dark:text-white resize-none"
              disabled={isLoading}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* <button
                type="button"
                onClick={handleFileUploadClick}
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-500 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Text File
              </button> */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt"
                className="hidden"
              />
              <button
                onClick={handleAnalyzeClick}
                disabled={isLoading || !text.trim()}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed dark:disabled:bg-blue-800 transition-colors"
              >
                {isLoading ? <Spinner /> : 'Analyze Now'}
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            {isLoading && (
              <div className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span>Analyzing sentiment...</span>
              </div>
            )}
            {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">{error}</p>}
            {result && <AnalysisResultCard result={result} />}
          </div>
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by Advanced AI Models</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
