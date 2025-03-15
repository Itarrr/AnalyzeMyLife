import React from 'react';
import { Brain, BookOpen, BarChart2, Settings } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <Brain className="mx-auto h-16 w-16 text-indigo-600" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
          Welcome to Optimal Learning
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Your personalized learning journey starts here
        </p>
      </div>
      
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <Brain className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Knowledge Graph</h3>
          <p className="mt-2 text-gray-600">Visualize and connect your knowledge in an interactive graph</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Active Recall</h3>
          <p className="mt-2 text-gray-600">Practice and reinforce your learning with spaced repetition</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <BarChart2 className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Progress Tracking</h3>
          <p className="mt-2 text-gray-600">Monitor your learning journey with detailed analytics</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <Settings className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Personalization</h3>
          <p className="mt-2 text-gray-600">Customize your learning experience to fit your needs</p>
        </div>
      </div>
    </div>
  );
}