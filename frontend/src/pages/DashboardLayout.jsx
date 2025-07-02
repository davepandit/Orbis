import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />
    </>
  );
};

export default DashboardLayout;
