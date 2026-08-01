'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Logo + Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'var(--surface-container-lowest)',
              border: '1px solid var(--outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '28px' }}>
                sailing
              </span>
            </div>
          </Link>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--on-surface)', letterSpacing: '-0.01em', marginBottom: '5px' }}>
              Welcome to <span style={{ color: 'var(--primary)' }}>RepoRaft</span>
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '1.5' }}>
              Sign in to share resources and upvote your favourites
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            borderRadius: '0.75rem',
            border: '1px solid rgba(186,26,26,0.25)',
            background: 'rgba(186,26,26,0.05)',
            padding: '11px 14px',
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--error)',
          }}>
            Authentication failed. Please try again.
          </div>
        )}

        {/* Card */}
        <div style={{
          background: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          borderRadius: '0.875rem',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '1.5' }}>
            Use your GitHub account to join the community
          </p>

          <button
            onClick={() => signIn('github', { callbackUrl })}
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              borderRadius: '9999px',
              background: 'var(--on-surface)',
              color: '#ffffff',
              border: 'none',
              padding: '11px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            onMouseDown={e => e.currentTarget.style.opacity = '0.75'}
            onMouseUp={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <p style={{ fontSize: '12px', color: 'var(--outline)', lineHeight: '1.6' }}>
            By signing in, you agree to share your GitHub public profile.
            No private data is accessed.
          </p>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              fontSize: '13px',
              color: 'var(--on-surface-variant)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.2s',
            }}
            className="back-link"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_back</span>
            Back to RepoRaft
          </Link>
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
