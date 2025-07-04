import React from "react";
import EditEventNavbar from "../components/EditEventNavbar";
import { Outlet } from "react-router-dom";

const EditEventLayout = () => {
  return (
    <>
      <EditEventNavbar />
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default EditEventLayout;
