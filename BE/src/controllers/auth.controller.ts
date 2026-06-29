import { Request, Response } from 'express';
import prisma from '../config/db';
import { LoginInput } from '../interfaces/user.interface';

/**
 * POST /api/login
 * Menerima email dan password, mencocokkan dengan data di tabel users.
 */
export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: LoginInput = req.body;

    // Validasi field wajib
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi',
      });
      return;
    }

    // Cari user berdasarkan email via Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Email atau password salah',
      });
      return;
    }

    // Cocokkan password (plain text untuk testing UAS)
    if (user.password !== password) {
      res.status(401).json({
        success: false,
        message: 'Email atau password salah',
      });
      return;
    }

    // Login sukses — kirim data user (tanpa password)
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
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
