import React from 'react';
import { Brain, BookOpen, BarChart2, Settings, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import type { NavigationItem } from '../types';

const navigation: NavigationItem[] = [
  {
    name: 'Knowledge Graph',
    href: '/graph',
    icon: 'Brain',
    description: 'Visualize and connect your knowledge'
  },
  {
    name: 'Active Recall',
    href: '/recall',
    icon: 'BookOpen',
    description: 'Practice and reinforce learning'
  },
  {
    name: 'Progress',
    href: '/progress',
    icon: 'BarChart2',
    description: 'Track your learning journey'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'Settings',
    description: 'Customize your experience'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Brain': return <Brain className="w-6 h-6" />;
    case 'BookOpen': return <BookOpen className="w-6 h-6" />;
    case 'BarChart2': return <BarChart2 className="w-6 h-6" />;
    case 'Settings': return <Settings className="w-6 h-6" />;
    default: return null;
  }
};

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="flex items-center">
                <Brain className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Optimal Learning</span>
              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-900 hover:text-indigo-600'
                  }`
                }
              >
                {getIcon(item.icon)}
                <span className="ml-2">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-base font-medium ${
                    isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {getIcon(item.icon)}
                <span className="ml-3">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}