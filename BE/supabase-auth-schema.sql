-- ============================================================
--  SUPABASE SQL SETUP — TABEL 'users' & DATA LOGIN SAMPEL
--  Jalankan script ini di SQL Editor Supabase (dashboard)
-- ============================================================

-- 1. HAPUS TABEL LAMA (jika sudah ada) — HATI-HATI!
DROP TABLE IF EXISTS public.users;

-- 2. BUAT TABEL users
CREATE TABLE public.users (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text        NOT NULL,
    email       text        NOT NULL UNIQUE,
    password    text        NOT NULL, -- Plain text untuk kemudahan testing UAS
    role        text        NOT NULL DEFAULT 'user',
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- 3. AKTIFKAN ROW LEVEL SECURITY
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. BUAT POLICY agar anon bisa SELECT (dibutuhkan untuk login)
CREATE POLICY "Allow anon select" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow anon insert" ON public.users FOR INSERT WITH CHECK (true);

-- ============================================================
--  SEED DATA — Akun Login
-- ============================================================

INSERT INTO public.users (name, email, password, role) VALUES
(
    'Yusuf Maulana',
    'yusuf@kerjago.com',
    'password123',
    'user'
);

-- ============================================================
--  VERIFIKASI DATA
-- ============================================================
SELECT id, name, email, role, created_at
FROM public.users
ORDER BY created_at DESC;
