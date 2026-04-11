import React from 'react';
import { Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto flex h-16 w-full items-center justify-between bg-[#0d0b26] px-10 text-xs text-slate-400 shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-medium text-[11px] text-slate-400">Powered by</span>
        <Link href="/" className="flex flex-col items-start leading-none group translate-y-[1px]">
          <div className="flex items-baseline space-x-0.5">
            <span className="text-lg font-bold tracking-tighter text-white uppercase">
              AKIJ
            </span>
            <span className="text-[15px] font-black tracking-tight text-white uppercase italic -ml-0.5">
              RESOURCE
            </span>
          </div>
          <span className="text-[0.4rem] tracking-[0.2em] text-[#0d0b26] bg-white uppercase w-full text-center py-[1px] mt-0.5 font-bold">
            Towards Excellence
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-8 text-white/80">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] font-medium">Helpline</span>
          <div className="flex items-center gap-1.5 px-2">
            <Phone className="h-3.5 w-3.5" />
            <span className="font-bold text-[11px]">+88 011020202505</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5" />
          <span className="font-bold text-[11px]">support@akij.work</span>
        </div>
      </div>
    </footer>
  );
}
