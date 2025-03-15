export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: string;
  description: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date | null;
  nextReview: Date | null;
  repetitions: number;
  easeFactor: number;
  interval: number;
}

export interface StudySession {
  id: string;
  startTime: Date;
  endTime: Date | null;
  cardsStudied: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  category: string;
  strength: number;
  lastReviewed?: Date;
}

export interface KnowledgeLink {
  source: string;
  target: string;
  strength: number;
  type: 'prerequisite' | 'related' | 'parent-child';
}