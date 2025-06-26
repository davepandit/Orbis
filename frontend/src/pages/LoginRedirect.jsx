import React, { useEffect } from "react";
import { useGetMyExtendedProfileQuery } from "../slices/userSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  setUserProfileCredentials,
  setUserEducationCredentials,
  setUserSkills,
  setUserSocialCredentials,
} from "../slices/authSlice";
import { useDispatch } from "react-redux";

const LoginRedirect = () => {
  const { data, isLoading, error } = useGetMyExtendedProfileQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      if (data?.userProfileInfo) {
        localStorage.setItem(
          "userProfileInfo",
          JSON.stringify(data.userProfileInfo)
        );
        dispatch(setUserProfileCredentials({ ...data.userProfileInfo }));
      }
      if (data?.userEducationInfo) {
        localStorage.setItem(
          "userEducationInfo",
          JSON.stringify(data.userEducationInfo)
        );
        dispatch(setUserEducationCredentials({ ...data.userEducationInfo }));
      }
      if (data?.userSkills.length > 0) {
        localStorage.setItem("userSkills", JSON.stringify(data.userSkills));
        dispatch(setUserSkills([...data.userSkills]));
      }
      if (data?.userSocialLinks) {
        localStorage.setItem(
          "userSocialLinks",
          JSON.stringify(data.userSocialLinks)
        );
        dispatch(setUserSocialCredentials({ ...data.userSocialLinks }));
      }

      // Now navigate once data has been stored
      navigate("/profile");
    }
  }, [data, navigate]);

  if (isLoading)
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            {/* Logo/Brand Area */}
            <div className="mb-8">
              <div className="mx-auto h-16 w-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <FiCheckCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Login Successful
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Welcome back! You're being redirected...
              </p>
            </div>

            {/* Loading Animation */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <AiOutlineLoading3Quarters className="h-12 w-12 text-red-500 animate-spin" />
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full animate-pulse"
                  style={{ width: "75%" }}
                ></div>
              </div>

              <p className="text-gray-500 text-sm">
                Redirecting to profile page...
              </p>
            </div>

            {/* Status Messages */}
            <div className="space-y-3 mt-8">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <FiCheckCircle className="h-4 w-4" />
                <span className="text-sm">Authentication verified</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-red-500">
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                <span className="text-sm">Loading your workspace</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                If you're not redirected automatically, please refresh the page
              </p>
            </div>
          </div>
        </div>
      </>
    );
  if (error) return <p>Error loading profile</p>;
};

export default LoginRedirect;
