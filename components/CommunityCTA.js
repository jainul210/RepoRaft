'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CommunityCTA({ isLoggedIn }) {
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <section style={{ marginTop: '48px' }}>
      <div
        className="community-cta-card"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          padding: '32px',
          background: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          borderRadius: '0.875rem',
        }}
      >
        {/* Image */}
        <div className="community-cta-img-box" style={{ width: '100%', maxWidth: '300px', flexShrink: 0 }}>
          <div
            style={{
              borderRadius: '0.75rem',
              overflow: 'hidden',
              border: '1px solid var(--outline-variant)',
              transform: imageHovered ? 'rotate(0deg) scale(1.01)' : 'rotate(1.5deg)',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6PLAa3vfzySSp9jsrKd-2doH_NWONWqW0g2vraOkh72Q47TAUQ4GYF2T_gQPWC9faGKXuZXRDYCQBJSJXT7q5Qmncw7NPFkvGQMM82ofrTpXd4arTEl3cZd0wAZdnwaUeMucL_EbRFFuxtpLVgGTtifkRiILR3LdkDpcB4zB9CHMX-d6V9MqPXUj0PZrdPXhDe7-hxRf8OJpMGV5ym9PdckOHmyPK5fPCMAMrCzZslKk3hSO8dXtbtVixabe7hi2zIciWV5_3M0RL"
              alt="A clay-style illustration of a floating boat carrying digital folders and golden stars."
              style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="community-cta-text-box" style={{ flex: 1, minWidth: '260px' }}>
          <span style={{
            fontSize: '11px', fontWeight: '600', letterSpacing: '0.1em',
            color: 'var(--primary)', textTransform: 'uppercase',
            display: 'block', marginBottom: '8px',
          }}>
            Community Choice
          </span>
          <h2 style={{
            fontSize: '26px', lineHeight: '1.3', fontWeight: '700',
            letterSpacing: '-0.02em', color: 'var(--on-surface)', marginBottom: '12px',
          }}>
            Join the Raft.<br />Share your findings.
          </h2>
          <p style={{
            fontSize: '14px', lineHeight: '1.7',
            color: 'var(--on-surface-variant)', marginBottom: '24px', maxWidth: '420px',
          }}>
            Every repository on RepoRaft is hand-vetted by our core community.
            Become a contributor today and help others navigate the sea of code.
          </p>
          <div className="community-cta-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {isLoggedIn ? (
              <Link href="/submit" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '10px 22px', fontSize: '13px', fontWeight: '600',
                  borderRadius: '9999px', background: 'var(--primary)',
                  color: 'var(--on-primary)', border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}>Submit Repo</button>
              </Link>
            ) : (
              <Link href="/api/auth/signin" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '10px 22px', fontSize: '13px', fontWeight: '600',
                  borderRadius: '9999px', background: 'var(--primary)',
                  color: 'var(--on-primary)', border: 'none', cursor: 'pointer',
                }}>Submit Repo</button>
              </Link>
            )}
            <button style={{
              padding: '10px 22px', fontSize: '13px', fontWeight: '600',
              borderRadius: '9999px', background: 'transparent',
              color: 'var(--primary)', border: '1.5px solid var(--primary)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>Browse Tags</button>
          </div>
        </div>
      </div>
    </section>
  );
}
