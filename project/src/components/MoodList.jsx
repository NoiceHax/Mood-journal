import React from 'react';
import MoodItem from './MoodItem';

const MoodList = ({ entries, onDeleteEntry }) => {
  if (entries.length === 0) {
    return (
      <div className="mt-6 text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          No mood entries yet. Add your first mood above!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Mood History</h2>
      {entries.map(entry => (
        <MoodItem
          key={entry.id}
          entry={entry}
          onDelete={onDeleteEntry}
        />
      ))}
    </div>
  );
};

export default MoodList;