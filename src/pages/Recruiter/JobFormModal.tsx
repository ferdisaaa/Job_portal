import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Job } from "../../types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { Select } from "../../components/ui/Select";
import { jobSchema } from "../../utils/validation";

type JobForm = z.infer<typeof jobSchema>;

type Props = {
  open: boolean;
  job?: Job;
  onClose: () => void;
  onSubmit: (values: JobForm) => void;
};

export function JobFormModal({ open, job, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    values: {
      title: job?.position ?? "",
      description: job?.description ?? "",
      location: job?.location ?? "",
      category: job?.category ?? "",
      salaryMin: job?.salaryMin ?? 8_000_000,
      salaryMax: job?.salaryMax ?? 15_000_000,
      jobType: job?.jobType ?? "Full-time",
      deadline: job?.deadline ?? "2026-07-31",
    },
  });

  const submit = (values: JobForm) => {
    onSubmit(values);
    reset();
    onClose();
  };

  return (
    <Modal open={open} title={job ? "Edit Job" : "Tambah Lowongan"} onClose={onClose}>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(submit)}>
        <Input label="Judul" error={errors.title?.message} {...register("title")} />
        <Input label="Lokasi" error={errors.location?.message} {...register("location")} />
        <Input label="Kategori" error={errors.category?.message} {...register("category")} />
        <Select
          label="Job Type"
          error={errors.jobType?.message}
          options={["Full-time", "Part-time", "Freelance", "Contract", "Internship"].map((item) => ({ label: item, value: item }))}
          {...register("jobType")}
        />
        <Input label="Salary Min" type="number" error={errors.salaryMin?.message} {...register("salaryMin", { valueAsNumber: true })} />
        <Input label="Salary Max" type="number" error={errors.salaryMax?.message} {...register("salaryMax", { valueAsNumber: true })} />
        <Input label="Deadline" type="date" error={errors.deadline?.message} {...register("deadline")} />
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-dark">Deskripsi</span>
          <textarea
            className="min-h-32 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-dark outline-none focus:border-primary focus:ring-4 focus:ring-blue-100"
            {...register("description")}
          />
          {errors.description?.message && <span className="mt-1 block text-xs font-medium text-red-600">{errors.description.message}</span>}
        </label>
        <div className="flex justify-end gap-3 md:col-span-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button>{job ? "Simpan Perubahan" : "Tambah Lowongan"}</Button>
        </div>
      </form>
    </Modal>
  );
}
