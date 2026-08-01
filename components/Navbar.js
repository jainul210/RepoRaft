'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [activeNav, setActiveNav] = useState('resources');
  const [islandOpen, setIslandOpen] = useState(false);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const islandRef = useRef(null);

  // Expand animation on open
  useEffect(() => {
    if (islandOpen) {
      setTimeout(() => setIslandExpanded(true), 10);
    } else {
      setIslandExpanded(false);
    }
  }, [islandOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (islandRef.current && !islandRef.current.contains(e.target)) {
        setIslandOpen(false);
      }
    }
    if (islandOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [islandOpen]);

  return (
    <header style={{
      position: 'fixed',
      top: '16px',
      left: '0',
      right: '0',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 var(--container-padding)',
      gap: '10px',
      pointerEvents: 'none',
    }}>
      {/* Main Navbar Pill */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '6px',
        background: 'var(--surface-container-lowest)',
        border: '1px solid var(--outline-variant)',
        borderRadius: '9999px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        pointerEvents: 'all',
      }}>
        {/* Logo */}
        <div style={{ padding: '0 16px', marginRight: '8px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontSize: '18px', fontWeight: '700',
              letterSpacing: '-0.02em', color: 'var(--primary)',
            }}>
              RepoRaft
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {[
            { key: 'resources', label: 'Resources', href: '/' },
            { key: 'categories', label: 'Categories', href: '/#categories' },
            { key: 'community', label: 'Community', href: '/#community' },
          ].map(({ key, label, href }) => (
            <Link key={key} href={href} onClick={() => setActiveNav(key)} style={{ textDecoration: 'none' }}>
              <span style={{
                display: 'block', padding: '7px 14px', fontSize: '13px',
                fontWeight: '600', borderRadius: '9999px', cursor: 'pointer',
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

          {/* Auth area inside pill */}
          {status === 'loading' ? (
            <div style={{ width: '76px', height: '34px', borderRadius: '9999px', background: 'var(--surface-container-low)' }} />
          ) : session ? (
            <Link
              href="/submit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '7px 14px', fontSize: '13px', fontWeight: '600',
                borderRadius: '9999px', background: 'var(--primary)',
                color: 'var(--on-primary)', textDecoration: 'none',
                border: 'none', transition: 'opacity 0.2s',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>add</span>
              Share
            </Link>
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

      {/* Dynamic Island — only shown when signed in */}
      {session && (
        <div ref={islandRef} style={{ position: 'relative', pointerEvents: 'all' }}>
          {/* The pill/island itself */}
          <button
            onClick={() => setIslandOpen(o => !o)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: islandOpen ? '10px' : '0px',
              padding: islandOpen ? '5px 14px 5px 6px' : '5px',
              background: '#0b1c30',
              border: '1.5px solid rgba(255,255,255,0.08)',
              borderRadius: '9999px',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
              minWidth: islandOpen ? '160px' : '44px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '9999px',
              overflow: 'hidden', flexShrink: 0, position: 'relative',
            }}>
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32} height={32}
                  style={{ borderRadius: '9999px', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '9999px',
                  background: 'var(--primary)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: '700', color: '#fff',
                }}>
                  {session.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </div>

            {/* Expanded name */}
            <span style={{
              fontSize: '13px', fontWeight: '600', color: '#ffffff',
              whiteSpace: 'nowrap', opacity: islandExpanded ? 1 : 0,
              maxWidth: islandExpanded ? '100px' : '0px',
              transition: 'opacity 0.2s ease 0.1s, max-width 0.3s ease',
              overflow: 'hidden',
            }}>
              {session.user?.name?.split(' ')[0] || 'Profile'}
            </span>
          </button>

          {/* Dropdown panel */}
          {islandOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              minWidth: '200px',
              background: 'var(--surface-container-lowest)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '1rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              overflow: 'hidden',
              animation: 'islandDrop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}>
              {/* User info header */}
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--outline-variant)',
                background: 'var(--surface-container-low)',
              }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--on-surface)' }}>
                  {session.user?.name}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
                  {session.user?.email}
                </p>
              </div>

              {/* Menu items */}
              <div style={{ padding: '6px' }}>
                <Link
                  href="/profile"
                  onClick={() => setIslandOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '9px 12px', borderRadius: '0.625rem',
                    textDecoration: 'none', color: 'var(--on-surface)',
                    fontSize: '13px', fontWeight: '500',
                    transition: 'background 0.15s',
                  }}
                  className="island-menu-item"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '17px', color: 'var(--primary)' }}>
                    grid_view
                  </span>
                  My Resources
                </Link>

                <Link
                  href="/submit"
                  onClick={() => setIslandOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '9px 12px', borderRadius: '0.625rem',
                    textDecoration: 'none', color: 'var(--on-surface)',
                    fontSize: '13px', fontWeight: '500',
                    transition: 'background 0.15s',
                  }}
                  className="island-menu-item"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '17px', color: 'var(--primary)' }}>
                    add_circle
                  </span>
                  Share Resource
                </Link>
              </div>

              {/* Sign out */}
              <div style={{ padding: '6px', borderTop: '1px solid var(--outline-variant)' }}>
                <button
                  onClick={() => { setIslandOpen(false); signOut(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px', width: '100%',
                    padding: '9px 12px', borderRadius: '0.625rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--error)', fontSize: '13px', fontWeight: '500',
                    transition: 'background 0.15s', textAlign: 'left',
                  }}
                  className="island-menu-danger"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                    logout
                  </span>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </header>
  );
}
