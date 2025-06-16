import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <FaExclamationTriangle className="mx-auto text-red-500 text-6xl mb-4" />
          <div className="text-red-600 text-8xl font-bold mb-2">404</div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-red-600 text-lg mb-6">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <FaHome className="mr-2" />
            Go Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-red-600 font-semibold rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-red-100 rounded-lg border border-red-200">
          <p className="text-red-700 text-sm">
            If you believe this is an error, please{" "}
            <Link
              to="/contact"
              className="underline hover:text-red-800 font-medium"
            >
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
