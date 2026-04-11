'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BasicInfoForm } from '@/components/exam/BasicInfoForm';
import { QuestionSets } from '@/components/exam/QuestionSets';
import { Exam, useExamStore, Question } from '@/store/useExamStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Edit2 } from 'lucide-react';

export default function CreateTestPage() {
  const router = useRouter();
  const addExam = useExamStore((state) => state.addExam);
  
  const [step, setStep] = useState<1 | '1-preview' | 2>(1);
  const [basicInfo, setBasicInfo] = useState<Partial<Exam>>({});
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleBasicInfoSubmit = (data: Partial<Exam>) => {
    setBasicInfo(data);
    setStep('1-preview');
  };

  const handleFinish = () => {
    if (basicInfo.title) {
      addExam({
        title: basicInfo.title,
        totalCandidates: basicInfo.totalCandidates || 0,
        totalSlots: basicInfo.totalSlots || 1,
        totalQuestionSet: basicInfo.totalQuestionSet || 1,
        questionType: basicInfo.questionType || 'MCQ',
        startTime: basicInfo.startTime || '',
        endTime: basicInfo.endTime || '',
        duration: basicInfo.duration || 30,
        questions: questions,
      });
      router.push('/employer/dashboard');
    }
  };

  return (
    <div className="flex-1 p-6 max-w-[1200px] mx-auto w-full flex flex-col pt-8">
      <Card className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6 bg-white shrink-0">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold text-slate-800">Manage Online Test</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${step === 1 || step === '1-preview' || step === 2 ? 'bg-[#633df5] text-white' : 'bg-slate-200 text-slate-500'}`}>
                   {step === 2 ? <Check className="w-3.5 h-3.5" /> : '1'}
                </div>
                <span className={`text-sm font-medium ${step === 1 || step === '1-preview' || step === 2 ? 'text-[#633df5]' : 'text-slate-500'}`}>Basic Info</span>
              </div>
              <div className="w-20 h-px bg-slate-300 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${step === 2 ? 'bg-[#633df5] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  2
                </div>
                <span className={`text-sm font-medium ${step === 2 ? 'text-[#633df5]' : 'text-slate-500'}`}>Questions</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="h-10 px-5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm text-slate-700 font-bold text-sm whitespace-nowrap self-start sm:self-auto transition-colors"
            onClick={() => router.push('/employer/dashboard')}
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>

      <div className="flex flex-col flex-1">
        {step === 1 && (
          <BasicInfoForm defaultValues={basicInfo} onSubmit={handleBasicInfoSubmit} onCancel={() => router.push('/employer/dashboard')} />
        )}
        {step === '1-preview' && (
          <div className="w-full max-w-[900px] mx-auto pb-20 mt-4">
            <Card className="rounded-xl border border-slate-200 shadow-sm overflow-hidden bg-white mb-6">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Basic Information</h3>
                  <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-xs font-semibold text-[#633df5] hover:text-[#522fd1]">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div className="md:col-span-4">
                    <span className="block text-xs text-slate-500 mb-1">Online Test Title</span>
                    <span className="font-semibold text-slate-800">{basicInfo.title}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Total Candidates</span>
                    <span className="font-medium text-slate-800">{basicInfo.totalCandidates?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Total Slots</span>
                    <span className="font-medium text-slate-800">{basicInfo.totalSlots}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Total Question Set</span>
                    <span className="font-medium text-slate-800">{basicInfo.totalQuestionSet}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Duration (Minutes)</span>
                    <span className="font-medium text-slate-800">{basicInfo.duration}</span>
                  </div>
                  <div className="md:col-span-4">
                    <span className="block text-xs text-slate-500 mb-1">Question Type</span>
                    <span className="font-medium text-slate-800">{basicInfo.questionType}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] bg-white w-full">
              <CardContent className="p-6 sm:px-8">
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/employer/dashboard')}
                    className="h-11 px-10 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-11 px-10 rounded-xl bg-[#633df5] hover:bg-[#522fd1] text-white font-bold shadow-md shadow-[#633df5]/20"
                  >
                    Save & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {step === 2 && (
          <QuestionSets 
            basicInfo={basicInfo} 
            questions={questions} 
            onEditBasicInfo={() => setStep(1)}
            onQuestionsChange={setQuestions}
            onFinish={handleFinish}
          />
        )}
      </div>
    </div>
  );
}
