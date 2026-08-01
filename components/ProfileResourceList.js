'use client';

import { useState, useTransition } from 'react';
import { deleteResource } from '@/actions/resource';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Edit2, Trash2, Clock, ChevronUp } from 'lucide-react';

const CATEGORY_COLORS = {
  'Web Dev': '#1d6fb8', 'Data Structures': '#b45309', 'Algorithms': '#92400e',
  'Machine Learning': '#6d28d9', 'Physics': '#0e7490', 'Mathematics': '#be185d',
  'Database': '#065f46', 'DevOps': '#b91c1c', 'Mobile Dev': '#3730a3',
  'System Design': '#0f766e', 'Other': '#374151',
};
const CATEGORY_BG = {
  'Web Dev': '#dbeafe', 'Data Structures': '#fef3c7', 'Algorithms': '#fde68a',
  'Machine Learning': '#ede9fe', 'Physics': '#cffafe', 'Mathematics': '#fce7f3',
  'Database': '#d1fae5', 'DevOps': '#fee2e2', 'Mobile Dev': '#e0e7ff',
  'System Design': '#ccfbf1', 'Other': '#f3f4f6',
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return url; }
}

function ProfileResourceCard({ resource }) {
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const catColor = CATEGORY_COLORS[resource.category] || '#374151';
  const catBg = CATEGORY_BG[resource.category] || '#f3f4f6';

  async function handleDelete() {
    if (!confirm(`Delete "${resource.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteResource(resource.id);
    setDeleted(true);
    startTransition(() => router.refresh());
  }

  if (deleted) return null;

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '18px 20px',
      background: 'var(--surface-container-lowest)',
      border: '1px solid var(--outline-variant)',
      borderRadius: '0.875rem',
      transition: 'all 0.2s ease',
      opacity: deleting ? 0.5 : 1,
    }}
    className="profile-resource-card"
    >
      {/* Upvote count badge */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '3px', flexShrink: 0, paddingTop: '2px',
      }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '9px',
          border: '1px solid var(--outline-variant)',
          background: 'var(--surface-container-low)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <ChevronUp size={16} style={{ color: 'var(--outline)' }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--on-surface-variant)' }}>
          {resource.upvote_count ?? 0}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Category */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', borderRadius: '9999px',
          padding: '2px 9px', fontSize: '11px', fontWeight: '600',
          background: catBg, color: catColor,
          border: `1px solid ${catColor}25`, marginBottom: '7px',
        }}>
          {resource.category}
        </span>

        {/* Title */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'block', marginBottom: '5px' }}
        >
          <h3 style={{
            fontSize: '14px', fontWeight: '600', color: 'var(--on-surface)',
            lineHeight: '1.4', transition: 'color 0.2s',
          }}
          className="profile-card-title"
          >
            {resource.title}
          </h3>
        </a>

        {/* Description */}
        {resource.description && (
          <p style={{
            fontSize: '13px', lineHeight: '1.6', color: 'var(--on-surface-variant)',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '10px',
          }}>
            {resource.description}
          </p>
        )}

        {/* Meta + Actions row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--outline)' }}>
              <ExternalLink size={11} />
              {getDomain(resource.url)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--outline)' }}>
              <Clock size={11} />
              {formatDate(resource.created_at)}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Link
              href={`/edit/${resource.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '5px 12px', borderRadius: '9999px', fontSize: '12px',
                fontWeight: '600', textDecoration: 'none',
                color: 'var(--primary)', border: '1px solid rgba(0,88,190,0.25)',
                background: 'rgba(0,88,190,0.04)', transition: 'all 0.15s',
              }}
              className="profile-edit-btn"
            >
              <Edit2 size={12} />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '5px 12px', borderRadius: '9999px', fontSize: '12px',
                fontWeight: '600', cursor: 'pointer',
                color: 'var(--error)', border: '1px solid rgba(186,26,26,0.2)',
                background: 'rgba(186,26,26,0.04)', transition: 'all 0.15s',
                opacity: deleting ? 0.5 : 1,
              }}
              className="profile-delete-btn"
            >
              <Trash2 size={12} />
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfileResourceList({ resources }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {resources.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '12px', padding: '80px 0',
          textAlign: 'center', borderRadius: '0.875rem',
          border: '2px dashed var(--outline-variant)',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '9999px',
            border: '1px solid var(--outline-variant)', background: 'var(--surface-container-low)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: '28px' }}>
              inbox
            </span>
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--on-surface)' }}>
              No resources shared yet
            </p>
            <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>
              Be the first to share something with the community!
            </p>
          </div>
          <Link
            href="/submit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 20px', borderRadius: '9999px',
              background: 'var(--primary)', color: 'var(--on-primary)',
              textDecoration: 'none', fontSize: '13px', fontWeight: '600',
              marginTop: '4px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>add</span>
            Share your first resource
          </Link>
        </div>
      ) : (
        resources.map((r) => <ProfileResourceCard key={r.id} resource={r} />)
      )}

      <style>{`
        .profile-resource-card:hover {
          border-color: rgba(0,88,190,0.2) !important;
          box-shadow: 0 4px 20px rgba(0,88,190,0.06);
        }
        .profile-card-title:hover { color: var(--primary) !important; }
        .profile-edit-btn:hover {
          background: rgba(0,88,190,0.09) !important;
          border-color: rgba(0,88,190,0.4) !important;
        }
        .profile-delete-btn:hover {
          background: rgba(186,26,26,0.09) !important;
          border-color: rgba(186,26,26,0.35) !important;
        }
      `}</style>
    </div>
  );
}
