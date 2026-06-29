import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jobRoutes from './routes/job.routes';
import authRoutes from './routes/auth.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────────────
app.use('/api', jobRoutes);
app.use('/api', authRoutes);

// Health check / root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'KerjaGo API Server is running',
    version: '1.0.0',
  });
});

// ─── 404 Handler ─────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  });
});

// ─── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 KerjaGo API Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Endpoint: http://localhost:${PORT}/api/jobs`);
});

export default app;
