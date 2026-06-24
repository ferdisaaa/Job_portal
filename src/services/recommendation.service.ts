import { recommendations } from "./mockData";

export const recommendationService = {
  list: async () => recommendations,
  summary: async () => ({ matchScore: 95, totalMatches: recommendations.length, topRole: "Frontend Developer" }),
};
