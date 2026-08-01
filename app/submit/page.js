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
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* Back link */}
      <Link href="/" className="back-link" style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        fontSize: '13px', fontWeight: '500', color: 'var(--on-surface-variant)',
        textDecoration: 'none', marginBottom: '28px', transition: 'color 0.2s',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_back</span>
        Back to feed
      </Link>

      {/* Page heading */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '22px', fontWeight: '700', color: 'var(--on-surface)',
          letterSpacing: '-0.01em', marginBottom: '5px',
        }}>
          Share a Resource
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '1.5' }}>
          Help the community by sharing a great learning resource.
        </p>
      </div>

      {/* Tips banner */}
      <div style={{
        display: 'flex', gap: '11px',
        borderRadius: '0.75rem',
        border: '1px solid rgba(0,88,190,0.2)',
        background: 'rgba(0,88,190,0.04)',
        padding: '13px 15px', marginBottom: '20px',
      }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '17px', flexShrink: 0, marginTop: '1px' }}>
          lightbulb
        </span>
        <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '1.65' }}>
          <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '3px' }}>Tips for a great submission:</p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}>
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
        border: '1px solid var(--outline-variant)',
        borderRadius: '0.875rem',
        padding: '28px',
      }}>
        <SubmitForm />
      </div>
    </div>
  );
}
