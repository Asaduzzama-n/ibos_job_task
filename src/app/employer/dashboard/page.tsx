'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExamStore } from '@/store/useExamStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Users, FileText, Clock, ChevronLeft, ChevronRight, ChevronDown, FolderX } from 'lucide-react';
import Link from 'next/link';

export default function EmployerDashboard() {
  const router = useRouter();
  const exams = useExamStore((state) => state.exams);
  const [search, setSearch] = useState('');

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto w-full flex flex-col pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Online Tests</h2>
        
        <div className="flex items-center gap-6 flex-1 sm:justify-end">
          <div className="relative w-full max-w-[420px]">
            <input
              type="text"
              placeholder="Search by exam title"
              className="w-full h-11 pr-12 pl-5 rounded-xl border-none bg-white shadow-[0_4px_15px_-3px_rgba(99,61,245,0.12)] placeholder:text-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-[#633df5]/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 p-1">
              <Search className="h-4.5 w-4.5 text-[#633df5] stroke-[2.5]" />
            </div>
          </div>
          
          <Button
            onClick={() => router.push('/employer/test/create')}
            className="h-11 px-8 rounded-xl bg-[#633df5] hover:bg-[#522fd1] text-white font-bold text-sm shadow-lg shadow-[#633df5]/20 transition-all border-none"
          >
            Create Online Test
          </Button>
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center bg-white rounded-xl shadow-sm py-20 px-4">
          <div className="w-24 h-24 mb-6 relative flex justify-center items-center">
            <FolderX className="w-20 h-20 text-slate-300" strokeWidth={1} />
            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-2 border-4 border-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Online Test Available</h3>
          <p className="text-sm text-slate-500 text-center max-w-md">
            Currently, there are no online tests available. Please check back later or create one.
          </p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-max">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="rounded-2xl border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                <CardContent className="p-8">
                  <h3 className="text-[17px] font-bold text-slate-800 mb-8 leading-snug">
                    {exam.title}
                  </h3>
                  
                  <div className="flex items-center gap-10 mb-8 overflow-x-auto pb-2 scrollbar-hide text-xs">
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                      <Users className="h-4.5 w-4.5 text-slate-400" />
                      <span className="font-semibold text-slate-500">Candidates: <span className="text-slate-800 ml-1 font-bold">{exam.totalCandidates?.toLocaleString() || 'Not Set'}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                      <FileText className="h-4.5 w-4.5 text-slate-400" />
                      <span className="font-semibold text-slate-500">Question Set: <span className="text-slate-800 ml-1 font-bold">{exam.totalQuestionSet || 'Not Set'}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5 whitespace-nowrap">
                      <Clock className="h-4.5 w-4.5 text-slate-400" />
                      <span className="font-semibold text-slate-500">Exam Slots: <span className="text-slate-800 ml-1 font-bold">{exam.totalSlots || 'Not Set'}</span></span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="h-10 px-8 rounded-xl border-2 border-[#633df5] text-[#633df5] hover:bg-[#633df5] hover:text-white font-bold text-sm transition-all"
                  >
                    View Candidates
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between py-10 mt-auto shrink-0 bg-transparent">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-none bg-white shadow-sm hover:bg-slate-50 transition-colors" disabled>
                <ChevronLeft className="h-5 w-5 text-slate-300" />
              </Button>
              <div className="h-9 w-9 rounded-xl bg-white shadow-md flex items-center justify-center font-bold text-sm text-slate-700">
                1
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-none bg-white shadow-sm hover:bg-slate-50 transition-colors" disabled>
                <ChevronRight className="h-5 w-5 text-slate-300" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
              <span>Online Test Per Page</span>
              <div className="flex items-center justify-between border-none rounded-xl px-3 h-9 w-16 bg-white shadow-md cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="text-slate-800">8</span>
                <ChevronDown className="h-4 w-4 text-slate-400 stroke-[3]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
