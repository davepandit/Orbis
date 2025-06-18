import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
