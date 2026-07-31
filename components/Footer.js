'use client';

export default function Footer() {
  return (
    <footer style={{ width: '100%', padding: '0 var(--container-padding) var(--stack-lg)' }}>
      <div className="footer-card" style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--stack-md)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--base)' }}>
          <span style={{
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: '600',
            color: 'var(--on-surface)',
          }}>
            RepoRaft
          </span>
          <p style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--on-surface-variant)' }}>
            The buoyant repository explorer.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--stack-md)', fontSize: '14px' }}>
          {['Terms', 'Privacy', 'Github'].map((label) => (
            <a
              key={label}
              href="#"
              className="footer-link"
              style={{
                textDecoration: 'none',
                color: 'var(--on-secondary-container)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--primary)')}
              onMouseLeave={e => (e.target.style.color = 'var(--on-secondary-container)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
