import React from "react";
import ProfileNavbar from "../components/ProfileNavbar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <>
      <ProfileNavbar />
      <div className="mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default ProfileLayout;
