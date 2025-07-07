import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useEditEventSponsorsMutation } from "../slices/eventSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerAnimation from "../utils/Spinner";

const EditEventSponsors = () => {
  const { admin, eventId } = useParams();
  const [editEventSponsors, { isLoading }] = useEditEventSponsorsMutation();
  const [sponsors, setSponsors] = useState([
    {
      name: "",
      tier: "",
      website_url: "",
      logo_file: null,
    },
  ]);

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index][field] = value;
    setSponsors(updatedSponsors);
  };

  const handleFileChange = (index, file) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index].logo_file = file;
    setSponsors(updatedSponsors);
  };

  const handleAddSponsor = () => {
    setSponsors([
      ...sponsors,
      {
        name: "",
        tier: "",
        website_url: "",
        logo_file: null,
      },
    ]);
  };

  const handleRemoveSponsor = (index) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors.splice(index, 1);
    setSponsors(updatedSponsors);
  };

  const handleSave = async () => {
    console.log("sponsors:", sponsors);
    const formData = new FormData();

    sponsors.forEach((sponsor) => {
      formData.append(
        "sponsors",
        JSON.stringify({
          name: sponsor.name,
          tier: sponsor.tier,
          website_url: sponsor.website_url,
        })
      );
      formData.append("logo_file", sponsor.logo_file);
    });

    try {
      const res = await editEventSponsors({
        formData,
        admin,
        eventId,
      }).unwrap();

      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  if (isLoading) {
    return <SpinnerAnimation size="xl" color="failure" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Sponsor Name
                  </label>
                  <input
                    type="text"
                    value={sponsor.name}
                    onChange={(e) =>
                      handleSponsorChange(index, "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Tier
                  </label>
                  <select
                    value={sponsor.tier}
                    onChange={(e) =>
                      handleSponsorChange(index, "tier", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  >
                    <option value="" disabled>
                      -- Select tier --
                    </option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="bronze">Bronze</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={sponsor.website_url}
                    onChange={(e) =>
                      handleSponsorChange(index, "website_url", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Logo Upload
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                    className="w-full"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveSponsor(index)}
                  className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700 hover:cursor-pointer"
                >
                  <FaTrash /> Remove Sponsor
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSponsor}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
            >
              <FaPlus className="mr-2" /> Add Another Sponsor
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventSponsors;
