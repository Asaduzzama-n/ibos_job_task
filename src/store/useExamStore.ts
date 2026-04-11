import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuestionType = 'MCQ' | 'Checkbox' | 'Text';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  options?: Option[];
  score: number;
}

export interface Exam {
  id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  totalQuestionSet: number;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  questions: Question[];
  status: 'Draft' | 'Published';
  createdAt: string;
}

interface ExamState {
  exams: Exam[];
  addExam: (exam: Omit<Exam, 'id' | 'createdAt' | 'status'>) => void;
  updateExam: (id: string, exam: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  getExamById: (id: string) => Exam | undefined;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      exams: [],
      addExam: (examData) =>
        set((state) => ({
          exams: [
            ...state.exams,
            {
              ...examData,
              id: Date.now().toString(),
              status: 'Published', // Mocking auto-publish for now
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateExam: (id, examData) =>
        set((state) => ({
          exams: state.exams.map((exam) =>
            exam.id === id ? { ...exam, ...examData } : exam
          ),
        })),
      deleteExam: (id) =>
        set((state) => ({
          exams: state.exams.filter((exam) => exam.id !== id),
        })),
      getExamById: (id) => get().exams.find((exam) => exam.id === id),
    }),
    {
      name: 'exam-storage',
    }
  )
);
