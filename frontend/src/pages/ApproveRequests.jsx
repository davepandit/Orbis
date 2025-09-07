import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetPendingRequestsQuery,
  useApproveRequestMutation,
  useRejectRequestMutation,
} from "../slices/userSlice";
import SpinnerAnimation from "../utils/Spinner";

const ApproveRequests = () => {
  const { admin } = useParams();
  const {
    data: requestsData,
    isLoading,
    refetch,
  } = useGetPendingRequestsQuery(admin);
  const [approveRequest] = useApproveRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();

  const handleApprove = async (requestId) => {
    try {
      const res = await approveRequest({ admin, requestId }).unwrap();
      toast.success(res.message, { autoClose: 2000 });
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to approve request", {
        autoClose: 2000,
      });
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await rejectRequest({ admin, requestId }).unwrap();
      toast.success(res.message, { autoClose: 2000 });
      refetch();
    } catch (error) {
      toast.error(error.data?.message || "Failed to reject request", {
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  const requests = requestsData?.requests || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {admin} - Pending Membership Requests
          </h1>

          {requests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {request.user.first_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {request.user.first_name} {request.user.last_name}
                          </h3>
                          <p className="text-gray-600">
                            @{request.user.username}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {request.user.email}
                          </p>
                        </div>
                      </div>
                      {request.user.bio && (
                        <div className="mt-3">
                          <p className="text-gray-700">{request.user.bio}</p>
                        </div>
                      )}
                      <div className="mt-2">
                        <span className="text-sm text-gray-500">
                          Requested on:{" "}
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveRequests;
