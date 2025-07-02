import React from "react";
import { useParams } from "react-router-dom";

const ApproveRequests = () => {
  const { admin } = useParams();
  return (
    <>
      <div>{admin}</div>
      <div>this page is meant for approving the user requests</div>
    </>
  );
};

export default ApproveRequests;
