import { Router } from 'express';
import { getJobs, createJob, deleteJob } from '../controllers/job.controller';

const router: Router = Router();

// GET /api/jobs — Ambil semua lowongan dengan enrichment & filter
router.get('/jobs', getJobs);

// POST /api/jobs — Tambah lowongan baru dengan enrichment otomatis
router.post('/jobs', createJob);

// DELETE /api/jobs/:id — Hapus lowongan berdasarkan ID
router.delete('/jobs/:id', deleteJob);

export default router;
