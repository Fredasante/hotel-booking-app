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
import { FaAngleDown } from "react-icons/fa";
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
      <DropdownMenuTrigger>
        <div className="flex items-center bg-gray-50 font-semibold text-[#003B95] px-2.5 py-1.5 border-[#003B95] rounded-sm transition duration-500 ease-in-out hover:bg-gray-200">
          <span className="mr-1">Welcome, {currentUser?.firstName}</span>
          <FaAngleDown fill="#003B95" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/user-profile">
          <DropdownMenuItem>Profile </DropdownMenuItem>
        </Link>
        <Link to="/manage-hotel">
          <DropdownMenuItem>Manage Hotel</DropdownMenuItem>
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
