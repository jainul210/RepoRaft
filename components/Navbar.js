'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Plus, LogIn, LogOut, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/100 backdrop-blur-l">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-110">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Scholar</span>
            <span className="text-violet-400">Hub</span>
          </span>
        </Link>

        {/* Center tagline on larger screens */}
        <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground md:flex">
          <Sparkles className="h-3 w-3 text-violet-400" />
          Resources curated by students, for students
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {status === 'loading' ? (
            <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
          ) : session ? (
            <>
              <Link
                href="/submit"
                className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/20 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Share Resource</span>
              </Link>

              <div className="flex items-center gap-2">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white/10"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                    {session.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
