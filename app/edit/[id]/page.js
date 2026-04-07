import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase';
import SubmitForm from '@/components/SubmitForm';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';

export const metadata = {
  title: 'Edit Resource — ScholarHub',
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
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to feed
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Resource</h1>
        <p className="mt-2 text-muted-foreground">
          Update the details of your shared resource.
        </p>
      </div>

      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
        <SubmitForm initialData={resource} />
      </div>
    </div>
  );
}
