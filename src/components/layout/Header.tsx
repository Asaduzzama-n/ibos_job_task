import { ChevronDown, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  user?: { name: string; refId?: string; role: string } | null;
  onLogout?: () => void;
}

export function Header({ title = 'Akij Resource', user, onLogout }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm">
      <div className="flex items-center gap-2">
        {/* Mock Logo */}
        <Link href="/" className="flex flex-col items-start leading-none group">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold tracking-tighter text-[#2a2b7c] uppercase">
              AKIJ
            </span>
            <span className="text-xl font-black tracking-tight text-[#2a2b7c] uppercase italic -ml-0.5">
              RESOURCE
            </span>
          </div>
          <span className="text-[0.45rem] tracking-[0.2em] text-[#2a2b7c]/70 uppercase mt-0.5 font-bold">
            Towards Excellence
          </span>
        </Link>
      </div>

      <h1 className="text-xl font-semibold text-slate-700 absolute left-1/2 -translate-x-1/2">
        {title}
      </h1>

      <div className="flex items-center gap-4">
        {user ? (
          <div 
            className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1 px-2 rounded-lg transition-colors"
            onClick={onLogout}
          >
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center border-none">
              <User className="h-6 w-6 text-slate-400" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
              <span className="text-[10px] font-medium text-slate-500">Ref. ID - {user.refId}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 ml-1 group-hover:text-slate-600 transition-colors" />
          </div>
        ) : null}
      </div>
    </header>
  );
}
