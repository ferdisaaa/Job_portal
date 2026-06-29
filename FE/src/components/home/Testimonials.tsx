import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    name: 'Muhammad Hanif',
    role: 'Frontend Engineer',
    company: 'GoTo',
    avatar: 'MH',
    text: 'Dapat kerja sebagai Frontend Developer di Tech Startup Jakarta lewat Kerjago cuma butuh waktu 2 minggu. Fitur Instant Apply-nya ngebantu banget tanpa perlu isi form berulang kali!',
  },
  {
    name: 'Siti Aminah',
    role: 'HR Recruiter',
    company: 'Bank Mandiri',
    avatar: 'SA',
    text: 'Sebagai HR, platform ini mempermudah screening kandidat karena data CV dan profil pelamar sudah terstruktur rapi. Dashboard-nya sangat intuitif.',
  },
  {
    name: 'Budi Santoso',
    role: 'Data Analyst',
    company: 'Bukalapak',
    avatar: 'BS',
    text: 'Sangat terbantu dengan sistem filter lowongan yang akurat. Gak ada lagi drama salah lamar atau informasi gaji yang ditutupi.',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const goTo = (idx: number) => setActiveIndex(idx);
  const prev = () => setActiveIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setActiveIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  useEffect(() => {
    if (cardRef.current) {
      setHeight(cardRef.current.scrollHeight);
    }
  }, [activeIndex]);

  return (
    <section className="bg-brand-bg-light py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand-dark text-center mb-2">What Our Users Say</h2>
        <p className="text-gray-500 text-sm text-center mb-10">
          Real stories from real professionals
        </p>

        {/* Testimonial card with smooth height + fade */}
        <div className="max-w-2xl mx-auto">
          <div
            className="relative transition-all duration-300 ease-in-out"
            style={{ height: height ? `${height}px` : 'auto' }}
          >
            {testimonials.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  ref={isActive ? cardRef : null}
                  className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 ease-in-out ${
                    idx === 0 ? 'border-lime-200' : 'border-gray-100'
                  } ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{ position: isActive ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {item.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        &ldquo;{item.text}&rdquo;
                      </p>
                      <div>
                        <p className="font-bold text-brand-dark text-sm">{item.name}</p>
                        <p className="text-gray-400 text-xs">{item.role} at {item.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation circles */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all duration-200"
            aria-label="Previous"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'bg-brand-dark w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all duration-200"
            aria-label="Next"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
