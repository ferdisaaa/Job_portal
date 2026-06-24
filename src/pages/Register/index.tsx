import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { registerSchema } from "../../utils/validation";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "job_seeker" },
  });

  const onSubmit = async () => navigate("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-6">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-dark">Buat Akun CareerMatch</h1>
          <p className="mt-2 text-muted">Mulai bangun profil karier dan temukan rekomendasi terbaik.</p>
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nama" error={errors.name?.message} {...register("name")} />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <Input label="Password" type="password" error={errors.password?.message} {...register("password")} />
          <Input label="Confirm Password" type="password" error={errors.confirmPassword?.message} {...register("confirmPassword")} />
          <Select
            label="Role"
            error={errors.role?.message}
            options={[
              { label: "Job Seeker", value: "job_seeker" },
              { label: "Recruiter", value: "recruiter" },
            ]}
            {...register("role")}
          />
          <div className="flex items-end">
            <Button className="w-full" disabled={isSubmitting}>
              Daftar
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          Sudah punya akun?{" "}
          <Link className="font-bold text-primary" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
