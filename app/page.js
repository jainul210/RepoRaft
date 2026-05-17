import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import ResourceFeed from '@/components/ResourceFeed';
import Link from 'next/link';
import { ArrowRight, BookOpen, Flame, Users, Zap } from 'lucide-react';
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

  const stats = {
    resources: resources.length,
    categories: new Set(resources.map((r) => r.category)).size,
    totalUpvotes: resources.reduce((acc, r) => acc + (r.upvote_count || 0), 0),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">

      <div className="relative mb-14 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-950/60 via-indigo-950/40 to-background p-10 text-center glow-violet">

        <div className="absolute left-1/4 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-40 w-40 translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
            <Flame className="h-3.5 w-3.5" />
            Curated by the community
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Learn Together,</span>
            <br />
            <span className="text-white">Grow Together</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
            The student-powered library of the best tutorials, GitHub repos, PDFs,
            and courses — organized by topic and ranked by the community.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {!session && (
              <Link
                href="/api/auth/signin"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/40 active:scale-95"
              >
                Join the community
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {session && (
              <Link
                href="/submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:from-violet-500 hover:to-indigo-500 active:scale-95"
              >
                Share a Resource
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
            {[
              { icon: BookOpen, label: 'Resources', value: stats.resources },
              { icon: Zap, label: 'Categories', value: stats.categories },
              { icon: Users, label: 'Total Upvotes', value: stats.totalUpvotes.toLocaleString() },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="mb-1 flex justify-center">
                  <Icon className="h-4 w-4 text-violet-400" />
                </div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ResourceFeed
        resources={resources}
        userUpvotedIds={userUpvotedIds}
        isLoggedIn={!!session}
        currentUserId={session?.user?.id}
      />
    </div>
  );
}
