'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Exam, Question } from '@/store/useExamStore';
import { Edit2, Plus, CheckCircle2 } from 'lucide-react';
import { QuestionModal } from './QuestionModal';

interface Props {
  basicInfo: Partial<Exam>;
  questions: Question[];
  onEditBasicInfo: () => void;
  onQuestionsChange: (questions: Question[]) => void;
  onFinish: () => void;
}

export function QuestionSets({ basicInfo, questions, onEditBasicInfo, onQuestionsChange, onFinish }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSaveQuestion = (q: Question) => {
    if (editingIndex !== null) {
      const newDocs = [...questions];
      newDocs[editingIndex] = q;
      onQuestionsChange(newDocs);
    } else {
      onQuestionsChange([...questions, q]);
    }
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleRemove = (index: number) => {
    onQuestionsChange(questions.filter((_, i) => i !== index));
  };

  const openEditor = (index: number) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto pb-20">


      <div className="space-y-4 mb-6">
        {questions.map((q, idx) => (
          <Card key={q.id || idx} className="rounded-xl border-none shadow-sm overflow-hidden bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-slate-800">Question {idx + 1}</h4>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-bold">{q.type}</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-bold">{q.score} pt</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-medium text-slate-800 text-sm mb-4">{q.title}</p>
                
                {q.type !== 'Text' && q.options && (
                  <div className="space-y-3">
                    {q.options.map((opt, i) => (
                      <div key={opt.id || i} className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg">
                        <span className="text-sm text-slate-700 font-medium">
                          {String.fromCharCode(65 + i)}. {opt.text}
                        </span>
                        {opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      </div>
                    ))}
                  </div>
                )}
                {q.type === 'Text' && (
                  <p className="text-sm text-slate-500 italic mt-2 bg-slate-50 p-3 rounded-lg">Text answer expected</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button onClick={() => openEditor(idx)} className="text-sm font-medium text-[#633df5] hover:underline">
                  Edit
                </button>
                <button onClick={() => handleRemove(idx)} className="text-sm font-medium text-red-500 hover:text-red-600">
                  Remove From Exam
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        className="w-full h-12 rounded-xl bg-[#633df5] hover:bg-[#522fd1] text-white font-medium mb-10 border-none shadow-md"
        onClick={() => {
          setEditingIndex(null);
          setIsModalOpen(true);
        }}
      >
        <Plus className="w-4 h-4 mr-2" /> Add Question
      </Button>

      {questions.length > 0 && (
         <div className="flex justify-center mt-4">
             <Button onClick={onFinish} className="bg-emerald-600 hover:bg-emerald-700 w-1/2 h-12">Publish Exam</Button>
         </div>
      )}

      {isModalOpen && (
        <QuestionModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveQuestion}
          defaultQuestion={editingIndex !== null ? questions[editingIndex] : undefined}
          defaultType={basicInfo.questionType as any}
          questionIndex={editingIndex !== null ? editingIndex + 1 : questions.length + 1}
        />
      )}
    </div>
  );
}
