import React, { createContext, useContext, useState } from 'react';

const MoodThemeContext = createContext();

export const MoodThemeProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState('Happy');

  const value = {
    currentMood,
    setCurrentMood,
  };

  return (
    <MoodThemeContext.Provider value={value}>
      {children}
    </MoodThemeContext.Provider>
  );
};

export const useMoodTheme = () => {
  const context = useContext(MoodThemeContext);
  if (context === undefined) {
    throw new Error('Wrong Theme');
  }
  return context;
};