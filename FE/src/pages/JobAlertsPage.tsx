import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useJobs } from '../context/JobContext';

interface JobAlert {
  id: string;
  keyword: string;
  category: string;
  email: string;
  frequency: string;
  createdAt: string;
}

export default function JobAlertsPage() {
  const { jobs } = useJobs();
  const [alerts, setAlerts] = useState<JobAlert[]>(() => {
    try {
      const stored = localStorage.getItem('kerjago_alerts');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Semua');
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('harian');

  const categories = ['Semua', 'UX/UI Design', 'Digital Marketing', 'Web Development', 'Data Science'];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword || !email) {
      alert('Harap isi kata kunci dan email!');
      return;
    }
    const newAlert: JobAlert = {
      id: Date.now().toString(),
      keyword,
      category,
      email,
      frequency,
      createdAt: new Date().toISOString(),
    };
    const updated = [newAlert, ...alerts];
    setAlerts(updated);
    localStorage.setItem('kerjago_alerts', JSON.stringify(updated));
    setKeyword('');
    setCategory('Semua');
    setEmail('');
    setFrequency('harian');
    alert('Notifikasi lowongan berhasil dibuat!');
  };

  const handleDelete = (id: string) => {
    const updated = alerts.filter((a) => a.id !== id);
    setAlerts(updated);
    localStorage.setItem('kerjago_alerts', JSON.stringify(updated));
  };

  const matchingCount = (alert: JobAlert) => {
    return jobs.filter((j) => {
      const matchKeyword = j.title.toLowerCase().includes(alert.keyword.toLowerCase()) ||
        j.company.toLowerCase().includes(alert.keyword.toLowerCase());
      const matchCategory = alert.category === 'Semua' || j.category === alert.category;
      return matchKeyword && matchCategory;
    }).length;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-brand-dark mb-2">Job Alerts</h1>
        <p className="text-gray-500 text-sm mb-8">
          Dapatkan notifikasi email otomatis ketika lowongan baru yang sesuai dengan kriteria Anda diposting.
        </p>

        {/* Form Buat Alert */}
        <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-brand-dark mb-4">Buat Notifikasi Baru</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Kata Kunci *</label>
              <input
                type="text"
                placeholder="misal: Frontend, Data, UI"
                className="w-full border border-brand-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-dark transition-colors"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Kategori</label>
              <select
                className="w-full border border-brand-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-dark transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Email *</label>
              <input
                type="email"
                placeholder="email@anda.com"
                className="w-full border border-brand-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-dark transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Frekuensi</label>
              <select
                className="w-full border border-brand-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-brand-dark transition-colors"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="harian">Harian</option>
                <option value="mingguan">Mingguan</option>
                <option value="bulanan">Bulanan</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="bg-brand-lime text-brand-dark font-semibold px-8 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                Buat Notifikasi
              </button>
            </div>
          </form>
        </div>

        {/* Daftar Alert Aktif */}
        <h2 className="text-lg font-bold text-brand-dark mb-4">
          Notifikasi Aktif ({alerts.length})
        </h2>
        {alerts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-brand-border rounded-xl">
            <p className="text-gray-400 text-sm">Belum ada notifikasi. Buat notifikasi pertama Anda!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white border border-brand-border rounded-xl p-5 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-brand-dark text-sm">{alert.keyword}</h3>
                    {alert.category !== 'Semua' && (
                      <span className="bg-brand-lime/30 text-brand-dark text-xs px-2.5 py-0.5 rounded-full">{alert.category}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    {alert.email} &middot; {alert.frequency} &middot; {matchingCount(alert)} lowongan cocok
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(alert.id)}
                  className="text-red-400 hover:text-red-600 text-xs font-medium ml-4"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
