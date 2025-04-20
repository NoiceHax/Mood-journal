import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import { MoodThemeProvider } from './contexts/MoodThemeContext';
import { useMoodTheme } from './contexts/MoodThemeContext.jsx';

function AppContent() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const { currentMood } = useMoodTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addEntry = (newEntry) => {
    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getMoodBackground = () => {
    const backgrounds = {
      Happy: 'bg-amber-50/50 dark:bg-amber-950/30',
      Sad: 'bg-indigo-50/50 dark:bg-indigo-950/30',
      Neutral: 'bg-blue-50/50 dark:bg-blue-950/30'
    };
    return backgrounds[currentMood] || backgrounds.Happy;
  };

  return (
    <div className={`min-h-screen ${getMoodBackground()} transition-colors duration-700`}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mood Journal</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
        
        <MoodForm onSubmit={addEntry} />
        <MoodList entries={entries} onDeleteEntry={deleteEntry} />
      </div>
    </div>
  );
}

function App() {
  return (
    <MoodThemeProvider>
      <AppContent />
    </MoodThemeProvider>
  );
}

export default App;