import React from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { admin } = useParams();
  return (
    <>
      <div>{admin} Dashboard</div>
      <div>this page is meant to manage the users </div>
    </>
  );
};

export default Dashboard;
