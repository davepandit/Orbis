import React, { useState, useEffect } from "react";
import EventsTable from "../utils/EventsTable";
import { Button } from "flowbite-react";
import { useCreateEventMutation } from "../slices/clubAdminSlice";
import { useGetClubEventsQuery } from "../slices/eventSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SpinnerAnimation from "../utils/Spinner";
import { useNavigate } from "react-router-dom";

const ManageEvents = () => {
  const { admin } = useParams();
  const navigate = useNavigate();

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const {
    data: clubEvents,
    isLoading: clubEventsLoading,
    refetch,
  } = useGetClubEventsQuery(admin);

  const handleCreateEvent = async () => {
    try {
      const res = await createEvent(admin).unwrap();

      const { message, ...cleanRes } = res;
      // refetch the club events again so that the data in the table gets updated
      refetch();

      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };
  const handleDeleteEvent = (event) => {
    console.log("User from remove:", event);
  };

  const handleEdit = (event) => {
    console.log("User from edit:", event);
    // navigate to the edit events page
    navigate(`/${admin}/edit-basic-event-info/${event._id}`);
  };

  if (clubEventsLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  return (
    <>
      <div className="text-center font-bold text-2xl">Manage Events</div>
      <div className="relative mt-6 mb-20">
        <Button
          pill
          size="sm"
          color="grayButton"
          className="absolute right-0 hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
          onClick={handleCreateEvent}
        >
          Create new event
        </Button>
      </div>
      <EventsTable
        events={clubEvents?.finalEvents || []}
        onRemove={handleDeleteEvent}
        onEdit={handleEdit}
      />
    </>
  );
};

export default ManageEvents;
