import { Link } from "react-router-dom";

const MobileNavLinks = () => {
  return (
    <div>
      <Link to="/user-profile" className="block font-bold text-center w-full">
        Profile
      </Link>
      <Link to="/" className="block font-bold text-center w-full mt-3">
        Manage Hotel
      </Link>
      <Link to="/" className="block font-bold text-center w-full mt-3">
        Order Status
      </Link>
      <button className="mt-5 px-4 w-full self-center py-2.5 text-sm text-white rounded font-bold border-2 border-[#fea116dc] bg-[#FEA116] transition-all ease-in-out duration-300">
        Log Out
      </button>
    </div>
  );
};

export default MobileNavLinks;
