'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useExamStore } from '@/store/useExamStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Clock, FileText, Info, ChevronLeft, ChevronRight, ChevronDown, FolderX, XCircle } from 'lucide-react';

export default function CandidateDashboard() {
  const router = useRouter();
  const exams = useExamStore((state) => state.exams);
  const [search, setSearch] = useState('');

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto w-full flex flex-col pt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-[#2d3748]">Online Tests</h2>
        
        <div className="flex items-center gap-4 flex-1 sm:justify-end">
          <div className="relative w-full max-w-[450px]">
            <input
              type="text"
              placeholder="Search by exam title"
              className="w-full h-11 pl-4 pr-12 rounded-xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(99,61,245,0.05)] placeholder:text-slate-400 text-sm outline-none focus:ring-1 focus:ring-[#633df5]/30 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 bg-[#f0ecfe] rounded-lg flex items-center justify-center mr-1">
              <Search className="h-4 w-4 text-[#633df5]" />
            </div>
          </div>
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center bg-white rounded-xl shadow-sm py-20 px-4">
          <div className="w-24 h-24 mb-6 relative flex justify-center items-center">
             <FolderX className="w-20 h-20 text-slate-300" strokeWidth={1} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Online Test Available</h3>
          <p className="text-sm text-slate-500 text-center max-w-md">
            Currently, there are no online tests assigned to you. Please contact support if you believe this is a mistake.
          </p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="rounded-2xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden bg-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-[#2d3748] mb-4 leading-tight">
                    {exam.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 text-[12px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium whitespace-nowrap leading-none">Duration: <span className="text-[#2d3748] font-bold">{exam.duration || 30} min</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium whitespace-nowrap leading-none">Question: <span className="text-[#2d3748] font-bold">{exam.questions?.length || 20}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <XCircle className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium whitespace-nowrap leading-none">Negative Marking: <span className="text-[#2d3748] font-bold">-0.25/wrong</span></span>
                    </div>
                  </div>

                  <Button
                    onClick={() => router.push(`/candidate/exam/${exam.id}`)}
                    variant="outline"
                    className="h-9 w-28 rounded-lg border-2 border-[#633df5] bg-transparent hover:bg-[#633df5]/5 text-[#633df5] font-bold text-xs transition-all"
                  >
                    Start
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between py-8 mt-10 gap-6 border-transparent">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-slate-400" disabled>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-transparent bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] font-bold text-slate-700 text-sm">
                1
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-slate-400" disabled>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
              <span>Online Test Per Page</span>
              <div className="flex items-center justify-between border-slate-100 rounded-lg px-3 h-10 w-16 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
                <span className="text-slate-700">8</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
