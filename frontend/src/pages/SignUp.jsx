import { useState } from "react";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: "url('/signup.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/60 via-red-700/40 to-red-800/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-8 w-full">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">Orbis</div>
            <Link to={"/"}>
              <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:cursor-pointer">
                <span className="text-sm">Back to website</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Bottom Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              SignUp to get
              <br />a great start
            </h1>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-white text-2xl font-bold mb-4">Orbis</div>
            <Link to={"/"}>
              <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mx-auto">
                <span className="text-sm">Back to website</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Create an account
            </h2>
            <p className="text-gray-400">
              Already have an account?{" "}
              <a href="#" className="text-red-400 hover:text-red-300 underline">
                Log in
              </a>
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:cursor-pointer"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">
                Or register with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1  gap-4">
            <button className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 hover:cursor-pointer">
              <FcGoogle className="w-5 h-5" />
              <span>Google</span>
            </button>
          </div>

          {/* Mobile Hero Content */}
          <div className="lg:hidden text-center pt-8 border-t border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sign up to create great memories
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
