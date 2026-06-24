import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { Table } from "../../components/ui/Table";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { jobs as seedJobs } from "../../services/mockData";
import type { Job, JobFormValues } from "../../types";
import { shortSalary } from "../../utils/format";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { JobFormModal } from "./JobFormModal";

export default function RecruiterJobsPage() {
  const [data, setData] = useState<Job[]>(seedJobs);
  const [createOpen, setCreateOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | undefined>();
  const [deleteJob, setDeleteJob] = useState<Job | undefined>();
  const [detailJob, setDetailJob] = useState<Job | undefined>();

  const createJob = (values: JobFormValues) => {
    const nextJob: Job = {
      id: `JOB-${String(data.length + 1).padStart(3, "0")}`,
      company: "CareerMatch Recruiter",
      companyLogo: "CM",
      position: values.title,
      location: values.location,
      workType: "Hybrid",
      jobType: values.jobType,
      experience: "Mid Level",
      salaryMin: values.salaryMin,
      salaryMax: values.salaryMax,
      category: values.category,
      description: values.description,
      postedAt: "Baru saja",
      deadline: values.deadline,
      matchScore: 90,
      status: "active",
    };
    setData((current) => [nextJob, ...current]);
  };

  const updateJob = (values: JobFormValues) => {
    if (!editJob) return;
    setData((current) =>
      current.map((job) =>
        job.id === editJob.id
          ? {
              ...job,
              position: values.title,
              description: values.description,
              location: values.location,
              category: values.category,
              salaryMin: values.salaryMin,
              salaryMax: values.salaryMax,
              jobType: values.jobType,
              deadline: values.deadline,
            }
          : job,
      ),
    );
    setEditJob(undefined);
  };

  const confirmDelete = () => {
    if (deleteJob) {
      setData((current) => current.filter((job) => job.id !== deleteJob.id));
      setDeleteJob(undefined);
    }
  };

  return (
    <DashboardLayout title="Manage Jobs" mode="recruiter">
      <div className="mb-5 flex justify-end">
        <Button icon={<Plus size={18} />} onClick={() => setCreateOpen(true)}>
          Tambah Lowongan
        </Button>
      </div>
      <Table<Job>
        data={data}
        columns={[
          { header: "ID", render: (item) => item.id },
          { header: "Posisi", render: (item) => <span className="font-bold">{item.position}</span> },
          { header: "Lokasi", render: (item) => item.location },
          { header: "Gaji", render: (item) => shortSalary(item.salaryMin, item.salaryMax) },
          { header: "Deadline", render: (item) => item.deadline },
          {
            header: "Action",
            render: (item) => (
              <div className="flex gap-2">
                <Button variant="secondary" size="icon" aria-label="Detail" icon={<Eye size={16} />} onClick={() => setDetailJob(item)} />
                <Button variant="secondary" size="icon" aria-label="Edit" icon={<Pencil size={16} />} onClick={() => setEditJob(item)} />
                <Button variant="danger" size="icon" aria-label="Delete" icon={<Trash2 size={16} />} onClick={() => setDeleteJob(item)} />
              </div>
            ),
          },
        ]}
      />
      <JobFormModal open={createOpen} onClose={() => setCreateOpen(false)} onSubmit={createJob} />
      <JobFormModal open={Boolean(editJob)} job={editJob} onClose={() => setEditJob(undefined)} onSubmit={updateJob} />
      <DeleteConfirmModal open={Boolean(deleteJob)} onClose={() => setDeleteJob(undefined)} onConfirm={confirmDelete} />
      <Modal open={Boolean(detailJob)} title="Detail Lowongan" onClose={() => setDetailJob(undefined)}>
        {detailJob && (
          <div className="space-y-5">
            <div className="rounded-xl2 border border-border p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-muted">{detailJob.company}</p>
                  <h2 className="text-2xl font-extrabold text-dark">{detailJob.position}</h2>
                </div>
                <Badge tone="green">{detailJob.status}</Badge>
              </div>
              <p className="leading-7 text-muted">{detailJob.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-semibold text-muted">Lokasi</p>
                <p className="mt-1 font-bold text-dark">{detailJob.location}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-semibold text-muted">Gaji</p>
                <p className="mt-1 font-bold text-dark">{shortSalary(detailJob.salaryMin, detailJob.salaryMax)}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-semibold text-muted">Job Type</p>
                <p className="mt-1 font-bold text-dark">{detailJob.jobType}</p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-semibold text-muted">Deadline</p>
                <p className="mt-1 font-bold text-dark">{detailJob.deadline}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
