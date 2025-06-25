import React, { useState, useEffect, useRef } from "react";
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
import { Button, Avatar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// redux import
import { useDispatch, useSelector } from "react-redux";
import { removeCredentials } from "../slices/authSlice";

// RTK query hooks
import { useLogoutMutation } from "../slices/userSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false); // this one is for modal opening
  const dropdownRef = useRef(null);
  // NOTE - This flag is for testing only and needs to be replaced by the atual api call

  const [logout, { isLoading }] = useLogoutMutation();

  const { userBasicInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();

      // remove the user credentials from the store
      dispatch(removeCredentials());
      toast.success(`${res.message}`, {
        autoClose: 2000,
      });
      navigate("/login");
    } catch (error) {
      toast.error(`${error.data.message}`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {userBasicInfo ? (
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
            {userBasicInfo ? (
              <div className="hidden md:flex items-center space-x-11">
                {/* not sure whether i need this connection thing or not  */}

                {/* <button className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                  <FaUserFriends className="h-5 w-5" />
                  <span className="text-xs">Connections</span>
                </button> */}

                {/* not sure whether i need this message thing or not  */}
                <Link to="/my-messages">
                  <button className="flex flex-col items-center text-gray-600 hover:text-gray-900 hover:cursor-pointer">
                    <FaComments className="h-5 w-5" />
                    <span className="text-xs">Messages</span>
                  </button>
                </Link>

                {/* not sure whether i need this notifications thing or not  */}
                {/* <button className="flex flex-col items-center text-gray-600 hover:text-gray-900">
                  <FaBell className="h-5 w-5" />
                  <span className="text-xs">Notifications</span>
                </button> */}

                {/* host an event button  */}
                <Link to={"/create-event"}>
                  <Button
                    pill
                    size="sm"
                    color="redButton"
                    className="hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
                  >
                    + Host
                  </Button>
                </Link>

                <div className="relative inline-block" ref={dropdownRef}>
                  <div
                    onClick={() => setOpen(!open)}
                    className="hover:cursor-pointer"
                  >
                    <Avatar
                      placeholderInitials={userBasicInfo.username.slice(0, 3)}
                      rounded
                    />
                  </div>

                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                      <ul className="py-1 text-sm text-gray-700">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-red-100 text-red-500 hover:cursor-pointer"
                            onClick={() => setOpen(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 hover:cursor-pointer"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login">
                  <Button
                    pill
                    size="sm"
                    color="whiteButton"
                    className="hover:cursor-pointer active:ring-0 focus:ring-0 text-black"
                  >
                    LogIn
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button
                    pill
                    size="sm"
                    color="tealButton"
                    className="hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
                  >
                    SignUp
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Search Icon */}
            {userBasicInfo ? (
              <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <FaSearch className="h-6 w-6" />
              </button>
            ) : (
              <div className="flex gap-3 justify-center items-center md:hidden">
                <Link to="/login">
                  <Button
                    pill
                    size="sm"
                    color="whiteButton"
                    className="hover:cursor-pointer active:ring-0 focus:ring-0 text-black"
                  >
                    LogIn
                  </Button>
                </Link>
                <Link to={"/signup"}>
                  <Button
                    pill
                    size="sm"
                    color="tealButton"
                    className="hover:cursor-pointer active:ring-0 focus:ring-0 text-white"
                  >
                    SignUp
                  </Button>
                </Link>
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

            {userBasicInfo ? (
              <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      placeholderInitials={userBasicInfo.username.slice(0, 3)}
                      rounded
                      className="hover:cursor-pointer"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {userBasicInfo.email}
                      </div>
                      <Link to="/profile">
                        <div className="text-sm text-blue-600">
                          View profile
                        </div>
                      </Link>
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
