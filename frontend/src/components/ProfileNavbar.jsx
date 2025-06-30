import { useState, useEffect, useRef } from "react";
import { FaUser, FaBars, FaTimes, FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

const ProfileNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [showSecondaryTab, setShowSecondaryTab] = useState(
    location.pathname === "/profile" ? true : false
  );
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("About");
  const navigate = useNavigate();
  const { userBasicInfo } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false); // this one is for modal opening

  const primaryNavItems = [
    { title: "Profile", link: "/profile" },
    { title: "Events", link: "/my-registered-events" },
    { title: "Projects", link: "/my-projects" },
  ];
  const secondaryNavItems = [
    { title: "About", link: "/profile" },
    { title: "Education", link: "/profile/education" },
    { title: "Experience", link: "/profile/experience" },
    { title: "Links", link: "/profile/links" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (location.pathname.includes("/profile")) {
      setShowSecondaryTab(true);
      setActiveTab("Profile");
      if (location.pathname.includes("/education")) {
        setActiveSecondaryTab("Education");
      } else if (location.pathname.includes("/experience")) {
        setActiveSecondaryTab("Experience");
      } else if (location.pathname.includes("/links")) {
        setActiveSecondaryTab("Links");
      }
    } else if (location.pathname === "/my-registered-events") {
      setShowSecondaryTab(false);
      setActiveTab("Events");
    } else if (location.pathname === "/my-projects") {
      setShowSecondaryTab(false);
      setActiveTab("Projects");
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <Link to="/">
              <span className="text-xl font-semibold text-gray-900">Orbis</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {primaryNavItems.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setActiveTab(item.title);
                  navigate(`${item.link}`);
                }}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 hover:cursor-pointer ${
                  activeTab === item.title
                    ? "bg-red-500 text-white"
                    : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* User Info - Desktop */}
          {userBasicInfo &&
          userBasicInfo.role.filter((role) => role !== "user").length > 0 ? (
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
                <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  <ul className="py-1 text-sm text-gray-700">
                    {/* Show admin options only for roles that are not "user" */}
                    {userBasicInfo.role
                      .filter((role) => role !== "user")
                      .map((role) => (
                        <li key={role}>
                          <Link
                            to={`/dashboard/${role}`} // example: /dashboard/wec-admin
                            className="block px-4 py-2 hover:bg-red-100 text-red-500 hover:cursor-pointer capitalize"
                            onClick={() => setOpen(false)}
                          >
                            {role.replace("-", " ")} Dashboard
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <Avatar
                  placeholderInitials={userBasicInfo?.username.slice(0, 3)}
                  rounded
                />
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {primaryNavItems.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    setActiveTab(item.title);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === item.title
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  {item.title}
                </button>
              ))}

              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 px-4 py-3 border-t border-gray-200 mt-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Avatar
                    placeholderInitials={userBasicInfo.username.slice(0, 3)}
                    rounded
                  />
                </div>
                <span className="text-gray-700 font-medium">
                  {userBasicInfo ? userBasicInfo.username : null}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Navigation */}
      {showSecondaryTab ? (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-12">
              {/* Secondary Nav Items */}
              <div className="flex items-center space-x-1 overflow-x-auto">
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => {
                      setActiveSecondaryTab(item.title);
                      navigate(`${item.link}`);
                    }}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:cursor-pointer ${
                      activeSecondaryTab === item.title
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}

                {/* My Devfolio Link */}
                <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200 whitespace-nowrap">
                  <span>MY Orbis</span>
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileNavbar;
