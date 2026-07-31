'use client';

import { useState, useMemo } from 'react';
import ResourceCard from './ResourceCard';
import CategoryFilter from './CategoryFilter';

export default function ResourceFeed({ resources, userUpvotedIds, isLoggedIn, currentUserId }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('top');

  const filtered = useMemo(() => {
    let result = [...resources];

    if (activeCategory !== 'All') {
      result = result.filter((r) => r.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q)) ||
          r.category.toLowerCase().includes(q) ||
          r.url.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'top') {
      result.sort((a, b) => b.upvote_count - a.upvote_count);
    } else {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return result;
  }, [resources, search, activeCategory, sortBy]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Search + Sort row */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <span
            className="material-symbols-outlined"
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--outline)',
              pointerEvents: 'none',
              fontSize: '18px',
            }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search resources, topics, URLs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{
              width: '100%',
              paddingLeft: '44px',
              paddingRight: '16px',
              paddingTop: '10px',
              paddingBottom: '10px',
              fontSize: '14px',
              lineHeight: '20px',
            }}
          />
        </div>

        {/* Sort toggle */}
        <div className="sort-toggle">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '15px', color: 'var(--outline)', marginLeft: '8px' }}
          >
            tune
          </span>
          {[
            { key: 'top', label: '🔥 Top' },
            { key: 'new', label: '✨ New' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={sortBy === key ? 'sort-btn-active' : 'sort-btn-inactive'}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

      {/* Result count */}
      {(search || activeCategory !== 'All') && (
        <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {search && <> for &ldquo;<span style={{ color: 'var(--on-surface)', fontWeight: 500 }}>{search}</span>&rdquo;</>}
          {activeCategory !== 'All' && (
            <> in <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{activeCategory}</span></>
          )}
        </p>
      )}

      {/* List or Empty State */}
      {filtered.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--stack-md)',
            padding: '80px 0',
            textAlign: 'center',
            borderRadius: '1rem',
            border: '2px dashed var(--outline-variant)',
          }}
        >
          <div className="empty-state-circle">
            <span className="material-symbols-outlined" style={{ color: 'var(--outline)', fontSize: '36px' }}>
              inbox
            </span>
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--on-surface)' }}>
              No resources found
            </p>
            <p style={{ marginTop: '4px', fontSize: '13px', color: 'var(--on-surface-variant)' }}>
              {search ? 'Try a different search term' : 'Be the first to share a resource in this category!'}
            </p>
          </div>
          <button
            onClick={() => { setSearch(''); setActiveCategory('All'); }}
            style={{
              marginTop: '4px',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.05em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((resource, i) => (
            <div
              key={resource.id}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <ResourceCard
                resource={resource}
                userUpvoted={userUpvotedIds.includes(resource.id)}
                isLoggedIn={isLoggedIn}
                currentUserId={currentUserId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
