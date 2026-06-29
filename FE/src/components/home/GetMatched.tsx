import { useState } from 'react';
import { useJobs } from '../../context/JobContext';

export default function GetMatched() {
  const { addApplicant } = useJobs();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [candidateType, setCandidateType] = useState('Pencari Kerja');
  const [proposal, setProposal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !proposal) {
      alert('Please fill in all fields');
      return;
    }
    addApplicant({
      jobId: 'general',
      name,
      email,
      candidateType,
      proposal,
    });
    alert('Your application has been submitted successfully!');
    setName('');
    setEmail('');
    setCandidateType('Pencari Kerja');
    setProposal('');
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-4">
            Get Matched With<br />Your Dream Job
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Drop your CV and let our AI match you with the perfect position. 
            Thousands of professionals have found their ideal role through our platform.
            Simply fill in your details and we will take care of the rest.
          </p>
        </div>

        {/* Right - Form Card */}
        <div className="bg-brand-dark rounded-xl p-8 text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-brand-lime rounded"></div>
            <span className="text-lg font-bold">Kerjago</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-300 mb-1 block">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-brand-lime transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-brand-lime transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 mb-1 block">Candidate Type</label>
              <select
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-brand-lime transition-colors"
                value={candidateType}
                onChange={(e) => setCandidateType(e.target.value)}
              >
                <option value="Pencari Kerja" className="text-brand-dark">Pencari Kerja</option>
                <option value="Perusahaan" className="text-brand-dark">Perusahaan</option>
                <option value="Freelancer" className="text-brand-dark">Freelancer</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-300 mb-1 block">Proposal</label>
              <textarea
                placeholder="Tell us about your skills and experience..."
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-400 outline-none focus:border-brand-lime transition-colors resize-none"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-brand-lime text-brand-dark font-semibold py-3 rounded-full text-sm hover:opacity-90 transition-opacity mt-2"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
