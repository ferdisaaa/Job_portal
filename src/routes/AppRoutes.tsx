import { Route, Routes } from "react-router-dom";
import AdminPage from "../pages/Admin";
import AboutPage from "../pages/About";
import ApplicationsPage from "../pages/Applications";
import BookmarksPage from "../pages/Bookmarks";
import CompaniesPage from "../pages/Companies";
import DashboardPage from "../pages/Dashboard";
import JobDetailPage from "../pages/JobDetail";
import JobsPage from "../pages/Jobs";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RecommendationPage from "../pages/Recommendation";
import RecruiterDashboardPage from "../pages/Recruiter";
import RecruiterJobsPage from "../pages/Recruiter/Jobs";
import RegisterPage from "../pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/bookmarks" element={<BookmarksPage />} />
      <Route path="/recommendation" element={<RecommendationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/recruiter" element={<RecruiterDashboardPage />} />
      <Route path="/recruiter/jobs" element={<RecruiterJobsPage />} />
      <Route path="/recruiter/applicants" element={<RecruiterDashboardPage />} />
      <Route path="/recruiter/statistics" element={<RecruiterDashboardPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
