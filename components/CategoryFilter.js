'use client';

import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Web Dev',
  'Data Structures',
  'Algorithms',
  'Machine Learning',
  'Physics',
  'Mathematics',
  'Database',
  'DevOps',
  'Mobile Dev',
  'System Design',
  'Other',
];

export default function CategoryFilter({ active, onSelect }) {
  return (
    <div className="flex items-center gap-2">
      <Tag className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              'flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 whitespace-nowrap',
              active === cat
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/30'
                : 'border border-white/10 bg-white/5 text-muted-foreground hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
