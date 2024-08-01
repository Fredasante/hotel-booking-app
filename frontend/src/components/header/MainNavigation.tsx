import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";
import { RootState } from "../../redux/store";

const MainNav = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <>
      {currentUser ? (
        <div className="ml-auto hidden md:flex items-center">
          <Link to="/my-hotels" className="font-bold text-md mr-7">
            <span className="text-white font-semibold cursor-pointer hidden md:block">
              Manage Hotels
            </span>
          </Link>
          <UsernameMenu />
        </div>
      ) : (
        <div className="hidden md:flex ml-auto">
          <Link
            to="/login"
            className="bg-gray-50 font-semibold text-[#003B95] px-2.5 py-1.5 border-[#003B95] rounded-sm ml-4 transition duration-500 ease-in-out hover:bg-gray-200"
          >
            Sign in
          </Link>
        </div>
      )}
    </>
  );
};

export default MainNav;
