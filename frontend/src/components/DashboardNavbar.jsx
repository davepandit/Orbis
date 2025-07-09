import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaChartBar,
  FaEnvelope,
  FaBars,
  FaUsersCog,
  FaTimes,
  FaUsers
} from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdManageAccounts,
  MdEventNote,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

// here also we need to get the /:admin part because based on that we need to redirect the user
import { useParams } from "react-router-dom";

export default function ResponsiveSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Manage members");
  const { admin } = useParams();
  const { userBasicInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/manage-users")) {
      setSelectedTab("Manage members");
    } else if (location.pathname.includes("/manage-admins")) {
      setSelectedTab("Manage admins");
    } else if (location.pathname.includes("/approve-requests")) {
      setSelectedTab("Approve requests");
    } else if (location.pathname.includes("/manage-event")) {
      setSelectedTab("Manage events");
    }
  }, [location]);

  const menuItems = [
    {
      icon: FaUsersCog,
      label: "Manage members",
      path: `/dashboard/${admin}/manage-users`,
    },

    {
      icon: FaUsers,
      label: "Approve requests",
      path: `/dashboard/${admin}/approve-requests`,
    },
    {
      icon: MdEventNote,
      label: "Manage events",
      path: `/dashboard/${admin}/manage-events`,
    },
    { icon: FaChartBar, label: "Analytics", path: "/analytics" },
    { icon: FaEnvelope, label: "Messages", path: "/messages" },
    { icon: FaCog, label: "Settings", path: "/settings" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 text-black bg-gray-200
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo/Brand */}
        <div className="flex items-center justify-center h-16">
          <Link to="/">
            <h1 className="text-xl font-bold">Orbis</h1>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200  ${
                      selectedTab == item.label
                        ? "bg-gray-500 text-white"
                        : "hover:bg-gray-500 hover:text-white"
                    }`}
                    onClick={() => setSelectedTab(item.label)} // Close sidebar on mobile after click
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg">
            <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
              <Avatar
                placeholderInitials={userBasicInfo.username.slice(0, 3)}
                rounded
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{userBasicInfo?.username}</p>
              <p className="text-xs text-gray-800">{userBasicInfo?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:ml-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="ml-12 lg:ml-0">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome Back!
              </h2>
              <p className="text-gray-600">Here's what's happening today</p>
            </div>
          </div>
        </header>

        {/* Main content with Router Outlet */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* React Router Outlet - This is where your routed components will render */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
