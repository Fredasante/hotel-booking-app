import { Link } from "react-router-dom";
import MainNav from "./MainNavigation";
import MobileNav from "./MobileNavigation";
import logo from "../../assets/logo.svg";

const MainHeader = () => {
  return (
    <header className="bg-[#003B95] py-4 px-5 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="" width={180} />
          </Link>

          <div>
            <MainNav />
          </div>
          <div className="md:hidden ml-auto">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
