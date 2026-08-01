'use client';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 var(--container-padding) 48px',
    }}>
      <div
        className="footer-card"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          padding: '24px 28px',
          background: 'var(--surface-container-lowest)',
          border: '1px solid var(--outline-variant)',
          borderRadius: '0.875rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--on-surface)', letterSpacing: '-0.01em' }}>
            RepoRaft
          </span>
          <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
            The buoyant repository explorer.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '13px' }}>
          {['Terms', 'Privacy', 'Github'].map((label) => (
            <a
              key={label}
              href="#"
              className="footer-link"
              style={{
                textDecoration: 'none',
                color: 'var(--on-surface-variant)',
                transition: 'color 0.2s',
                fontWeight: '500',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={e => (e.target.style.color = 'var(--on-surface-variant)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
