import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutUser } from "../api/UserApi";

const UsernameMenu = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { logoutUser } = useLogOutUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <img
          src={currentUser?.profilePicture}
          alt=""
          className="w-9 h-9 rounded-full object-cover cursor-pointer border-2 border-[#FFB700]"
        />

        <div className="flex flex-col items-start">
          <span className="text-white font-bold text-sm ml-2 cursor-pointer">
            {currentUser?.displayName || currentUser?.firstName}
          </span>
          <span className="text-[#FFB700] font-semibold text-xs ml-2 cursor-pointer">
            Genuis Level 1
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/user-profile">
          <DropdownMenuItem>Profile </DropdownMenuItem>
        </Link>
        <Link to="/create-hotel">
          <DropdownMenuItem>Create Hotel</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <button
            onClick={handleLogout}
            className="text-white mt-2 bg-[#0F172B] py-2 px-4 text-sm rounded-md font-semibold transition-all hover:bg-[#2c2f3a]"
          >
            Log Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
