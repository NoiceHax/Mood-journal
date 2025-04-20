import React, { useState } from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { useMoodTheme } from '../contexts/MoodThemeContext';

const MoodForm = ({ onSubmit }) => {
  const [mood, setMood] = useState('Happy');
  const [note, setNote] = useState('');
  const { setCurrentMood } = useMoodTheme();

  const handleMoodChange = (newMood) => {
    setMood(newMood);
    setCurrentMood(newMood);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEntry = {
      id: Date.now().toString(),
      mood,
      note,
      date: new Date().toISOString(),
    };

    onSubmit(newEntry);
    setNote('');
    setMood('Happy');
    setCurrentMood('Happy');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-6 shadow-sm mb-8 backdrop-blur-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          How are you feeling?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleMoodChange('Happy')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
              ${mood === 'Happy' 
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' 
                : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-600/80'}`}
          >
            <Smile className="w-5 h-5" />
            <span>Happy</span>
          </button>
          <button
            type="button"
            onClick={() => handleMoodChange('Neutral')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
              ${mood === 'Neutral' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-600/80'}`}
          >
            <Meh className="w-5 h-5" />
            <span>Neutral</span>
          </button>
          <button
            type="button"
            onClick={() => handleMoodChange('Sad')}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
              ${mood === 'Sad' 
                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                : 'bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-600/80'}`}
          >
            <Frown className="w-5 h-5" />
            <span>Sad</span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add a note
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="How was your day?"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 backdrop-blur-sm"
          rows="3"
        />
      </div>

      <button
        type="submit"
        disabled={!note.trim()}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
      >
        Save Entry
      </button>
    </form>
  );
};

export default MoodForm;