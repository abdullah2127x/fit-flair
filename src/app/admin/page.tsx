import React from "react";
import AdminPage from "./comp/AdminPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Fit Flair",
  description:
    "Manage products, orders, users, and site settings efficiently through the Fit Flair admin dashboard.",
};

const Admin = () => {
  return <AdminPage />;
};

export default Admin;
