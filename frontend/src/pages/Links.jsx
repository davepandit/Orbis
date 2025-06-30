import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserSocialCredentials } from "../slices/authSlice";
import { resolvePath, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCompleteUserProfileMutation } from "../slices/userSlice";
import SpinnerAnimation from "../utils/Spinner";
import { useUpdateSocialLinksMutation } from "../slices/userSlice";

export default function OnlineProfilesForm() {
  const [completeUserProfile, { isLoading }] = useCompleteUserProfileMutation();
  // get all the states from redux
  const { userProfileInfo, userEducationInfo, userSkills, userSocialLinks } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateSocialLinks, { isLoading: updateSocialLinksLoading }] =
    useUpdateSocialLinksMutation();

  const [profiles, setProfiles] = useState(
    userSocialLinks ? userSocialLinks : {}
  );

  const handleInputChange = (platform, value) => {
    setProfiles((prev) => ({ ...prev, [platform]: value }));
  };

  const clearField = (platform) => {
    setProfiles((prev) => ({ ...prev, [platform]: "" }));
  };

  const handleSave = async () => {
    // save profiles to the redux store
    dispatch(setUserSocialCredentials({ ...profiles }));

    // send all the user details to the backend
    try {
      const res = await completeUserProfile({
        userProfileInfo: userProfileInfo,
        userEducationInfo: userEducationInfo,
        userSkills: userSkills,
        userSocialLinks: profiles,
      }).unwrap();

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

  const handleUpdate = async () => {
    if (
      userSocialLinks?.github_url != profiles.github_url ||
      userSocialLinks?.twitter_url != profiles.twitter_url ||
      userSocialLinks?.linkedin_url != profiles.linkedin_url
    ) {
      try {
        const res = await updateSocialLinks({
          github_url: profiles.github_url,
          twitter_url: profiles.twitter_url,
          linkedin_url: profiles.linkedin_url,
        }).unwrap();

        const { message, ...cleanRes } = res;
        dispatch(setUserSocialCredentials({ ...cleanRes }));
        toast.success(`${res.message}`, {
          autoClose: 2000,
        });
      } catch (error) {
        toast.error(`${error.data.message}`, {
          autoClose: 2000,
        });
      }
    } else {
      toast.error("No field changed!!!", {
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }
  // Simple icons using SVG since we can't import react-icons
  const LinkedInIcon = () => (
    <svg
      className="w-5 h-5 text-blue-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg
      className="w-5 h-5 text-gray-800"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Online Profiles
            </h1>
          </div>

          <form className="space-y-6">
            {/* GitHub URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                GitHub URL
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <GitHubIcon />
                </div>
                <input
                  type="url"
                  value={profiles.github_url}
                  onChange={(e) =>
                    handleInputChange("github_url", e.target.value)
                  }
                  placeholder="https://github.com/yourusername"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {profiles.github_url && (
                  <button
                    type="button"
                    onClick={() => clearField("github_url")}
                    className="absolute right-3 p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                LinkedIn
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <LinkedInIcon />
                </div>
                <input
                  type="url"
                  value={profiles.linkedin_url}
                  onChange={(e) =>
                    handleInputChange("linkedin_url", e.target.value)
                  }
                  placeholder="https://www.linkedin.com/in/yourusername"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {profiles.linkedin_url && (
                  <button
                    type="button"
                    onClick={() => clearField("linkedin_url")}
                    className="absolute right-3 p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Twitter/X URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                X (Twitter)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none">
                  <TwitterIcon />
                </div>
                <input
                  type="url"
                  value={profiles.twitter_url}
                  onChange={(e) =>
                    handleInputChange("twitter_url", e.target.value)
                  }
                  placeholder="https://x.com/yourusername"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                {profiles.twitter_url && (
                  <button
                    type="button"
                    onClick={() => clearField("twitter_url")}
                    className="absolute right-3 p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="text-sm font-medium text-red-800 mb-3">
                Profile Summary
              </h3>
              <div className="space-y-2">
                {profiles.github_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <GitHubIcon />
                    <span className="text-gray-700">GitHub profile added</span>
                    <span className="text-green-600">✓</span>
                  </div>
                )}
                {profiles.linkedin_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <LinkedInIcon />
                    <span className="text-gray-700">
                      LinkedIn profile added
                    </span>
                    <span className="text-green-600">✓</span>
                  </div>
                )}
                {profiles.twitter_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <TwitterIcon />
                    <span className="text-gray-700">
                      X (Twitter) profile added
                    </span>
                    <span className="text-green-600">✓</span>
                  </div>
                )}
                {!profiles.github_url &&
                  !profiles.linkedin_url &&
                  !profiles.twitter_url && (
                    <p className="text-sm text-red-600">
                      No profiles added yet
                    </p>
                  )}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6">
              {userSocialLinks ? (
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
