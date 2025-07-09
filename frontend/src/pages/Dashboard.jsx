import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetAllClubMembersQuery,
  useRemoveUserFromClubMutation,
} from "../slices/clubAdminSlice";
import SpinnerAnimation from "../utils/Spinner";
import MembersTable from "../utils/MembersTable";
import { toast } from "react-toastify";
import { useMakeAdminMutation } from "../slices/userSlice";
import { useRemoveAdminMutation } from "../slices/userSlice";

const Dashboard = () => {
  const { admin } = useParams();
  const {
    data: allClubMembers,
    isLoading: allClubMembersLoading,
    refetch,
  } = useGetAllClubMembersQuery(admin);
  const [removeUserFromClub] = useRemoveUserFromClubMutation();
  const [makeAdmin] = useMakeAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();

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

  const handleMakeAdmin = async (user) => {
    console.log("user to make admin:", user);
    try {
      const res = await makeAdmin({ user, admin }).unwrap();
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  const handleRemoveAdmin = async (user) => {
    console.log("user to remove admin:", user);
    try {
      const res = await removeAdmin({ user, admin }).unwrap();
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
      <MembersTable
        users={allClubMembers.finalUsers}
        onRemove={handleRemove}
        adminType={admin}
        onRight={handleMakeAdmin}
        onCross={handleRemoveAdmin}
      />
    </>
  );
};

export default Dashboard;
