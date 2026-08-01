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
      top: '16px',
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 var(--container-padding)',
    }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px',
        background: 'var(--surface-container-lowest)',
        border: '1px solid var(--outline-variant)',
        borderRadius: '9999px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 16px', marginRight: '8px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: 'var(--primary)',
            }}>
              RepoRaft
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {[
            { key: 'resources', label: 'Resources', href: '/' },
            { key: 'categories', label: 'Categories', href: '#' },
            { key: 'community', label: 'Community', href: '#' },
          ].map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setActiveNav(key)}
              style={{ textDecoration: 'none' }}
            >
              <span style={{
                display: 'block',
                padding: '7px 14px',
                fontSize: '13px',
                fontWeight: '600',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeNav === key ? 'var(--primary)' : 'transparent',
                color: activeNav === key ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              }}>
                {label}
              </span>
            </Link>
          ))}

          {/* Divider */}
          <div style={{ width: '1px', height: '20px', background: 'var(--outline-variant)', margin: '0 6px' }} />

          {/* Auth */}
          {status === 'loading' ? (
            <div style={{ width: '76px', height: '34px', borderRadius: '9999px', background: 'var(--surface-container-low)' }} />
          ) : session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Link
                href="/submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 14px',
                  fontSize: '13px',
                  fontWeight: '600',
                  borderRadius: '9999px',
                  background: 'var(--primary)',
                  color: 'var(--on-primary)',
                  textDecoration: 'none',
                  border: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>add</span>
                Share
              </Link>
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32}
                  height={32}
                  style={{ borderRadius: '9999px', border: '1.5px solid var(--outline-variant)', cursor: 'pointer' }}
                  onClick={() => signOut()}
                  title="Sign out"
                />
              ) : (
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  style={{
                    width: '32px', height: '32px', borderRadius: '9999px',
                    background: 'var(--primary)', color: 'var(--on-primary)',
                    border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {session.user?.name?.[0]?.toUpperCase() || 'U'}
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              style={{
                padding: '7px 14px', fontSize: '13px', fontWeight: '600',
                borderRadius: '9999px', background: 'var(--primary)',
                color: 'var(--on-primary)', border: 'none', cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
