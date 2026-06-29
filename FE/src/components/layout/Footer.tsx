import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Company',
    links: ['About', 'Press', 'Jobs', 'Blog'],
  },
  {
    title: 'Resources',
    links: ['Help Center', 'Community', 'Guidelines', 'Terms of Service'],
  },
  {
    title: 'For Candidates',
    links: ['Find Jobs', 'Job Alerts', 'Career Notes', 'Profile Tips'],
  },
  {
    title: 'For Employers',
    links: ['Post a Job', 'Find Candidates', 'Pricing', 'Employer Tips'],
  },
];

const socialIcons = [
  { name: 'Facebook', icon: 'f' },
  { name: 'Instagram', icon: 'ig' },
  { name: 'Twitter', icon: '𝕏' },
  { name: 'LinkedIn', icon: 'in' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-brand-lime rounded"></div>
              <span className="text-lg font-bold text-brand-dark">Kerjago</span>
            </Link>
            <p className="text-gray-500 text-xs leading-relaxed">
              Your trusted platform for finding the perfect job and hiring top talent.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-brand-dark text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 text-xs hover:text-brand-dark transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-border py-5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialIcons.map((s) => (
              <a
                key={s.name}
                href="#"
                className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-xs font-medium text-gray-500 hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Kerjago. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
