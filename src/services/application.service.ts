import { api } from "./api";
import { applications } from "./mockData";

export const applicationService = {
  list: async () => applications,
  apply: async (jobId: string) => {
    const { data } = await api.post("/applications", { jobId });
    return data;
  },
};
