import React, { useEffect } from "react";
import SpinnerAnimation from "../utils/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useGetMyBasicProfileWithGoogleQuery } from "../slices/userSlice";
import { toast } from "react-toastify";

const GoogleRedirect = () => {
  const {
    data: registerationData,
    isLoading,
    error,
  } = useGetMyBasicProfileWithGoogleQuery();

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");
  const dispatch = useDispatch();

  useEffect(() => {
    if (registerationData) {
      // Show toast only once
      toast.success(`${message}`, { autoClose: 2000 });

      // Save user to Redux
      dispatch(setCredentials({ ...registerationData }));

      // Redirect
      navigate("/profile");
    }
  }, [registerationData, dispatch, navigate]);

  if (isLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SpinnerAnimation size="xl" color="failure" />
    </div>
  );
};

export default GoogleRedirect;
