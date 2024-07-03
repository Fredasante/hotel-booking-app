import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#003B95] py-4 px-5 md:px-10 lg:px-14">
      <div className="flex justify-between">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
          Bookly.com
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-white font-semibold cursor-pointer hidden md:block">
            List Your Property
          </span>
          <Link
            to="/login"
            className="bg-gray-50 font-semibold text-[#003B95] px-2.5 py-1.5 border-[#003B95] rounded-sm ml-4 transition duration-500 ease-in-out hover:bg-gray-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
