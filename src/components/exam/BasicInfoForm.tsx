'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Exam } from '@/store/useExamStore';
import { Clock } from 'lucide-react';

const basicInfoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  totalCandidates: z.coerce.number().min(1, 'Required'),
  totalSlots: z.coerce.number().min(1, 'Required'),
  totalQuestionSet: z.coerce.number().min(1, 'Required'),
  questionType: z.string().min(1, 'Required'),
  startTime: z.string().min(1, 'Required'),
  endTime: z.string().min(1, 'Required'),
  duration: z.coerce.number().min(1, 'Required'),
}).superRefine((data, ctx) => {
  if (data.startTime && data.endTime) {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const now = new Date();
      // 5 minute grace period for taking time to fill out the form
      if (start.getTime() < now.getTime() - 5 * 60 * 1000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start time cannot be in the past",
          path: ["startTime"]
        });
      }

      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End time must be strictly after start time",
          path: ["endTime"]
        });
      }
    }
  }
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

interface Props {
  defaultValues?: Partial<Exam>;
  onSubmit: (data: Partial<Exam>) => void;
  onCancel: () => void;
}

export function BasicInfoForm({ defaultValues, onSubmit, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema) as any,
    defaultValues: {
      title: defaultValues?.title || '',
      totalCandidates: defaultValues?.totalCandidates || undefined,
      totalSlots: defaultValues?.totalSlots || undefined,
      totalQuestionSet: defaultValues?.totalQuestionSet || undefined,
      questionType: defaultValues?.questionType || '',
      startTime: defaultValues?.startTime || '',
      endTime: defaultValues?.endTime || '',
      duration: defaultValues?.duration || undefined,
    },
  });

  return (
    <>
    <Card className="rounded-xl border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] overflow-hidden bg-white mb-6 w-full max-w-[900px] mx-auto">
      <CardContent className="p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Basic Information</h3>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-semibold text-slate-600">
              Online Test Title <span className="text-red-500">*</span>
            </Label>
            <input
              id="title"
              placeholder="Enter online test title"
              className="h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors"
              {...register('title')}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalCandidates" className="text-xs font-semibold text-slate-600">
                Total Candidates <span className="text-red-500">*</span>
              </Label>
              <input
                id="totalCandidates"
                type="number"
                placeholder="Enter total candidates"
                className="h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors"
                {...register('totalCandidates')}
              />
              {errors.totalCandidates && <p className="text-xs text-red-500">{errors.totalCandidates.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalSlots" className="text-xs font-semibold text-slate-600">
                Total Slots <span className="text-red-500">*</span>
              </Label>
              <select
                id="totalSlots"
                className="flex h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem 1rem' }}
                {...register('totalSlots')}
              >
                <option value="">Select total slots</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.totalSlots && <p className="text-xs text-red-500">{errors.totalSlots.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalQuestionSet" className="text-xs font-semibold text-slate-600">
                Total Question Set <span className="text-red-500">*</span>
              </Label>
              <select
                id="totalQuestionSet"
                className="flex h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem 1rem' }}
                {...register('totalQuestionSet')}
              >
                <option value="">Select total question set</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.totalQuestionSet && <p className="text-xs text-red-500">{errors.totalQuestionSet.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="questionType" className="text-xs font-semibold text-slate-600">
                Question Type <span className="text-red-500">*</span>
              </Label>
              <select
                id="questionType"
                className="flex h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem 1rem' }}
                {...register('questionType')}
              >
                <option value="">Select question type</option>
                <option value="MCQ">MCQ</option>
                <option value="Checkbox">Checkbox</option>
                <option value="Text">Text</option>
              </select>
              {errors.questionType && <p className="text-xs text-red-500">{errors.questionType.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-xs font-semibold text-slate-600">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <input
                  id="startTime"
                  type="datetime-local"
                  placeholder="Enter start time"
                  className="h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors"
                  {...register('startTime')}
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-xs font-semibold text-slate-600">
                End Time <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <input
                  id="endTime"
                  type="datetime-local"
                  placeholder="Enter end time"
                  className="h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors"
                  {...register('endTime')}
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-xs font-semibold text-slate-600">
                Duration (minutes)
              </Label>
              <input
                id="duration"
                type="number"
                placeholder="Duration Time"
                className="h-11 w-full rounded-lg border border-solid border-slate-200 bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus-visible:ring-1 focus-visible:ring-[#633df5]/30 focus-visible:border-[#633df5]/50 hover:border-slate-300 transition-colors"
                {...register('duration')}
              />
              {errors.duration && <p className="text-xs text-red-500">{errors.duration.message}</p>}
            </div>
          </div>

        </form>
      </CardContent>
    </Card>

    <Card className="rounded-xl border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)] bg-white w-full max-w-[900px] mx-auto">
      <CardContent className="p-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 px-10 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="h-11 px-10 rounded-xl bg-[#633df5] hover:bg-[#522fd1] text-white font-bold shadow-md shadow-[#633df5]/20"
          >
            Save & Continue
          </Button>
        </div>
      </CardContent>
    </Card>
    </>
  );
}
