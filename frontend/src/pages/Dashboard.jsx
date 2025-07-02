import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllClubMembersQuery } from "../slices/clubAdminSlice";
import SpinnerAnimation from "../utils/Spinner";
import Table from "../utils/Table";

const Dashboard = () => {
  const { admin } = useParams();
  const { data: allClubMembers, isLoading: allClubMembersLoading } =
    useGetAllClubMembersQuery(admin);

  console.log("All club members:", allClubMembers);

  const handleRemove = (user) => {
    console.log("Remove user:", user);
  };

  if (allClubMembersLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  return (
    <>
      <div className="text-center font-bold text-2xl mb-5">
        {admin} Dashboard
      </div>
      <Table users={allClubMembers.finalUsers} onRemove={handleRemove} />
    </>
  );
};

export default Dashboard;
