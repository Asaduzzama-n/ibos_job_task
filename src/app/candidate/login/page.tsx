'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { MOCK_USERS } from '@/lib/mock-data';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(4, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function CandidateLogin() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    // Check against candidate
    if (data.email === MOCK_USERS.candidate.email && data.password === MOCK_USERS.candidate.password) {
      login({
        id: 'can-1',
        name: MOCK_USERS.candidate.name,
        email: MOCK_USERS.candidate.email,
        role: 'candidate',
        refId: MOCK_USERS.candidate.refId,
      });
      router.replace('/candidate/dashboard');
      return;
    } 

    // Check against employer
    if (data.email === MOCK_USERS.employer.email && data.password === MOCK_USERS.employer.password) {
      login({
        id: 'emp-1',
        name: MOCK_USERS.employer.name,
        email: MOCK_USERS.employer.email,
        role: 'employer',
        refId: MOCK_USERS.employer.refId,
      });
      router.replace('/employer/dashboard');
      return;
    }

    alert('Invalid credentials. Use the mock login displayed below.');
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Candidate Sign In</h2>
      </div>

      <Card className="w-full max-w-[500px] border-none shadow-md rounded-xl">
        <CardContent className="pt-6">
          <form 
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }} 
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-slate-600">
                Email/ User ID
              </Label>
              <Input
                id="email"
                placeholder="Enter your email/User ID"
                className="h-11 rounded-lg border-none bg-slate-50 text-sm focus-visible:ring-1 focus-visible:ring-[#633df5]/20"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-600">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="h-11 rounded-lg border-none bg-slate-50 text-sm pr-10 focus-visible:ring-1 focus-visible:ring-[#633df5]/20"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
              <div className="flex justify-end pt-1">
                <a href="#" className="text-xs font-semibold text-slate-700 hover:underline">
                  Forget Password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#633df5] hover:bg-[#522fd1] text-md font-semibold mt-4 transition-colors"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
            <div className="text-xs text-blue-700 grid grid-cols-2 gap-4 w-full">
              <div>
                <p className="font-bold mb-1">Candidate:</p>
                <p>User: <span className="font-semibold">{MOCK_USERS.candidate.email}</span></p>
                <p>Pass: <span className="font-semibold">{MOCK_USERS.candidate.password}</span></p>
              </div>
              <div>
                <p className="font-bold mb-1">Employer:</p>
                <p>User: <span className="font-semibold">{MOCK_USERS.employer.email}</span></p>
                <p>Pass: <span className="font-semibold">{MOCK_USERS.employer.password}</span></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Button variant="link" onClick={() => router.push('/employer/login')} className="text-sm text-slate-500">
          Switch to Employer Login
        </Button>
      </div>
    </div>
  );
}
