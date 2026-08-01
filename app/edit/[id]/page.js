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

  if (error || !resource) redirect('/');
  if (resource.user_id !== session.user.id) redirect('/');

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '120px 24px 80px' }}>

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
          Edit Resource
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '1.5' }}>
          Update the details of your shared resource.
        </p>
      </div>

      {/* Resource being edited */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '9px',
        borderRadius: '0.75rem',
        border: '1px solid var(--outline-variant)',
        background: 'var(--surface-container-low)',
        padding: '11px 14px', marginBottom: '20px',
      }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: '16px' }}>link</span>
        <span style={{ fontSize: '13px', color: 'var(--on-surface-variant)', fontWeight: '500' }}>
          Editing: <span style={{ color: 'var(--on-surface)' }}>{resource.title}</span>
        </span>
      </div>

      {/* Form card */}
      <div style={{
        background: 'var(--surface-container-lowest)',
        border: '1px solid var(--outline-variant)',
        borderRadius: '0.875rem',
        padding: '28px',
      }}>
        <SubmitForm initialData={resource} />
      </div>
    </div>
  );
}
