'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { BookOpen, GitBranch } from 'lucide-react';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-500/30">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome to <span className="text-violet-400">RepoRaft</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to share resources and upvote your favourites
            </p>
          </div>
        </div>


        {error && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
            Authentication failed. Please try again.
          </div>
        )}


        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <p className="mb-6 text-sm text-muted-foreground">
            Use your GitHub account to join the community
          </p>

          <button
            onClick={() => signIn('github', { callbackUrl })}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
          >
            <GitBranch className="h-5 w-5" />
            Continue with GitHub
          </button>

          <p className="mt-6 text-xs text-muted-foreground">
            By signing in, you agree to share your GitHub public profile.
            No private data is accessed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
