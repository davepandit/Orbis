import React from "react";
import { useParams } from "react-router-dom";

const EditBasicEventInfo = () => {
  const { eventId } = useParams();

  return <div>EditBasicEventInfo {eventId}</div>;
};

export default EditBasicEventInfo;
