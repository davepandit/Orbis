import React, { useState } from "react";
import EventsTable from "../utils/EventsTable";
import { Button } from "flowbite-react";

const CreateEvent = () => {
  const [events, setEvents] = useState([]);
  const handleSomething = () => {
    console.log("Not sure about the functionality!!!");
  };
  return (
    <>
      <div>hey there dave here</div>
      <div className="relative mb-16">
        <Button
          pill
          size="sm"
          color="grayButton"
          className="absolute right-0 hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
        >
          Create new event
        </Button>
      </div>
      <EventsTable events={events} onRemove={handleSomething} />
    </>
  );
};

export default CreateEvent;
