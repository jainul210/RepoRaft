import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth';
import SubmitForm from '@/components/SubmitForm';
import Link from 'next/link';

export const metadata = {
  title: 'Share a Resource — RepoRaft',
  description: 'Share a tutorial, GitHub repo, PDF, or any learning resource with the community.',
};

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/submit');
  }

  return (
    <div style={{
      maxWidth: '640px',
      margin: '0 auto',
      padding: '48px 24px 80px',
    }}>
      {/* Back link */}
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--on-surface-variant)',
          textDecoration: 'none',
          marginBottom: '32px',
          transition: 'color 0.2s',
        }}
        className="back-link"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
        Back to feed
      </Link>

      {/* Page heading */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'var(--surface-container-low)',
            boxShadow: '8px 8px 20px rgba(0,88,190,0.08), inset 3px 3px 6px rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '22px' }}>upload</span>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--on-surface)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Share a Resource
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>
              Help the community by sharing a great learning resource.
            </p>
          </div>
        </div>
      </div>

      {/* Tips banner */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderRadius: '0.875rem',
        border: '1px solid rgba(0,88,190,0.15)',
        background: 'rgba(0,88,190,0.05)',
        padding: '14px 16px',
        marginBottom: '24px',
      }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>
          lightbulb
        </span>
        <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '1.6' }}>
          <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '4px' }}>Tips for a great submission:</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <li>• Be descriptive — explain what makes this resource valuable</li>
            <li>• Use a clear title that describes the content</li>
            <li>• Make sure the URL is accessible and working</li>
            <li>• Pick the most specific category that fits</li>
          </ul>
        </div>
      </div>

      {/* Form card */}
      <div style={{
        background: 'var(--surface-container-lowest)',
        borderRadius: '1rem',
        padding: '32px',
        boxShadow: '20px 20px 40px rgba(0,88,190,0.06), inset 4px 4px 10px rgba(255,255,255,0.9)',
      }}>
        <SubmitForm />
      </div>
    </div>
  );
}
