import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { profile as seedProfile } from "../../services/mockData";
import { profileSchema } from "../../utils/validation";

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const [profile, setProfile] = useState(seedProfile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: profile
      ? {
          name: profile.name,
          headline: profile.headline,
          location: profile.location,
          skills: profile.skills.join(", "),
          education: profile.education,
          experience: profile.experience,
        }
      : undefined,
  });

  const onSubmit = async (data: ProfileForm) => {
    setProfile((current) => ({
      ...current,
      ...data,
      skills: data.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
    }));
  };

  return (
    <DashboardLayout title="Profile">
      <Card className="p-6">
        <div className="mb-8 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-center">
          <div className="relative h-24 w-24 rounded-full bg-slate-950 text-white">
            <span className="grid h-full w-full place-items-center text-2xl font-extrabold">AF</span>
            <button className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-dark">{profile?.name}</h2>
            <p className="mt-1 text-muted">{profile?.headline}</p>
          </div>
        </div>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Nama" error={errors.name?.message} {...register("name")} />
          <Input label="Lokasi" error={errors.location?.message} {...register("location")} />
          <Input label="Headline" className="md:col-span-2" error={errors.headline?.message} {...register("headline")} />
          <Input label="Update Skill" className="md:col-span-2" error={errors.skills?.message} {...register("skills")} />
          <Input label="Update Education" className="md:col-span-2" error={errors.education?.message} {...register("education")} />
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-dark">Update Experience</span>
            <textarea
              className="min-h-32 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
              {...register("experience")}
            />
            {errors.experience?.message && <span className="mt-1 block text-xs font-medium text-red-600">{errors.experience.message}</span>}
          </label>
          <div className="md:col-span-2">
            <Button icon={<Save size={18} />}>Simpan Profile</Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
}
