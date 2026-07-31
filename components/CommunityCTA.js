'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CommunityCTA({ isLoggedIn }) {
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <section style={{ marginTop: '128px', position: 'relative' }}>
      {/* Decorative blur blob */}
      <div style={{
        position: 'absolute',
        top: '-64px',
        left: '-48px',
        width: '256px',
        height: '256px',
        background: 'rgba(0,88,190,0.05)',
        borderRadius: '9999px',
        filter: 'blur(48px)',
        pointerEvents: 'none',
      }} />

      <div
        className="section-banner"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 'var(--stack-lg)',
          flexWrap: 'wrap',
        }}
      >
        {/* Image */}
        <div style={{ width: '100%', maxWidth: '340px', flexShrink: 0 }}>
          <div
            style={{
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              transform: imageHovered ? 'rotate(0deg)' : 'rotate(2deg)',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6PLAa3vfzySSp9jsrKd-2doH_NWONWqW0g2vraOkh72Q47TAUQ4GYF2T_gQPWC9faGKXuZXRDYCQBJSJXT7q5Qmncw7NPFkvGQMM82ofrTpXd4arTEl3cZd0wAZdnwaUeMucL_EbRFFuxtpLVgGTtifkRiILR3LdkDpcB4zB9CHMX-d6V9MqPXUj0PZrdPXhDe7-hxRf8OJpMGV5ym9PdckOHmyPK5fPCMAMrCzZslKk3hSO8dXtbtVixabe7hi2zIciWV5_3M0RL"
              alt="A high-quality 3D clay-style illustration of a floating boat carrying digital folders and golden stars."
              style={{ width: '100%', height: '256px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.1em',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 'var(--base)',
          }}>
            Community Choice
          </span>
          <h2 style={{
            fontSize: '48px',
            lineHeight: '56px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            color: 'var(--on-surface)',
            marginBottom: 'var(--stack-md)',
          }}>
            Join the Raft. <br />Share your findings.
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '24px',
            color: 'var(--on-surface-variant)',
            marginBottom: 'var(--stack-lg)',
            maxWidth: '512px',
          }}>
            Every repository on RepoRaft is hand-vetted by our core community.
            Become a contributor today and help others navigate the sea of code.
          </p>
          <div style={{ display: 'flex', gap: 'var(--stack-md)', flexWrap: 'wrap' }}>
            {isLoggedIn ? (
              <Link href="/submit" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Submit Repo</button>
              </Link>
            ) : (
              <Link href="/api/auth/signin" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Submit Repo</button>
              </Link>
            )}
            <button className="btn-secondary">Browse Tags</button>
          </div>
        </div>
      </div>
    </section>
  );
}
