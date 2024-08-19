import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-slate-700 py-10 px-5 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Bookings</h2>
            <p className="mt-2">
              Your perfect home base for every special trip
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              className="hover:text-gray-500 transition"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="hover:text-gray-500 transition"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="hover:text-gray-500 transition"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-400 pt-6">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <p className="text-sm">&copy; 2024 Bookly. All Rights Reserved.</p>
            <div className="mt-4 md:mt-0 text-sm">
              <Link to="/" className="hover:text-gray-500 transition mx-2">
                Terms of Service
              </Link>
              <Link to="/" className="hover:text-gray-500  transition mx-2">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
