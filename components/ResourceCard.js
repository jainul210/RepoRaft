'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { toggleUpvote, deleteResource } from '@/actions/resource';
import { ChevronUp, ExternalLink, Clock, User, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';

const CATEGORY_COLORS = {
  'Web Dev':         'var(--cat-web)',
  'Data Structures': 'var(--cat-ds)',
  'Algorithms':      'var(--cat-algo)',
  'Machine Learning':'var(--cat-ml)',
  'Physics':         'var(--cat-physics)',
  'Mathematics':     'var(--cat-math)',
  'Database':        'var(--cat-db)',
  'DevOps':          'var(--cat-devops)',
  'Mobile Dev':      'var(--cat-mobile)',
  'System Design':   'var(--cat-system)',
  'Other':           'var(--cat-other)',
};

const CATEGORY_BG = {
  'Web Dev':         'var(--cat-web-bg)',
  'Data Structures': 'var(--cat-ds-bg)',
  'Algorithms':      'var(--cat-algo-bg)',
  'Machine Learning':'var(--cat-ml-bg)',
  'Physics':         'var(--cat-physics-bg)',
  'Mathematics':     'var(--cat-math-bg)',
  'Database':        'var(--cat-db-bg)',
  'DevOps':          'var(--cat-devops-bg)',
  'Mobile Dev':      'var(--cat-mobile-bg)',
  'System Design':   'var(--cat-system-bg)',
  'Other':           'var(--cat-other-bg)',
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

  const catColor = CATEGORY_COLORS[resource.category] || CATEGORY_COLORS['Other'];
  const catBg    = CATEGORY_BG[resource.category]    || CATEGORY_BG['Other'];

  return (
    <div className="resource-list-card animate-slide-up">

      {/* Left: Upvote */}
      <div style={{ display: 'flex', flexShrink: 0, flexDirection: 'column', alignItems: 'center', gap: '4px', paddingTop: '2px' }}>
        <button
          onClick={handleUpvote}
          disabled={!isLoggedIn || isPending}
          title={isLoggedIn ? 'Upvote this resource' : 'Sign in to upvote'}
          className={optimisticState.upvoted ? 'upvote-box upvote-box-active' : 'upvote-box upvote-box-inactive'}
          style={{
            opacity: isPending ? 0.6 : 1,
            cursor: !isLoggedIn ? 'not-allowed' : 'pointer',
          }}
        >
          <ChevronUp
            size={20}
            style={{
              transform: optimisticState.upvoted ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.15s',
            }}
          />
        </button>
        <span
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: optimisticState.upvoted ? 'var(--primary)' : 'var(--on-surface-variant)',
            transition: 'color 0.15s',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {optimisticState.count}
        </span>
      </div>

      {/* Right: Content */}
      <div style={{ minWidth: 0, flex: 1 }}>

        {/* Category badge */}
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: '9999px',
              padding: '2px 10px',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.04em',
              background: catBg,
              color: catColor,
              border: `1px solid ${catColor}30`,
            }}
          >
            {resource.category}
          </span>
        </div>

        {/* Title */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-title-link"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'flex-start', gap: '4px' }}
        >
          <h3
            style={{
              fontSize: '15px',
              fontWeight: '600',
              color: 'var(--on-surface)',
              lineHeight: '1.4',
              transition: 'color 0.2s',
            }}
          >
            {resource.title}
          </h3>
          <ExternalLink
            size={13}
            style={{ marginTop: '2px', flexShrink: 0, color: 'var(--outline)', opacity: 0 }}
            className="ext-icon"
          />
        </a>

        {/* Description */}
        {resource.description && (
          <p
            style={{
              marginTop: '6px',
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--on-surface-variant)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {resource.description}
          </p>
        )}

        {/* Meta row */}
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--outline)' }}>
              <ExternalLink size={11} />
              {getDomain(resource.url)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--outline)' }}>
              <User size={11} />
              {resource.profiles?.name || 'Anonymous'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--outline)' }}>
              <Clock size={11} />
              {formatDate(resource.created_at)}
            </span>
          </div>

          {/* Owner actions */}
          {currentUserId === resource.user_id && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Link
                href={`/edit/${resource.id}`}
                className="card-action-btn card-edit-btn"
                title="Edit resource"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  color: 'var(--on-surface-variant)',
                  transition: 'all 0.15s',
                  gap: '4px',
                  fontSize: '12px',
                }}
              >
                <Edit2 size={13} />
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                title="Delete resource"
                className="card-action-btn card-delete-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  color: 'var(--on-surface-variant)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  opacity: isDeleting ? 0.5 : 1,
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
