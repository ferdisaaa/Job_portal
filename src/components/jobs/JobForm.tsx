import { useState } from "react";
import { Button } from "../ui/Button";

interface JobFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function JobForm({
  initialData,
  onSubmit,
  loading = false
}: JobFormProps) {
  const [formData, setFormData] = useState({
    position: initialData?.position || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    workType: initialData?.workType || "Remote",
    jobType: initialData?.jobType || "Full-time",
    experience: initialData?.experience || "",
    salaryMin: initialData?.salaryMin || "",
    salaryMax: initialData?.salaryMax || "",
    description: initialData?.description || ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 font-medium">
          Posisi
        </label>

        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Perusahaan
        </label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="number"
          name="salaryMin"
          value={formData.salaryMin}
          onChange={handleChange}
          placeholder="Gaji Minimum"
          className="rounded-xl border p-3"
        />

        <input
          type="number"
          name="salaryMax"
          value={formData.salaryMax}
          onChange={handleChange}
          placeholder="Gaji Maksimum"
          className="rounded-xl border p-3"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="rounded-xl border p-3"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Freelance</option>
          <option>Contract</option>
        </select>

        <select
          name="workType"
          value={formData.workType}
          onChange={handleChange}
          className="rounded-xl border p-3"
        >
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>
      </div>

      <textarea
        rows={6}
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full rounded-xl border p-3"
        placeholder="Deskripsi pekerjaan..."
      />

      <Button
        type="submit"
        className="w-full"
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Lowongan"}
      </Button>
    </form>
  );
}