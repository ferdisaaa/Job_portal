import { Request, Response } from 'express';
import prisma from '../config/db';
import { JobInput, JobRecord, JobFilterParams } from '../interfaces/job.interface';

// ============================================================
//  ENRICHMENT FUNCTIONS — DIBAWA KE BACK-END AGAR FE LEBIH RINGAN
// ============================================================

/**
 * Menghasilkan 4+ persyaratan kerja berdasarkan kata kunci judul lowongan.
 */
function generateRequirements(title: string, type: string): string[] {
  const lower = title.toLowerCase();

  if (lower.includes('ui/ux') || lower.includes('ui ux') || lower.includes('ux') || lower.includes('figma')) {
    return [
      `Pengalaman ${type === 'Internship' ? 'minimal 1 semester' : 'minimal 2 tahun'} sebagai UI/UX Designer`,
      'Menguasai Figma, Adobe XD, atau Sketch',
      'Memahami design system dan prototyping',
      'Portofolio desain yang relevan (wajib dilampirkan)',
      'Memahami prinsip User-Centered Design (UCD)',
    ];
  }

  if (
    lower.includes('web') ||
    lower.includes('frontend') ||
    lower.includes('front-end') ||
    lower.includes('react') ||
    lower.includes('angular') ||
    lower.includes('vue') ||
    lower.includes('fullstack') ||
    lower.includes('full-stack')
  ) {
    return [
      `Pengalaman ${type === 'Internship' ? 'minimal 1 semester' : 'minimal 2 tahun'} sebagai Web Developer`,
      'Menguasai HTML, CSS, JavaScript/TypeScript',
      `Menguasai framework ${lower.includes('react') ? 'React.js' : lower.includes('angular') ? 'Angular' : lower.includes('vue') ? 'Vue.js' : 'modern (React, Vue, atau Angular)'}`,
      'Memahami RESTful API dan integrasi database',
      'Terbiasa menggunakan Git dan metodologi Agile/Scrum',
    ];
  }

  if (
    lower.includes('digital marketing') ||
    lower.includes('marketing') ||
    lower.includes('seo') ||
    lower.includes('sosial media') ||
    lower.includes('social media') ||
    lower.includes('content writer') ||
    lower.includes('copywriter')
  ) {
    return [
      `Pengalaman ${type === 'Internship' ? 'minimal 1 semester' : 'minimal 1 tahun'} di bidang Digital Marketing`,
      'Menguasai SEO/SEM, Google Ads, dan media sosial Ads',
      'Mampu membuat konten copywriting yang engaging',
      'Terbiasa dengan tools analitik (Google Analytics, Meta Business Suite)',
      'Kreatif, detail-oriented, dan mampu bekerja dengan target (KPI/OKR)',
    ];
  }

  if (
    lower.includes('data science') ||
    lower.includes('data scientist') ||
    lower.includes('machine learning') ||
    lower.includes('deep learning') ||
    lower.includes('ai') ||
    lower.includes('artificial intelligence')
  ) {
    return [
      `Pengalaman ${type === 'Internship' ? 'minimal 1 semester' : 'minimal 2 tahun'} sebagai Data Scientist`,
      'Menguasai Python dan libraries data science (Pandas, NumPy, Scikit-learn)',
      'Memahami algoritma machine learning dan statistik',
      'Terbiasa dengan SQL dan database relasional',
      'Mampu menyajikan insight data secara visual dan komunikatif',
    ];
  }

  if (
    lower.includes('mobile') ||
    lower.includes('android') ||
    lower.includes('ios') ||
    lower.includes('flutter') ||
    lower.includes('react native') ||
    lower.includes('kotlin') ||
    lower.includes('swift')
  ) {
    return [
      `Pengalaman ${type === 'Internship' ? 'minimal 1 semester' : 'minimal 2 tahun'} sebagai Mobile Developer`,
      `Menguasai ${lower.includes('flutter') ? 'Flutter/Dart' : lower.includes('react native') ? 'React Native' : lower.includes('kotlin') ? 'Kotlin' : lower.includes('swift') ? 'Swift' : 'pengembangan mobile (Android/iOS)'}`,
      'Memahami arsitektur MVVM/MVC dan State Management',
      'Terbiasa dengan RESTful API dan integrasi backend',
      'Portofolio aplikasi yang pernah dirilis (wajib dilampirkan)',
    ];
  }

  // Default requirements
  return [
    `Pengalaman ${type === 'Internship' ? 'minimal 1 semester' : 'minimal 1 tahun'} di bidang terkait`,
    'Kemampuan komunikasi dan kolaborasi tim yang baik',
    'Bersedia bekerja dengan target dan tenggat waktu',
    'Memiliki inisiatif dan kemauan belajar yang tinggi',
    'Domisili di lokasi yang sesuai atau bersedia untuk pindah',
  ];
}

/**
 * Menentukan kualifikasi pendidikan minimum berdasarkan hierarki jabatan.
 */
