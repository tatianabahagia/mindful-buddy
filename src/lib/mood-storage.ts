
import { v4 as uuidv4 } from 'uuid';
import type { MoodEntry } from './constants';
import { LOCAL_STORAGE_MOOD_ENTRIES_KEY } from './constants';

export function getMoodEntries(): MoodEntry[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const entriesJson = localStorage.getItem(LOCAL_STORAGE_MOOD_ENTRIES_KEY);
    if (entriesJson) {
      const entries = JSON.parse(entriesJson) as MoodEntry[];
      // Sort by timestamp descending (most recent first)
      return entries.sort((a, b) => b.timestamp - a.timestamp);
    }
  } catch (error) {
    console.error("Error retrieving mood entries from localStorage:", error);
  }
  return [];
}

export function saveMoodEntries(entries: MoodEntry[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_MOOD_ENTRIES_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Error saving mood entries to localStorage:", error);
  }
}

export function addMoodEntry(newEntryData: Omit<MoodEntry, 'id' | 'timestamp'>): MoodEntry {
  const currentEntries = getMoodEntries();
  const newEntry: MoodEntry = {
    ...newEntryData,
    id: uuidv4(),
    timestamp: Date.now(),
  };
  const updatedEntries = [newEntry, ...currentEntries];
  saveMoodEntries(updatedEntries);
  return newEntry;
}

export function deleteMoodEntry(id: string): void {
  let currentEntries = getMoodEntries();
  currentEntries = currentEntries.filter(entry => entry.id !== id);
  saveMoodEntries(currentEntries);
}
