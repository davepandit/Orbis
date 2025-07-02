import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllClubMembersQuery,
  useRemoveUserFromClubMutation,
} from "../slices/clubAdminSlice";
import SpinnerAnimation from "../utils/Spinner";
import Table from "../utils/Table";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { admin } = useParams();
  const {
    data: allClubMembers,
    isLoading: allClubMembersLoading,
    refetch,
  } = useGetAllClubMembersQuery(admin);
  const [removeUserFromClub] = useRemoveUserFromClubMutation();

  console.log("All club members:", allClubMembers);

  const handleRemove = async (user) => {
    console.log("Remove user:", user);
    const username = user.username;
    try {
      const res = await removeUserFromClub({ admin, username }).unwrap();
      refetch();
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
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
