'use client';

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
    <div className="category-scroll-container">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`filter-chip ${active === cat ? 'filter-chip-active' : 'filter-chip-inactive'}`}
        >
          {cat === 'All' ? 'All Repos' : cat}
        </button>
      ))}
    </div>
  );
}
