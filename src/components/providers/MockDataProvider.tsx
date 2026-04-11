'use client';

import { useEffect, useState } from 'react';
import { INITIAL_EXAMS } from '@/lib/mock-data';

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    try {
      // Seed initial exams if state is empty
      const examStorage = localStorage.getItem('exam-storage');
      let shouldSeed = !examStorage;
      
      if (examStorage) {
        const parsed = JSON.parse(examStorage);
        if (!parsed.state?.exams || parsed.state.exams.length === 0) {
          shouldSeed = true;
        }
      }

      if (shouldSeed) {
        const initialState = {
          state: {
            exams: INITIAL_EXAMS,
          },
          version: 0,
        };
        localStorage.setItem('exam-storage', JSON.stringify(initialState));
      }
    } catch (error) {
      console.error('Failed to parse exam-storage:', error);
    }
  }, []);

  // Return children even if not mounted to allow SSR rendering.
  // We only use mounted for client-only logic if needed.
  return <>{children}</>;
}
