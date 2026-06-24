import { api } from "./api";
import { profile } from "./mockData";

export const userService = {
  profile: async () => profile,
  updateProfile: async (payload: unknown) => {
    const { data } = await api.put("/users/profile", payload);
    return data;
  },
};
