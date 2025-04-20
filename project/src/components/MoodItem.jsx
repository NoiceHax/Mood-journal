import React from 'react';
import { Smile, Frown, Meh } from 'lucide-react';
import { useMoodTheme } from '../contexts/MoodThemeContext';

const MoodItem = ({ entry, onDelete }) => {
  const { currentMood } = useMoodTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getMoodIcon = () => {
    switch (entry.mood) {
      case 'Happy':
        return <Smile className={`w-6 h-6 ${currentMood === 'Happy' ? 'text-amber-500' : 'text-amber-400'}`} />;
      case 'Sad':
        return <Frown className={`w-6 h-6 ${currentMood === 'Sad' ? 'text-indigo-500' : 'text-indigo-400'}`} />;
      case 'Neutral':
        return <Meh className={`w-6 h-6 ${currentMood === 'Neutral' ? 'text-blue-500' : 'text-blue-400'}`} />;
      default:
        return null;
    }
  };

  const getMoodColor = () => {
    const baseColors = {
      Happy: 'bg-white/80 dark:bg-gray-800/80 border-amber-200 dark:border-amber-700',
      Sad: 'bg-white/80 dark:bg-gray-800/80 border-indigo-200 dark:border-indigo-700',
      Neutral: 'bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-blue-700'
    };

    if (entry.mood === currentMood) {
      return `${baseColors[entry.mood]} scale-102 shadow-lg`;
    }
    return baseColors[entry.mood];
  };

  return (
    <div 
      className={`p-4 mb-4 rounded-lg border ${getMoodColor()} transition-all duration-300 backdrop-blur-sm`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 mb-2">
          {getMoodIcon()}
          <span className="font-medium">{entry.mood}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(entry.date)}
        </span>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
        {entry.note}
      </p>
      
      <div className="mt-3 flex justify-end">
        <button
          onClick={() => onDelete(entry.id)}
          className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MoodItem;