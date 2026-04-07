import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth';
import SubmitForm from '@/components/SubmitForm';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';

export const metadata = {
  title: 'Share a Resource — ScholarHub',
  description: 'Share a tutorial, GitHub repo, PDF, or any learning resource with the community.',
};

export default async function SubmitPage() {
  const session = await getServerSession(authOptions);


  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/submit');
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
        <h1 className="text-3xl font-bold text-white">Share a Resource</h1>
        <p className="mt-2 text-muted-foreground">
          Help the community by sharing a tutorial, course, GitHub repo, documentation, or PDF.
        </p>
      </div>


      <div className="mb-8 flex gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
        <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
        <div className="text-sm text-blue-300/80">
          <p className="font-medium text-blue-300">Tips for a great submission:</p>
          <ul className="mt-1.5 space-y-1 text-xs">
            <li>• Be descriptive — explain what makes this resource valuable</li>
            <li>• Use a clear title that describes the content</li>
            <li>• Make sure the URL is accessible and working</li>
            <li>• Pick the most specific category that fits</li>
          </ul>
        </div>
      </div>


      <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
        <SubmitForm />
      </div>
    </div>
  );
}
