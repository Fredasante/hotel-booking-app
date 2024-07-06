import { Link } from "react-router-dom";
import MainNav from "./MainNavigation";
import MobileNav from "./MobileNavigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <header className="bg-[#003B95] py-4 px-5 md:px-10 lg:px-14">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight">
            Bookings.com
          </Link>

          <div>
            <MainNav />
          </div>
          <div className="md:hidden ml-auto">
            <MobileNav />
          </div>
        </div>

        <div>
          <div className="text-white mt-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold">
              {currentUser
                ? `Where to next, ${currentUser.firstName}?`
                : "Find Your Next Stay"}
            </h1>
            <p className="mt-3 mb-10 text-sm md:text-base lg:text-xl 2xl:text-2xl">
              Search deals on hotels, homes, and much more...
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
