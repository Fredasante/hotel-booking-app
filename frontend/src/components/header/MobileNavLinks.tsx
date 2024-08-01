import { Link, useNavigate } from "react-router-dom";
import { useLogOutUser } from "../../api/UserApi";

const MobileNavLinks = () => {
  const { logoutUser } = useLogOutUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div>
      <Link to="/manage-account" className="block font-bold text-center w-full">
        Manage Account
      </Link>
      <Link to="/my-hotels" className="block font-bold text-center w-full mt-3">
        Manage Hotel
      </Link>
      <button
        onClick={handleLogout}
        className="mt-5 px-4 w-full self-center py-2.5 text-sm text-white rounded font-bold border-2 border-[#fea116dc] bg-[#FEA116] transition-all ease-in-out duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default MobileNavLinks;
