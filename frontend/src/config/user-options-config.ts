import { FaCreditCard, FaRegBell, FaShieldAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";

export const sections = [
  {
    label: "Personal details",
    icon: FaRegCircleUser,
    section: "personal-details",
  },
  { label: "Preferences", icon: IoSettingsOutline, section: "preferences" },
  { label: "Security", icon: CiLock, section: "security" },
  { label: "Payment details", icon: FaCreditCard, section: "payment-details" },
  { label: "Privacy", icon: FaShieldAlt, section: "privacy" },
  {
    label: "Email notifications",
    icon: FaRegBell,
    section: "email-notifications",
  },
  { label: "Other travelers", icon: FiUsers, section: "other-travelers" },
];
