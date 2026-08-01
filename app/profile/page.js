import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import ProfileResourceList from '@/components/ProfileResourceList';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'My Profile — RepoRaft',
  description: 'Your shared resources on RepoRaft.',
};

async function getUserResources(userId) {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin?callbackUrl=/profile');

  const resources = await getUserResources(session.user.id);
  const totalUpvotes = resources.reduce((sum, r) => sum + (r.upvote_count || 0), 0);

  return (
    <div style={{
      maxWidth: '760px',
      margin: '0 auto',
      padding: '100px 24px 80px',
    }}>
      {/* Back link */}
      <Link href="/" className="back-link" style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        fontSize: '13px', fontWeight: '500', color: 'var(--on-surface-variant)',
        textDecoration: 'none', marginBottom: '28px', transition: 'color 0.2s',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_back</span>
        Back to feed
      </Link>

      {/* Profile header card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
        padding: '24px', marginBottom: '24px',
        background: 'var(--surface-container-lowest)',
        border: '1px solid var(--outline-variant)',
        borderRadius: '0.875rem',
      }}>
        {/* Avatar */}
        <div style={{
          width: '72px', height: '72px', borderRadius: '9999px',
          border: '2px solid var(--outline-variant)',
          overflow: 'hidden', flexShrink: 0,
        }}>
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={72}
              height={72}
              style={{ display: 'block', borderRadius: '9999px' }}
            />
          ) : (
            <div style={{
              width: '72px', height: '72px', borderRadius: '9999px',
              background: 'var(--primary)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: '700', color: '#fff',
            }}>
              {session.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '20px', fontWeight: '700', color: 'var(--on-surface)',
            letterSpacing: '-0.01em', marginBottom: '3px',
          }}>
            {session.user?.name}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
            {session.user?.email}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {[
            { label: 'Resources', value: resources.length, icon: 'grid_view' },
            { label: 'Upvotes', value: totalUpvotes, icon: 'thumb_up' },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '3px', padding: '12px 20px',
              background: 'var(--surface-container-low)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '0.75rem', minWidth: '80px',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>
                {icon}
              </span>
              <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--on-surface)', lineHeight: 1 }}>
                {value}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', fontWeight: '500' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '16px', flexWrap: 'wrap', gap: '12px',
      }}>
        <div>
          <h2 style={{
            fontSize: '16px', fontWeight: '700', color: 'var(--on-surface)',
            letterSpacing: '-0.01em', marginBottom: '2px',
          }}>
            Your Shared Resources
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
            {resources.length} resource{resources.length !== 1 ? 's' : ''} shared with the community
          </p>
        </div>
        <Link
          href="/submit"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            padding: '8px 18px', borderRadius: '9999px',
            background: 'var(--primary)', color: 'var(--on-primary)',
            textDecoration: 'none', fontSize: '13px', fontWeight: '600',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>add</span>
          Share New
        </Link>
      </div>

      {/* Resource list */}
      <ProfileResourceList resources={resources} />
    </div>
  );
}
