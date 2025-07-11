import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LatestEvents from "../components/LatestEvents";
import TopCategories from "../components/TopCat";
import { Link } from "react-router-dom";

// hooks from RTK

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <LatestEvents />
      <section className="bg-[#f9fafa] rounded-xl max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Meetup</h2>
            <p className="text-gray-700 mb-6 max-w-xl">
              People use Meetup to meet new people, learn new things, find
              support, get out of their comfort zones, and pursue their
              passions, together. Membership is free.
            </p>
            <Link
              to="/signup"
              className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 hover:cursor-pointer transition"
            >
              Sign up
            </Link>
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
      <TopCategories />
      <Footer />
    </>
  );
};

export default Home;
