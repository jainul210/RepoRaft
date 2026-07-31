'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [activeNav, setActiveNav] = useState('resources');

  return (
    <header style={{
      position: 'fixed',
      top: 'var(--stack-md)',
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 var(--container-padding)',
    }}>
      <nav className="navbar-pill" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--base)',
        padding: 'var(--stack-sm)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 var(--stack-md)', marginRight: 'var(--stack-md)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '32px',
              lineHeight: '40px',
              fontWeight: '600',
              letterSpacing: '-0.01em',
              color: 'var(--primary)',
            }}>
              RepoRaft
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--base)' }}>
          <Link
            href="/"
            onClick={() => setActiveNav('resources')}
            style={{ textDecoration: 'none' }}
          >
            <span
              className={activeNav === 'resources' ? 'nav-item-active' : 'nav-item'}
              style={{
                display: 'block',
                padding: '0.5rem 1.5rem',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              Resources
            </span>
          </Link>

          <a
            href="#"
            onClick={() => setActiveNav('categories')}
            style={{ textDecoration: 'none' }}
          >
            <span
              className={activeNav === 'categories' ? 'nav-item-active' : 'nav-item'}
              style={{
                display: 'block',
                padding: '0.5rem 1.5rem',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              Categories
            </span>
          </a>

          <a
            href="#"
            onClick={() => setActiveNav('community')}
            style={{ textDecoration: 'none' }}
          >
            <span
              className={activeNav === 'community' ? 'nav-item-active' : 'nav-item'}
              style={{
                display: 'block',
                padding: '0.5rem 1.5rem',
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              Community
            </span>
          </a>

          {/* Auth area */}
          <div style={{ marginLeft: 'var(--stack-sm)' }}>
            {status === 'loading' ? (
              <div style={{ width: '80px', height: '36px', borderRadius: '9999px', background: 'var(--surface-container)', opacity: 0.6 }} />
            ) : session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--base)' }}>
                <Link
                  href="/submit"
                  className="nav-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.5rem 1.5rem',
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                  <span>Share</span>
                </Link>
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={36}
                    height={36}
                    style={{ borderRadius: '9999px', border: '2px solid var(--surface-container)', cursor: 'pointer' }}
                    onClick={() => signOut()}
                    title="Sign out"
                  />
                ) : (
                  <button
                    onClick={() => signOut()}
                    title="Sign out"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '9999px',
                      background: 'var(--primary)',
                      color: 'var(--on-primary)',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {session.user?.name?.[0]?.toUpperCase() || 'U'}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="nav-cta"
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
