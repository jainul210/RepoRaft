import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import SubmitForm from '@/components/SubmitForm';
import Link from 'next/link';

export const metadata = {
  title: 'Edit Resource — RepoRaft',
  description: 'Edit your shared resource.',
};

export default async function EditPage({ params }) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/edit/${id}`);
  }

  const supabase = createServerSupabaseClient();
  const { data: resource, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !resource) {
    redirect('/');
  }

  if (resource.user_id !== session.user.id) {
    redirect('/');
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
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '22px' }}>edit</span>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--on-surface)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Edit Resource
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>
              Update the details of your shared resource.
            </p>
          </div>
        </div>
      </div>

      {/* Resource being edited */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '0.875rem',
        border: '1px solid var(--outline-variant)',
        background: 'var(--surface-container-low)',
        padding: '12px 16px',
        marginBottom: '24px',
      }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: '18px' }}>
          link
        </span>
        <span style={{ fontSize: '13px', color: 'var(--on-surface-variant)', fontWeight: '500' }}>
          Editing: <span style={{ color: 'var(--on-surface)' }}>{resource.title}</span>
        </span>
      </div>

      {/* Form card */}
      <div style={{
        background: 'var(--surface-container-lowest)',
        borderRadius: '1rem',
        padding: '32px',
        boxShadow: '20px 20px 40px rgba(0,88,190,0.06), inset 4px 4px 10px rgba(255,255,255,0.9)',
      }}>
        <SubmitForm initialData={resource} />
      </div>
    </div>
  );
}
