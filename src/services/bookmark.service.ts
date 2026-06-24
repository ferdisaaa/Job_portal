import { api } from "./api";
import { jobs } from "./mockData";

export const bookmarkService = {
  list: async () => jobs.slice(0, 4),
  add: async (jobId: string) => {
    const { data } = await api.post("/bookmarks", { jobId });
    return data;
  },
  remove: async (jobId: string) => {
    const { data } = await api.delete(`/bookmarks/${jobId}`);
    return data;
  },
};
