import type { Job, JobFormValues } from "../types";
import { api } from "./api";
import { jobs } from "./mockData";

export const jobService = {
  list: async (): Promise<Job[]> => jobs,
  detail: async (id: string): Promise<Job | undefined> => jobs.find((job) => job.id === id),
  create: async (payload: JobFormValues) => {
    const { data } = await api.post("/jobs", payload);
    return data;
  },
  update: async (id: string, payload: JobFormValues) => {
    const { data } = await api.put(`/jobs/${id}`, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await api.delete(`/jobs/${id}`);
    return data;
  },
};
