'use client';

import { useState, useMemo } from 'react';
import ResourceCard from './ResourceCard';
import CategoryFilter from './CategoryFilter';
import { Search, SlidersHorizontal, Inbox } from 'lucide-react';

export default function ResourceFeed({ resources, userUpvotedIds, isLoggedIn, currentUserId }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('top'); // 'top' | 'new'

  const filtered = useMemo(() => {
    let result = [...resources];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((r) => r.category === activeCategory);
    }

    // Search filter (title + description + category)
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

    // Sort
    if (sortBy === 'top') {
      result.sort((a, b) => b.upvote_count - a.upvote_count);
    } else {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return result;
  }, [resources, search, activeCategory, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources, topics, URLs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Sort toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          <SlidersHorizontal className="ml-2 h-3.5 w-3.5 text-muted-foreground/60" />
          {['top', 'new'].map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`rounded-lg px-3 py-1 text-xs font-medium capitalize transition-all ${
                sortBy === s
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {s === 'top' ? '🔥 Top' : '✨ New'}
            </button>
          ))}
        </div>
      </div>
      
      <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

      {(search || activeCategory !== 'All') && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {search && <> for &ldquo;<span className="text-white">{search}</span>&rdquo;</>}
          {activeCategory !== 'All' && (
            <> in <span className="text-violet-400">{activeCategory}</span></>
          )}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
            <Inbox className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-white">No resources found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search
                ? 'Try a different search term'
                : 'Be the first to share a resource in this category!'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((resource, i) => (
            <div
              key={resource.id}
              style={{ animationDelay: `${i * 40}ms` }}
              className="animate-slide-up opacity-0 [animation-fill-mode:forwards]"
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
