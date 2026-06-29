import React from 'react';
import { useJobs } from '../../context/JobContext';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

const categoryIcons: Record<string, React.ReactNode> = {
  'UX/UI Design': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  'Digital Marketing': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
  'Web Development': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'Data Science': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const allCategories = [
  'UX/UI Design',
  'Digital Marketing',
  'Web Development',
  'Data Science',
];

interface CategoryProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategorySection({ activeCategory, onCategoryChange }: CategoryProps) {
  const { jobs } = useJobs();
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.15 });

  return (
    <section className="bg-brand-bg-light py-16">
      <div ref={ref} className="max-w-6xl mx-auto px-4">
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl font-bold text-brand-dark text-center mb-2">One Platform Many Solutions</h2>
          <p className="text-gray-500 text-sm text-center mb-10">
            Find your perfect career path across multiple domains
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {allCategories.map((cat, idx) => {
            const count = jobs.filter((j) => j.category === cat).length;
            const isActive = cat === activeCategory;
            const delay = idx * 100;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`group rounded-2xl p-6 text-center border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-lime-50 border-lime-200 shadow-sm'
                    : 'bg-gray-50/50 border-transparent hover:bg-white hover:border-gray-100'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {/* Icon container */}
                <div
                  className={`w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-lime-100 text-lime-600'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-lime-50 group-hover:text-lime-500'
                  }`}
                >
                  {categoryIcons[cat]}
                </div>
                <h3
                  className={`text-sm font-semibold tracking-tight ${
                    isActive ? 'text-lime-700' : 'text-gray-700'
                  }`}
                >
                  {cat}
                </h3>
                <p className={`text-xs mt-1.5 ${isActive ? 'text-lime-600' : 'text-gray-400'}`}>
                  {count} positions
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
