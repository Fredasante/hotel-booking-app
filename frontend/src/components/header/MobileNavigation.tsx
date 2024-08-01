import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAlignJustify } from "react-icons/fa";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <Sheet>
      <SheetTrigger>
        <FaAlignJustify fill="#fff" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {currentUser
              ? "Welcome " + currentUser?.firstName
              : "Welcome to Travela"}
          </SheetTitle>
          <Separator />
          <div className="flex flex-col gap-4 !mt-5">
            {currentUser ? (
              <MobileNavLinks />
            ) : (
              <div>
                <Link
                  to="/login"
                  className="mt-5 px-4 w-full self-center py-2.5 text-sm text-white rounded font-bold border-2 border-[#fea116dc] bg-[#FEA116] transition-all ease-in-out duration-300"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
