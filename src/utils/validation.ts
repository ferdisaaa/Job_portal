import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Konfirmasi password wajib diisi"),
    role: z.enum(["job_seeker", "recruiter"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export const jobSchema = z
  .object({
    title: z.string().min(4, "Judul minimal 4 karakter"),
    description: z.string().min(20, "Deskripsi minimal 20 karakter"),
    location: z.string().min(3, "Lokasi wajib diisi"),
    category: z.string().min(3, "Kategori wajib diisi"),
    salaryMin: z.number().min(1_000_000, "Salary min tidak valid"),
    salaryMax: z.number().min(1_000_000, "Salary max tidak valid"),
    jobType: z.enum(["Full-time", "Part-time", "Freelance", "Contract", "Internship"]),
    deadline: z.string().min(1, "Deadline wajib diisi"),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: "Salary max harus lebih besar dari salary min",
    path: ["salaryMax"],
  });

export const profileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  headline: z.string().min(5, "Headline minimal 5 karakter"),
  location: z.string().min(3, "Lokasi wajib diisi"),
  skills: z.string().min(3, "Masukkan minimal satu skill"),
  education: z.string().min(5, "Pendidikan wajib diisi"),
  experience: z.string().min(10, "Pengalaman wajib diisi"),
});
