import { Routes, Route } from "react-router-dom";

// pages import
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/DashboardLayout";
import Profile from "./pages/Profile";
import Education from "./pages/Education";
import MyEvents from "./pages/MyEvents";
import Login from "./pages/Login";
import GoogleRedirect from "./pages/GoogleRedirect";

// toast import
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard  */}
        <Route element={<DashboardLayout />}>
          {/* Profile  */}
          <Route path="/google-redirect" element={<GoogleRedirect />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/education" element={<Education />} />

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
