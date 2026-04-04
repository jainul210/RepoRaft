'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { toggleUpvote, deleteResource } from '@/actions/resource';
import { ChevronUp, ExternalLink, Clock, User, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CATEGORY_COLORS = {
  'Web Dev': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Data Structures': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Algorithms': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Machine Learning': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Physics': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Mathematics': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Database': 'bg-green-500/10 text-green-400 border-green-500/20',
  'DevOps': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Mobile Dev': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'System Design': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Other': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export default function ResourceCard({ resource, userUpvoted, isLoggedIn, currentUserId }) {
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);

  const [optimisticState, addOptimistic] = useOptimistic(
    { count: resource.upvote_count, upvoted: userUpvoted },
    (state, action) => ({
      count: action === 'upvote' ? state.count + 1 : state.count - 1,
      upvoted: action === 'upvote',
    })
  );

  const handleUpvote = () => {
    if (!isLoggedIn || isPending) return;

    startTransition(async () => {
      
      addOptimistic(optimisticState.upvoted ? 'downvote' : 'upvote');
      await toggleUpvote(resource.id);
    });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setIsDeleting(true);
      await deleteResource(resource.id);
    }
  };

  const categoryColor =
    CATEGORY_COLORS[resource.category] || CATEGORY_COLORS['Other'];

  return (
    <div className="group relative flex gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5 transition-all duration-200 hover:border-violet-500/20 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-violet-500/5 animate-slide-up">

      <div className="flex flex-shrink-0 flex-col items-center gap-1 pt-0.5">
        <button
          onClick={handleUpvote}
          disabled={!isLoggedIn || isPending}
          title={isLoggedIn ? 'Upvote this resource' : 'Sign in to upvote'}
          className={cn(
            'flex h-10 w-10 flex-col items-center justify-center rounded-xl border text-xs font-bold transition-all duration-150 active:scale-90',
            optimisticState.upvoted
              ? 'border-violet-500/40 bg-violet-500/20 text-violet-400 shadow-md shadow-violet-500/20'
              : isLoggedIn
              ? 'border-white/10 bg-white/5 text-muted-foreground hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-400'
              : 'cursor-not-allowed border-white/5 bg-transparent text-white/20',
            isPending && 'opacity-60'
          )}
        >
          <ChevronUp
            className={cn(
              'h-5 w-5 transition-transform',
              optimisticState.upvoted && 'scale-110'
            )}
          />
        </button>
        <span
          className={cn(
            'text-sm font-semibold tabular-nums transition-colors',
            optimisticState.upvoted ? 'text-violet-400' : 'text-muted-foreground'
          )}
        >
          {optimisticState.count}
        </span>
      </div>

      
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-start gap-2">
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
              categoryColor
            )}
          >
            {resource.category}
          </span>
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-start gap-1"
        >
          <h3 className="text-base font-semibold text-white transition-colors group-hover/link:text-violet-300 leading-snug">
            {resource.title}
          </h3>
          <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/link:opacity-100" />
        </a>

        {resource.description && (
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {resource.description}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-muted-foreground/60 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              {getDomain(resource.url)}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {resource.profiles?.name || 'Anonymous'}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(resource.created_at)}
            </span>
          </div>

          {currentUserId === resource.user_id && (
            <div className="flex items-center gap-2">
              <Link
                href={`/edit/${resource.id}`}
                className="flex items-center gap-1 rounded p-1 hover:bg-white/10 hover:text-violet-400 transition-colors"
                title="Edit resource"
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1 rounded p-1 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50"
                title="Delete resource"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
