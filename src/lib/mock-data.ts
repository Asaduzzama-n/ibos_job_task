import { Exam } from "@/store/useExamStore";

export const MOCK_USERS = {
  employer: {
    email: 'employer@akij.work',
    password: 'password123',
    name: 'Arif Hossain',
    refId: '16101121',
  },
  candidate: {
    email: 'candidate@akij.work',
    password: 'password123',
    name: 'Md. Naimur Rahman',
    refId: '12341341',
  }
};

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'Psychometric Test for Management Trainee Officer',
    totalCandidates: 10000,
    totalSlots: 3,
    totalQuestionSet: 3,
    questionType: 'MCQ',
    startTime: '2026-04-12T09:00',
    endTime: '2026-04-12T17:00',
    duration: 30,
    status: 'Published',
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: 'q1',
        title: 'Which of the following indicators is used to measure market volatility?',
        type: 'MCQ',
        score: 1,
        options: [
          { id: 'o1', text: 'Relative Strength Index (RSI)', isCorrect: false },
          { id: 'o2', text: 'Moving Average Convergence Divergence (MACD)', isCorrect: false },
          { id: 'o3', text: 'Bollinger Bands', isCorrect: true },
          { id: 'o4', text: 'Fibonacci Retracement', isCorrect: false },
        ]
      },
      {
        id: 'q2',
        title: 'What is the Capital of Bangladesh?',
        type: 'MCQ',
        score: 1,
        options: [
          { id: 'o5', text: 'Dhaka', isCorrect: true },
          { id: 'o6', text: 'Chattogram', isCorrect: false },
          { id: 'o7', text: 'Rajshahi', isCorrect: false },
          { id: 'o8', text: 'Sylhet', isCorrect: false },
        ]
      }
    ]
  }
];
