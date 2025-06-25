import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivatePage = () => {
  const { userBasicInfo } = useSelector((state) => state.auth);
  return <>{userBasicInfo ? <Outlet /> : <Navigate to="/login" replace />}</>;
};

export default PrivatePage;
