import DashboardPage from "./comp/Dashboardpage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Dashboard | Fit Flair",
  description:
    "Access your personalized Fit Flair dashboard to manage orders, track deliveries, and update your account details effortlessly.",
};

const Dashboard = () => {
  return <DashboardPage />;
};

export default Dashboard;
