import { Routes, Route } from "react-router-dom";

// pages import
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ProfileLayout from "./pages/ProfileLayout";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import MyEvents from "./pages/MyEvents";
import Login from "./pages/Login";
import GoogleRedirect from "./pages/GoogleRedirect";
import PrivatePage from "./pages/PrivatePage";
import Experience from "./pages/Experience";
import Links from "./pages/Links";
import LoginRedirect from "./pages/LoginRedirect";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ApproveRequests from "./pages/ApproveRequests";
import ManageAdmins from "./pages/ManageAdmins";
import CreateEvent from "./pages/ManageEvents";
import Testing from "./pages/Testing";

// toast import
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-redirect" element={<LoginRedirect />} />
        <Route path="/testing" element={<Testing />} />

        {/* DashBoard  */}
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard/:admin/manage-users"
            element={<Dashboard />}
          />
          <Route
            path="/dashboard/:admin/manage-admins"
            element={<ManageAdmins />}
          />
          <Route
            path="/dashboard/:admin/approve-requests"
            element={<ApproveRequests />}
          />
          <Route
            path="/dashboard/:admin/manage-events"
            element={<CreateEvent />}
          />
        </Route>

        {/* Profile  */}
        <Route element={<ProfileLayout />}>
          <Route path="/google-redirect" element={<GoogleRedirect />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/education" element={<Education />} />
          <Route path="/profile/experience" element={<Experience />} />
          <Route path="/profile/links" element={<Links />} />

          {/* Events  */}
          <Route path="/my-registered-events" element={<MyEvents />} />
        </Route>

        {/* Not found  */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
