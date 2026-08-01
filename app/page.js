import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import ResourceFeed from '@/components/ResourceFeed';
import CommunityCTA from '@/components/CommunityCTA';
import { dummyResources } from '@/lib/dummyData';

async function getResources() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*, profiles(name, image)')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return dummyResources;
    }
    return data;
  } catch {
    return dummyResources;
  }
}

async function getUserUpvotes(userId) {
  if (!userId) return [];
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('upvotes')
      .select('resource_id')
      .eq('user_id', userId);
    return (data || []).map((u) => u.resource_id);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const [resources, userUpvotedIds] = await Promise.all([
    getResources(),
    getUserUpvotes(session?.user?.id),
  ]);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '120px var(--container-padding) var(--stack-lg)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 'var(--stack-lg)' }}>

        {/* Resource Feed — also contains the #categories anchor */}
        <section id="resources">
          <ResourceFeed
            resources={resources}
            userUpvotedIds={userUpvotedIds}
            isLoggedIn={!!session}
            currentUserId={session?.user?.id}
          />
        </section>

        {/* Community CTA Section */}
        <section id="community">
          <CommunityCTA isLoggedIn={!!session} />
        </section>

      </div>

    </div>
  );
}