function determineEducation(title: string): string {
  const lower = title.toLowerCase();

  if (
    lower.includes('intern') ||
    lower.includes('magang') ||
    lower.includes('trainee') ||
    lower.includes('fresh graduate') ||
    lower.includes('entry level')
  ) {
    return 'SMA/SMK Sederajat';
  }

  if (
    lower.includes('senior') ||
    lower.includes('lead') ||
    lower.includes('head') ||
    lower.includes('manager') ||
    lower.includes('director') ||
    lower.includes('principal') ||
    lower.includes('staff')
  ) {
    return 'Sarjana (S1) / Pascasarjana';
  }

  // Mid-level / default
  return 'Diploma (D3/D4)';
}

/**
 * Menghasilkan jarak pseudo-random konsisten (3–45 km) berdasarkan lokasi.
 * Menggunakan hash sederhana agar jarak konsisten per lokasi.
 */
function generateDistance(location: string): number {
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    const char = location.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  // Normalisasi ke rentang 3–45 km
  const normalized = Math.abs(hash) % 43; // 0–42
  return normalized + 3; // 3–45
}

// ============================================================
//  CONTROLLER HANDLERS
// ============================================================

/**
 * GET /api/jobs
 * Mengambil seluruh data lowongan dari database via Prisma, melakukan enrichment
 * jika ada field kosong, lalu memfilter berdasarkan query params.
 */
export async function getJobs(req: Request, res: Response): Promise<void> {
  try {
    // Ambil semua data dari tabel 'jobs' via Prisma
    const jobs = await prisma.job.findMany({
      orderBy: { created_at: 'desc' },
    });

    if (!jobs || jobs.length === 0) {
      res.status(200).json({ success: true, data: [], message: 'Tidak ada lowongan tersedia' });
      return;
    }

    // --- Enrichment: isi field yang masih kosong ---
    const enriched: JobRecord[] = jobs.map((job) => {
      const updatedJob: JobRecord = {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        salary: job.salary,
        description: job.description,
        distance: job.distance ?? generateDistance(job.location),
        education: job.education ?? determineEducation(job.title),
        requirements:
          job.requirements && job.requirements.length > 0
            ? job.requirements
            : generateRequirements(job.title, job.type),
        created_at: job.created_at,
      };
      return updatedJob;
    });

    // --- Filter berdasarkan Query Params ---
    const { search, education, maxDistance } = req.query as JobFilterParams;

    let filtered = [...enriched];

    // Filter search (pencarian judul, perusahaan, lokasi)
    if (search && search.trim() !== '') {
      const keyword = search.toLowerCase().trim();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(keyword) ||
          job.company.toLowerCase().includes(keyword) ||
          job.location.toLowerCase().includes(keyword)
      );
    }

    // Filter education (pendidikan minimum)
    if (education && education !== 'Semua') {
      filtered = filtered.filter((job) => {
        if (!job.education) return false;

        const edu = job.education.toLowerCase();

        // Mapping filter education
        switch (education) {
          case 'SMA/SMK Sederajat':
            return edu.includes('sma') || edu.includes('smk');
          case 'Diploma (D3/D4)':
            return edu.includes('diploma') || edu.includes('d3') || edu.includes('d4');
          case 'Sarjana (S1)':
            return edu.includes('sarjana') || edu.includes('s1');
          case 'Pascasarjana (S2/S3)':
            return edu.includes('pascasarjana') || edu.includes('s2') || edu.includes('s3');
          default:
            return true;
        }
      });
    }

    // Filter maxDistance (jarak maksimum)
    if (maxDistance && !isNaN(Number(maxDistance))) {
      const maxDist = Number(maxDistance);
      filtered = filtered.filter((job) => {
        const dist = job.distance ?? 0;
        return dist <= maxDist;
      });
    }

    res.status(200).json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: message,
    });
  }
}

/**
 * POST /api/jobs
 * Menerima data lowongan baru, menjalankan enrichment otomatis,
 * lalu menyimpannya ke database via Prisma.
 */
export async function createJob(req: Request, res: Response): Promise<void> {
  try {
    const body: JobInput = req.body;

    // Validasi field wajib
    if (!body.title || !body.company || !body.location || !body.type) {
      res.status(400).json({
        success: false,
        message: 'Field wajib: title, company, location, type harus diisi',
      });
      return;
    }

    // --- Enrichment otomatis sebelum INSERT ---
    const education = determineEducation(body.title);
    const requirements = generateRequirements(body.title, body.type);
    const distance = generateDistance(body.location);

    // INSERT ke tabel 'jobs' via Prisma
    const job = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        location: body.location,
        type: body.type,
        salary: body.salary ?? '',
        description: body.description ?? '',
        distance,
        education,
        requirements,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Lowongan berhasil ditambahkan',
      data: job,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: message,
    });
  }
}

/**
 * DELETE /api/jobs/:id
 * Menghapus lowongan berdasarkan ID (uuid).
 */
export async function deleteJob(req: Request, res: Response): Promise<void> {
  try {
    const id = String(req.params.id);

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'ID lowongan wajib diisi',
      });
      return;
    }

    // Cek apakah job ada
    const existing = await prisma.job.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({
        success: false,
        message: `Lowongan dengan ID ${id} tidak ditemukan`,
      });
      return;
    }

    // Hapus job
    await prisma.job.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: 'Lowongan berhasil dihapus',
      data: existing,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui';
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: message,
    });
  }
}
