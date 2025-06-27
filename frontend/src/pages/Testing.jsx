import React from "react";
import { useState } from "react";

const Testing = () => {
  const [firstName, setFirstName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Firstname:", firstName);
  };
  return (
    <>
      <form>
        <label className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white px-8 py-2 rounded-md font-medium transition-colors"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default Testing;
