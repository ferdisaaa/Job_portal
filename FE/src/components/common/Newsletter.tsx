import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Subscribed successfully!');
      setEmail('');
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pb-16">
      <div className="bg-brand-dark rounded-2xl p-10 md:p-14 text-center">
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
          Never Want to Miss Any Job News?
        </h3>
        <p className="text-gray-400 text-sm mb-8">
          Subscribe to our newsletter and stay updated with the latest opportunities
        </p>

        <form onSubmit={handleSubscribe} className="flex items-center max-w-lg mx-auto gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white rounded-full px-6 py-3 text-sm text-brand-dark outline-none placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-brand-lime text-brand-dark font-semibold px-8 py-3 rounded-full text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
