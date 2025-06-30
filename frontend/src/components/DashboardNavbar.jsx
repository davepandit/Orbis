import { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes, FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");

  const navigate = useNavigate();
  const { userBasicInfo } = useSelector((state) => state.auth);

  const primaryNavItems = [
    { title: "Profile", link: "/profile" },
    { title: "Events", link: "/my-registered-events" },
    { title: "Projects", link: "/my-projects" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (location.pathname.includes("/profile")) {
      setActiveTab("Profile");
    } else if (location.pathname === "/my-registered-events") {
      setActiveTab("Events");
    } else if (location.pathname === "/my-projects") {
      setActiveTab("Projects");
    }
  }, [location]);

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
          {userBasicInfo && userBasicInfo.role.includes("admin") ? (
            <div
              className="hidden md:flex items-center space-x-3 hover:cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              <span className="text-gray-700 font-medium">
                {userBasicInfo ? userBasicInfo.username : null}
              </span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-600 text-sm" />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-gray-700 font-medium">
                {userBasicInfo ? userBasicInfo.username : null}
              </span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-600 text-sm" />
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
                  <FaUser className="text-gray-600 text-sm" />
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
    </div>
  );
};

export default DashboardNavbar;
