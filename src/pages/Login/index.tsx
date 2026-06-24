import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { loginSchema } from "../../utils/validation";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), defaultValues: { email: "ananda@careermatch.id", password: "password" } });

  const onSubmit = async () => {
    localStorage.setItem("careermatch_token", "demo-token");
    navigate("/dashboard");
  };

  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[0.95fr_1.05fr]">
      <div className="hidden items-center justify-center bg-[linear-gradient(135deg,#2563EB_0%,#111827_100%)] p-12 text-white lg:flex">
        <div className="max-w-lg">
          <span className="mb-8 grid h-14 w-14 place-items-center rounded-xl bg-white/15">
            <BriefcaseBusiness size={28} />
          </span>
          <h1 className="text-5xl font-extrabold leading-tight">Selamat Datang Kembali</h1>
          <p className="mt-5 text-lg leading-8 text-blue-100">Masuk untuk melanjutkan lamaran, membaca rekomendasi AI, dan menemukan pekerjaan paling relevan.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8">
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
                <Sparkles size={22} />
              </span>
              <span className="text-xl font-extrabold text-dark">CareerMatch</span>
            </div>
            <h2 className="text-3xl font-extrabold text-dark">Login</h2>
            <p className="mt-2 text-sm text-muted">Gunakan akun kamu untuk masuk ke workspace.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            <Input label="Password" type="password" error={errors.password?.message} {...register("password")} />
            <Button className="w-full" disabled={isSubmitting}>
              Login
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            Belum punya akun?{" "}
            <Link className="font-bold text-primary" to="/register">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
