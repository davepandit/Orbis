import React from "react";
import Hero from "../components/Hero";
import LatestEvents from "../components/LatestEvents";

// hooks from RTK

const Home = () => {
  return (
    <>
      <Hero />
      <LatestEvents />
      <section className="bg-[#f9fafa] rounded-xl p-6 md:p-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Meetup</h2>
            <p className="text-gray-700 mb-6 max-w-xl">
              People use Meetup to meet new people, learn new things, find
              support, get out of their comfort zones, and pursue their
              passions, together. Membership is free.
            </p>
            <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 hover:cursor-pointer transition">
              Sign up
            </button>
          </div>

          {/* Image Section */}
          <div className="flex-1 max-w-sm">
            <img
              src={"/join_orbis.webp"}
              alt="Join Orbis"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
