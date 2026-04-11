'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useExamStore, Exam, Question } from '@/store/useExamStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Clock, Trash2, ShieldAlert } from 'lucide-react';

export default function ExamSessionPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  
  const getExamById = useExamStore((state) => state.getExamById);
  const user = useAuthStore((state) => state.user);
  
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeoutModal, setTimeoutModal] = useState(false);
  const [warnings, setWarnings] = useState(0);

  useEffect(() => {
    const loadedExam = getExamById(examId);
    if (!loadedExam) {
      router.push('/candidate/dashboard');
      return;
    }
    setExam(loadedExam);
    setTimeLeft(loadedExam.duration * 60); // minutes to seconds
  }, [examId, getExamById, router]);

  useEffect(() => {
    if (!exam || isCompleted || timeoutModal) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam, isCompleted, timeoutModal]);

  // Anti-cheat tracking
  useEffect(() => {
    if (!exam || isCompleted || timeoutModal) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(w => w + 1);
        alert('Warning: You switched tabs or minimized the browser! This has been recorded.');
      }
    };

    const handleBlur = () => {
      setWarnings(w => w + 1);
      alert('Warning: You clicked outside the exam window! This has been recorded.');
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [exam, isCompleted, timeoutModal]);

  const handleTimeout = () => {
    setTimeoutModal(true);
  };

  const handleFinish = useCallback(() => {
    setIsCompleted(true);
    setTimeoutModal(false);
    // In a real app we'd dispatch answers to the backend here.
  }, []);

  if (!exam) return <div className="p-10 flex justify-center">Loading...</div>;

  const currentQuestion = exam.questions[currentIndex];

  const handleSaveAndContinue = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const setAnswer = (questionId: string, val: any) => {
    setAnswers({ ...answers, [questionId]: val });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isCompleted) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center pt-8">
        <Card className="w-full max-w-[800px] border-slate-200 shadow-sm rounded-xl bg-white py-14">
          <CardContent className="flex flex-col items-center text-center p-0">
            <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
               <CheckCircle2 className="text-white w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Test Completed</h2>
            <p className="text-slate-500 mb-8 max-w-lg">
              Congratulations! {user?.name}, You have completed your {exam.title}. Thank you for participating.
            </p>
            <Button
              variant="outline"
              onClick={() => router.push('/candidate/dashboard')}
              className="h-11 px-8 rounded-lg border-slate-200"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 max-w-[900px] mx-auto w-full flex flex-col pt-8 space-y-4">
      {timeoutModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-md border-slate-200 shadow-xl rounded-xl bg-white py-10">
              <CardContent className="flex flex-col items-center text-center p-0">
                <div className="relative mb-6">
                   <Clock className="text-[#2a2b7c] w-16 h-16" strokeWidth={1.5} />
                   <div className="absolute bottom-0 right-0 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                      <span className="text-white font-bold text-xs">x</span>
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">Timeout!</h2>
                <p className="text-slate-500 mb-8 px-6">
                  Dear {user?.name}, Your exam time has been finished. Thank you for participating.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleFinish();
                    router.push('/candidate/dashboard');
                  }}
                  className="h-10 px-8 rounded-lg border-slate-200"
                >
                  Back to Dashboard
                </Button>
              </CardContent>
            </Card>
         </div>
      )}

      {warnings > 0 && (
         <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 mb-2 text-sm max-w-[800px] mx-auto w-full">
            <ShieldAlert className="w-4 h-4" />
            <span>Anti-cheat system has detected {warnings} out-of-focus event(s). Further infractions may invalidate your test.</span>
         </div>
      )}

      <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm max-w-[800px] mx-auto w-full">
        <span className="font-semibold text-slate-800">
          Question ({currentIndex + 1}/{exam.questions.length})
        </span>
        <div className="bg-[#633df5]/10 px-4 py-2 rounded-lg font-bold text-[#633df5]">
          {formatTime(timeLeft)} left
        </div>
      </div>

      <Card className="rounded-xl border-none shadow-md bg-white max-w-[800px] mx-auto w-full">
        <CardContent className="p-8">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">
            Q{currentIndex + 1}. {currentQuestion?.title}
          </h3>

          <div className="space-y-3 mb-10">
            {currentQuestion?.type === 'Radio' || currentQuestion?.type === 'MCQ' ? (
              currentQuestion.options?.map((opt, idx) => (
                <label key={opt.id} className="flex items-center p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                  <input
                    type="radio"
                    name={`q-${currentQuestion.id}`}
                    value={opt.id}
                    checked={answers[currentQuestion.id] === opt.id}
                    onChange={() => setAnswer(currentQuestion.id, opt.id)}
                    className="w-4 h-4 text-[#633df5] mr-3 accent-[#633df5]"
                  />
                  <span className="text-sm font-medium text-slate-700">{opt.text}</span>
                </label>
              ))
            ) : currentQuestion?.type === 'Checkbox' ? (
              currentQuestion.options?.map((opt, idx) => {
                const checkedList = answers[currentQuestion.id] || [];
                return (
                  <label key={opt.id} className="flex items-center p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      value={opt.id}
                      checked={checkedList.includes(opt.id)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const newAns = isChecked 
                          ? [...checkedList, opt.id]
                          : checkedList.filter((id: string) => id !== opt.id);
                        setAnswer(currentQuestion.id, newAns);
                      }}
                      className="w-4 h-4 text-[#633df5] rounded mr-3 accent-[#633df5]"
                    />
                    <span className="text-sm font-medium text-slate-700">{opt.text}</span>
                  </label>
                );
              })
            ) : (
              <div className="bg-slate-50 rounded-lg overflow-hidden shadow-inner">
                <div className="bg-slate-100 p-2 flex gap-2 overflow-x-auto text-slate-500">
                   <Button variant="ghost" size="sm" className="h-7 px-2">Undo</Button>
                   <Button variant="ghost" size="sm" className="h-7 px-2">Normal text v</Button>
                   <Button variant="ghost" size="sm" className="h-7 px-2 font-bold">B</Button>
                   <Button variant="ghost" size="sm" className="h-7 px-2 italic">I</Button>
                   <Button variant="ghost" size="sm" className="h-7 px-2 underline">U</Button>
                </div>
                <textarea
                  placeholder="Type answer here..."
                  className="w-full min-h-[150px] p-4 text-sm text-slate-700 focus:outline-none resize-none bg-transparent"
                  value={answers[currentQuestion?.id || ''] || ''}
                  onChange={(e) => setAnswer(currentQuestion?.id || '', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="h-10 px-6 rounded-lg border-none bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 shadow-sm"
            >
              Skip this Question
            </Button>
            <Button
              onClick={handleSaveAndContinue}
              className="h-10 px-8 rounded-lg bg-[#633df5] hover:bg-[#522fd1] text-white font-medium"
            >
              {currentIndex < exam?.questions?.length - 1 ? 'Save & Continue' : 'Finish Exam'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
