import React, { useState, useEffect } from "react";
import EventsTable from "../utils/EventsTable";
import { Button } from "flowbite-react";
import { useCreateEventMutation } from "../slices/clubAdminSlice";
import { useGetClubEventsQuery } from "../slices/eventSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SpinnerAnimation from "../utils/Spinner";

const ManageEvents = () => {
  const { admin } = useParams();

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const {
    data: clubEvents,
    isLoading: clubEventsLoading,
    refetch,
  } = useGetClubEventsQuery(admin);

  console.log("Club events data:", clubEvents);

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
  const handleSomething = () => {
    console.log("Not sure about the functionality!!!");
  };

  if (clubEventsLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  return (
    <>
      <div className="text-center font-bold text-2xl">Manage Events</div>
      <div className="relative mb-16">
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
      <EventsTable events={clubEvents.finalEvents} onRemove={handleSomething} />
    </>
  );
};

export default ManageEvents;
