import { useState } from 'react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

interface HeroProps {
  jobCount: number;
  onSearch: (keyword: string, location: string) => void;
}

export default function HeroSection({ jobCount, onSearch }: HeroProps) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const { ref: sectionRef, isVisible } = useRevealOnScroll({ threshold: 0.1 });

  const handleSearch = () => {
    onSearch(keyword, location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pt-20 pb-14 relative text-center">
      {/* Decorative background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-125 h-125 bg-brand-lime/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div
        ref={sectionRef}
        className={`transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Badge with sparkle */}
        <div className="flex items-center gap-3 justify-center mb-5">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg className="animate-spin-slow w-9 h-9 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
            <svg className="absolute w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l1.5 6.5L20 9l-5 4.5 1.5 7L12 16l-5.5 4.5L8 13.5 3 9l6.5-.5z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-brand-dark bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5">
            Apply for a Job
          </span>
        </div>

        {/* Title — navy solid */}
        <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-brand-dark leading-[1.15] mb-6">
          Get The <br className="hidden lg:block" />
          Right Job You Deserve
        </h1>

        {/* Subtitle — exact text */}
        <p className="text-gray-500 text-base mb-6">
          {jobCount}+ jobs listed here! Your dream job is waiting.
        </p>

        {/* Mini stats row */}
        <div className="flex items-center gap-6 justify-center text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Verified companies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <span>Instant apply</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white border border-brand-border rounded-full shadow-sm px-5 py-3 max-w-3xl mx-auto hover:shadow-md transition-all duration-300">
          <div className="flex items-center flex-1 gap-2">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title or keyword"
              className="outline-none text-sm text-gray-700 w-full bg-transparent"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <span className="text-gray-300 mx-3 shrink-0">|</span>
          <div className="flex items-center gap-2 flex-1">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Jakarta, Indonesia"
              className="outline-none text-sm text-gray-700 w-full bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-brand-lime text-brand-dark font-semibold px-8 py-2.5 rounded-full text-sm ml-2 hover:opacity-90 hover:shadow-lg active:scale-95 transition-all duration-200 whitespace-nowrap shrink-0"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
