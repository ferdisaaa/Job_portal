-- ============================================================
--  SUPABASE SQL SETUP — TABEL 'jobs' & DATA SAMPEL
--  Jalankan script ini di SQL Editor Supabase (dashboard)
-- ============================================================

-- 1. HAPUS TABEL LAMA (jika sudah ada) — HATI-HATI!
DROP TABLE IF EXISTS public.jobs;

-- 2. BUAT TABEL jobs
CREATE TABLE public.jobs (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    title       text        NOT NULL,
    company     text        NOT NULL,
    location    text        NOT NULL,
    type        text        NOT NULL, -- Full-time, Part-time, Intern, Contract
    salary      text        NOT NULL,
    description text        NOT NULL,
    distance    integer     NULL,       -- Bisa null, diisi BE via enrichment
    education   text        NULL,       -- Bisa null, diisi BE via enrichment
    requirements text[]     NULL,       -- Array of text, diisi BE via enrichment
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- 3. AKTIFKAN ROW LEVEL SECURITY (opsional, untuk keamanan)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- 4. BUAT POLICY agar anon bisa baca & tulis (sesuaikan kebutuhanmu)
CREATE POLICY "Allow anon read"    ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow anon insert"  ON public.jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon delete"  ON public.jobs FOR DELETE USING (true);
CREATE POLICY "Allow anon update"  ON public.jobs FOR UPDATE USING (true);

-- ============================================================
--  SEED DATA — 8 Lowongan Kerja Varian
-- ============================================================

INSERT INTO public.jobs (title, company, location, type, salary, description) VALUES
(
    'Frontend Developer (React)',
    'PT Teknologi Maju',
    'Jakarta Selatan',
    'Full-time',
    'Rp 6.000.000 – Rp 12.000.000',
    'Kami mencari Frontend Developer yang berpengalaman dengan React.js untuk mengembangkan dan memelihara aplikasi web modern. Anda akan bekerja sama dengan tim desain dan backend untuk menciptakan pengalaman pengguna yang optimal.'
),
(
    'UI/UX Designer',
    'Startup Digital Kreatif',
    'Bandung',
    'Full-time',
    'Rp 5.000.000 – Rp 10.000.000',
    'Bergabunglah dengan tim desain kami untuk merancang antarmuka pengguna yang intuitif dan menarik. Kami mencari seorang kreatif yang menguasai Figma dan memahami user-centered design.'
),
(
    'Data Analyst Junior',
    'PT Analitik Data Indonesia',
    'Tangerang',
    'Full-time',
    'Rp 4.500.000 – Rp 7.000.000',
    'Kami membuka kesempatan bagi fresh graduate yang tertarik di bidang data analitik. Anda akan belajar mengolah data, membuat laporan, dan memberikan insight bagi tim bisnis.'
),
(
    'Digital Marketing Intern',
    'Agensi Marketing Pro',
    'Jakarta Pusat',
    'Intern',
    'Rp 1.500.000 – Rp 2.500.000',
    'Magang di tim digital marketing kami! Cari yang aktif, kreatif, dan ingin belajar SEO/SEM, pengelolaan media sosial, serta pembuatan konten digital.'
),
(
    'Backend Developer (Node.js)',
    'PT Solusi Teknologi',
    'Yogyakarta',
    'Full-time',
    'Rp 7.000.000 – Rp 14.000.000',
    'Membangun dan memelihara RESTful API serta microservices menggunakan Node.js dan TypeScript. Pengalaman dengan PostgreSQL/NoSQL sangat diutamakan.'
),
(
    'Mobile Developer (Flutter)',
    'PT Aplikasi Keren',
    'Surabaya',
    'Full-time',
    'Rp 6.500.000 – Rp 13.000.000',
    'Kembangkan aplikasi mobile cross-platform menggunakan Flutter. Kami mencari developer yang paham state management (Riverpod/BLoC) dan integrasi API.'
),
(
    'Senior Product Manager',
    'PT Inovasi Digital',
    'Jakarta Selatan',
    'Full-time',
    'Rp 15.000.000 – Rp 25.000.000',
    'Memimpin pengembangan produk digital dari hulu ke hilir. Bertanggung jawab terhadap roadmap, prioritas fitur, dan koordinasi antar tim.'
),
(
    'Graphic Designer (Part-time)',
    'CV Kreatif Studio',
    'Remote',
    'Part-time',
    'Rp 2.000.000 – Rp 4.000.000',
    'Mendesain konten visual untuk media sosial, website, dan materi promosi. Cocok untuk kamu yang ingin kerja fleksibel dari mana saja.'
);

-- ============================================================
--  VERIFIKASI DATA
-- ============================================================
SELECT id, title, company, location, type, salary, created_at
FROM public.jobs
ORDER BY created_at DESC;
