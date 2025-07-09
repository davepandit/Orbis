import { useState, useEffect, useRef } from "react";
import { FaUser, FaBars, FaTimes, FaArrowRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";

const EditEventNavbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [showSecondaryTab, setShowSecondaryTab] = useState(true);
  const [activeSecondaryTab, setActiveSecondaryTab] =
    useState("Basic event info");
  const navigate = useNavigate();
  const { userBasicInfo } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false); // this one is for modal opening
  const { admin, eventId } = useParams();

  const primaryNavItems = [
    { title: "Profile", link: "/profile" },
    { title: "Events", link: "/my-registered-events" },
    { title: "Projects", link: "/my-projects" },
  ];
  const secondaryNavItems = [
    {
      title: "Basic event info",
      link: `/${admin}/edit-basic-event-info/${eventId}`,
    },
    {
      title: "Event timeline",
      link: `/${admin}/edit-event-timeline/${eventId}`,
    },
    {
      title: "Event detailed schedule",
      link: `/${admin}/edit-event-detailed-schedule/${eventId}`,
    },
    { title: "Event people", link: `/${admin}/edit-event-people/${eventId}` },
    {
      title: "Event sponsors",
      link: `/${admin}/edit-event-sponsors/${eventId}`,
    },
    { title: "Event prizes", link: `/${admin}/edit-event-prizes/${eventId}` },
    { title: "Event faqs", link: `/${admin}/edit-event-faqs/${eventId}` },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (location.pathname.includes("/edit-basic-event-info")) {
      setActiveSecondaryTab("Basic event info");
    } else if (location.pathname.includes("/edit-event-timeline")) {
      setActiveSecondaryTab("Event timeline");
    } else if (location.pathname.includes("/edit-event-detailed-schedule")) {
      setActiveSecondaryTab("Event detailed schedule");
    } else if (location.pathname.includes("/edit-event-people")) {
      setActiveSecondaryTab("Event people");
    } else if (location.pathname.includes("/edit-event-sponsors")) {
      setActiveSecondaryTab("Event sponsors");
    } else if (location.pathname.includes("/edit-event-prizes")) {
      setActiveSecondaryTab("Event prizes");
    } else if (location.pathname.includes("/edit-event-faqs")) {
      setActiveSecondaryTab("Event faqs");
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
      <Link to="/">
        <div className="text-center font-bold text-2xl text-red-500 mt-2 mb-2">
          Orbis
        </div>
      </Link>

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
                <Link to={`dashboard/${admin}/manage-users`}>
                  <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-600 hover:cursor-pointer transition-colors duration-200 whitespace-nowrap">
                    <span>MY Dashboard</span>
                    <FaArrowRight className="text-xs" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EditEventNavbar;
