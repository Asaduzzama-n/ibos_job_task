'use client';

import React, { useState } from 'react';
import { Question, Option, QuestionType } from '@/store/useExamStore';
import { Trash2, Plus, GripVertical, Undo2, Redo2, ChevronDown, List, Bold, Italic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  onClose: () => void;
  onSave: (q: Question) => void;
  defaultQuestion?: Question;
  defaultType?: QuestionType;
  questionIndex: number;
}

export function QuestionModal({ onClose, onSave, defaultQuestion, defaultType = 'MCQ', questionIndex }: Props) {
  const [type, setType] = useState<QuestionType>(defaultQuestion?.type || defaultType);
  const [score, setScore] = useState(defaultQuestion?.score || 1);
  const [title, setTitle] = useState(defaultQuestion?.title || '');
  
  const [options, setOptions] = useState<Option[]>(
    defaultQuestion?.options?.length ? defaultQuestion.options : (type !== 'Text' ? [
      { id: '1', text: '', isCorrect: false },
      { id: '2', text: '', isCorrect: false },
      { id: '3', text: '', isCorrect: false },
    ] : [
      { id: '1', text: '', isCorrect: true },
    ])
  );

  const handleAddOption = () => {
    setOptions([...options, { id: Date.now().toString(), text: '', isCorrect: false }]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleCorrectToggle = (index: number) => {
    const newOptions = [...options];
    if (type === 'MCQ') {
      newOptions.forEach((opt, i) => {
        opt.isCorrect = i === index;
      });
    } else {
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }
    setOptions(newOptions);
  };

  const handleSave = (shouldClose: boolean) => {
    if (!title.trim()) return;
    onSave({
      id: defaultQuestion?.id || Date.now().toString(),
      type,
      title,
      score,
      options,
    });
    
    if (shouldClose) {
      onClose();
    } else {
      // Reset for next question
      setTitle('');
      setScore(1);
      setOptions(type === 'MCQ' ? [
        { id: '1', text: '', isCorrect: false },
        { id: '2', text: '', isCorrect: false },
        { id: '3', text: '', isCorrect: false },
      ] : [
        { id: '1', text: '', isCorrect: true },
      ]);
    }
  };

  const TextToolbar = () => (
    <div className="flex items-center gap-4 p-3 pb-2 text-slate-600 border-b border-transparent">
      <div className="flex items-center gap-3">
        <Undo2 className="w-4 h-4 cursor-pointer" />
        <Redo2 className="w-4 h-4 cursor-pointer" />
      </div>
      <div className="flex items-center gap-1 cursor-pointer">
        <span className="text-sm font-medium">Normal text</span>
        <ChevronDown className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-1 cursor-pointer">
        <List className="w-4 h-4" />
        <ChevronDown className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-4 font-serif">
        <span className="font-bold cursor-pointer">B</span>
        <span className="italic cursor-pointer">I</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[900px] flex flex-col max-h-[90vh]">
        <div className="px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 mt-8 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 border border-slate-300 rounded-full text-xs font-semibold text-slate-500">
              {questionIndex}
            </span>
            <h3 className="font-bold text-slate-800 text-lg">Question {questionIndex}</h3>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">Score:</span>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-16 h-9 text-center bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50"
              />
            </div>
            
            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="h-9 rounded-lg border border-slate-200 bg-white text-sm pl-4 pr-8 text-slate-700 font-medium outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 appearance-none"
              >
                <option value="MCQ">MCQ</option>
                <option value="Checkbox">Checkbox</option>
                <option value="Text">Text</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
            
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-red-500 transition-colors bg-white">
               <Trash2 className="w-5 h-5 bg-transparent" />
            </button>
          </div>
        </div>

        <div className="px-8 pb-6 overflow-y-auto flex-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <TextToolbar />
            <Textarea
              placeholder="Type questions here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-h-[100px] border-none focus-visible:ring-0 px-4 pb-4 resize-none rounded-none text-slate-700 bg-transparent shadow-none"
            />
          </div>

          <div className="space-y-6">
            {options.map((opt, i) => (
              <div key={opt.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between pl-1">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-6 h-6 border border-slate-300 rounded-full text-xs font-semibold text-slate-500 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    
                    {type !== 'Text' && (
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input
                            type={type === 'Checkbox' ? 'checkbox' : 'radio'}
                            checked={opt.isCorrect}
                            onChange={() => handleCorrectToggle(i)}
                            className={`w-5 h-5 cursor-pointer border-slate-300 hover:border-[#633df5] accent-[#633df5] transition-all bg-white ${
                              type === 'MCQ' ? 'rounded-full' : 'rounded'
                            }`}
                            name={`correct-option-${questionIndex}`}
                          />
                        </div>
                        <span className="text-sm text-slate-600 font-medium group-hover:text-slate-800 transition-colors">Set as correct answer</span>
                      </label>
                    )}
                  </div>
                  
                  <button onClick={() => handleRemoveOption(i)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <TextToolbar />
                  <Textarea
                    placeholder={`Option ${i + 1}`}
                    value={opt.text}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="min-h-[80px] border-none focus-visible:ring-0 px-4 pb-4 resize-none rounded-none text-slate-700 bg-transparent shadow-none"
                  />
                </div>
              </div>
            ))}
            
            {type !== 'Text' && (
              <button
                onClick={handleAddOption}
                className="flex items-center text-sm font-semibold text-[#633df5] hover:text-[#522fd1] py-2 ml-1 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" /> Another options
              </button>
            )}
          </div>
        </div>

        <div className="px-8 pb-8 pt-4 bg-white flex justify-end gap-4 shrink-0 rounded-b-2xl">
          <Button variant="outline" onClick={() => handleSave(true)} className="rounded-xl h-11 px-10 text-[#633df5] border-2 border-[#633df5] hover:bg-[#633df5]/5 font-bold shadow-sm transition-colors">
             Save
          </Button>
          <Button onClick={() => handleSave(false)} className="rounded-xl h-11 px-10 bg-[#633df5] hover:bg-[#522fd1] font-bold text-white shadow-md shadow-[#633df5]/20 transition-all border-none">
             Save & Add More
          </Button>
        </div>
      </div>
    </div>
  );
}
