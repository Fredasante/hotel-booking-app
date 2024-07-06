import { Link } from "react-router-dom";
import MainNav from "./MainNavigation";
import MobileNav from "./MobileNavigation";

const Header = () => {
  return (
    <header className="bg-[#003B95] py-4 px-5 md:px-10 lg:px-14">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
          Bookly.com
        </Link>

        <div>
          <MainNav />
        </div>
        <div className="md:hidden ml-auto">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
