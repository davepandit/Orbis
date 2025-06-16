import React, { useState } from "react";
import {
  FaSearch,
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaUserFriends,
  FaComments,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaTimes,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // NOTE - This flag is for testing only and needs to be replaced by the atual api call
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {loggedIn ? (
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FaBars className="h-6 w-6" />
              </button>
            ) : null}

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <div className="text-2xl font-bold text-red-500">Orbis</div>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="ml-2">
                <input
                  type="text"
                  placeholder="Kharagpur, IN"
                  className="block w-32 px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <button className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                <FaSearch className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop Right Menu */}
            {loggedIn ? (
              <div className="hidden md:flex items-center space-x-4">
                <button className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                  <FaUserFriends className="h-5 w-5" />
                  <span className="text-xs">Connections</span>
                </button>

                <button className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                  <FaComments className="h-5 w-5" />
                  <span className="text-xs">Messages</span>
                </button>

                <button className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                  <FaBell className="h-5 w-5" />
                  <span className="text-xs">Notifications</span>
                </button>

                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  E
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  pill
                  size="sm"
                  color="whiteButton"
                  className="hover:cursor-pointer active:ring-0 focus:ring-0 text-black"
                >
                  LogIn
                </Button>
                <Button
                  pill
                  size="sm"
                  color="tealButton"
                  className="hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
                >
                  SignUp
                </Button>
              </div>
            )}

            {/* Mobile Search Icon */}
            {loggedIn ? (
              <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <FaSearch className="h-6 w-6" />
              </button>
            ) : (
              <div className="flex gap-3 justify-center items-center md:hidden">
                <Button
                  pill
                  size="sm"
                  color="whiteButton"
                  className="hover:cursor-pointer active:ring-0 focus:ring-0 text-black"
                >
                  LogIn
                </Button>
                <Button
                  pill
                  size="sm"
                  color="tealButton"
                  className="hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
                >
                  SignUp
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FaTimes className="h-6 w-6" />
              </button>

              <div className="text-2xl font-bold text-red-500">Orbis🍉</div>

              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <FaSearch className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex flex-col">
              <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaHome className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Home</span>
              </a>

              <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaCalendarAlt className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Your events</span>
              </a>

              {/* NOTE - Not sure as of now that do we need this or not */}
              {/* <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaUsers className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Your groups</span>
              </a> */}

              <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaComments className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Messages</span>
              </a>

              <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaBell className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Notifications</span>
              </a>

              <hr className="my-4" />

              <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaCog className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Settings</span>
              </a>

              <a
                href="#"
                className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50"
              >
                <FaQuestionCircle className="h-5 w-5 mr-4 text-gray-600" />
                <span className="text-lg">Help</span>
              </a>
            </div>

            {loggedIn ? (
              <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      E
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        extralargecode
                      </div>
                      <div className="text-sm text-blue-600">View profile</div>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900">
                    <FaSignOutAlt className="h-5 w-5" />
                    <span className="ml-2 text-sm">Log out</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
