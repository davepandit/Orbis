import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNavbar />
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
