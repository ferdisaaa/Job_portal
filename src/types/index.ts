export type Role = "job_seeker" | "recruiter" | "admin";

export type JobStatus = "active" | "closed" | "draft";

export type ApplicationStatus = "Pending" | "Reviewed" | "Interview" | "Accepted" | "Rejected";

export type Job = {
  isBookmarked: any;
  verified: import("react").JSX.Element;
  id: string;
  company: string;
  companyLogo: string;
  position: string;
  location: string;
  workType: "Remote" | "Hybrid" | "On-site";
  jobType: "Full-time" | "Part-time" | "Freelance" | "Contract" | "Internship";
  experience: "Entry Level" | "Mid Level" | "Senior Level" | "Lead / Manager";
  salaryMin: number;
  salaryMax: number;
  category: string;
  description: string;
  postedAt: string;
  deadline: string;
  matchScore: number;
  status: JobStatus;
};

export type Application = {
  id: string;
  jobId: string;
  position: string;
  company: string;
  date: string;
  status: ApplicationStatus;
};

export type UserProfile = {
  name: string;
  email: string;
  role: Role;
  headline: string;
  location: string;
  avatar?: string;
  skills: string[];
  education: string;
  experience: string;
};

export type Recommendation = {
  ranking: number;
  job: Job;
  score: number;
  reason: string;
};

export type Company = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  openJobs: number;
  description: string;
  rating: number;
  employees: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  trend: string;
};

export type JobFormValues = {
  title: string;
  description: string;
  location: string;
  category: string;
  salaryMin: number;
  salaryMax: number;
  jobType: Job["jobType"];
  deadline: string;
};
