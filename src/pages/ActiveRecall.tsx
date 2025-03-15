import React, { useState } from 'react';
import { Brain, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import type { Flashcard } from '../types';

const SAMPLE_FLASHCARDS: Flashcard[] = [
  {
    id: '1',
    question: 'What is spaced repetition?',
    answer: 'A learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.',
    category: 'Learning Techniques',
    difficulty: 'medium',
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 1
  },
  {
    id: '2',
    question: 'What is active recall?',
    answer: 'A learning principle which states that actively stimulating memory during learning is more effective than passively reviewing material.',
    category: 'Learning Techniques',
    difficulty: 'easy',
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 1
  }
];

export function ActiveRecall() {
  const [cards] = useState<Flashcard[]>(SAMPLE_FLASHCARDS);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    incorrect: 0,
    total: SAMPLE_FLASHCARDS.length
  });

  const currentCard = cards[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (correct: boolean) => {
    setStudyStats(prev => ({
      ...prev,
      correct: correct ? prev.correct + 1 : prev.correct,
      incorrect: !correct ? prev.incorrect + 1 : prev.incorrect
    }));

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const resetStudySession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStudyStats({
      correct: 0,
      incorrect: 0,
      total: cards.length
    });
  };

  const isSessionComplete = currentCardIndex === cards.length - 1 && isFlipped;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Active Recall</h1>
        <div className="flex items-center space-x-4">
          <span className="text-green-600">
            <ThumbsUp className="inline-block w-5 h-5 mr-1" />
            {studyStats.correct}
          </span>
          <span className="text-red-600">
            <ThumbsDown className="inline-block w-5 h-5 mr-1" />
            {studyStats.incorrect}
          </span>
          <button
            onClick={resetStudySession}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>
      </div>

      {isSessionComplete ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Brain className="mx-auto h-16 w-16 text-indigo-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Complete!</h2>
          <p className="text-lg text-gray-600 mb-6">
            You've reviewed all {studyStats.total} cards.
            Correct: {studyStats.correct} | Incorrect: {studyStats.incorrect}
          </p>
          <button
            onClick={resetStudySession}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Session
          </button>
        </div>
      ) : (
        <div 
          className="bg-white rounded-lg shadow-md p-8 cursor-pointer min-h-[400px] flex flex-col"
          onClick={handleFlip}
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {isFlipped ? 'Answer' : 'Question'}
            </h2>
            <p className="text-lg text-center text-gray-900">
              {isFlipped ? currentCard.answer : currentCard.question}
            </p>
          </div>
          
          {isFlipped && (
            <div className="flex justify-center space-x-4 mt-8 pt-4 border-t">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResponse(false);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResponse(true);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <p className="text-sm text-gray-500 text-center mt-4">
            {isFlipped ? 'Rate your recall' : 'Click to reveal answer'}
          </p>
        </div>
      )}
    </div>
  );
}