import {
  FaBell,
  FaCog,
  FaCreditCard,
  FaLock,
  FaShieldAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export const sections = [
  { label: "Personal details", icon: FaUser, section: "personal-details" },
  { label: "Preferences", icon: FaCog, section: "preferences" },
  { label: "Security", icon: FaLock, section: "security" },
  { label: "Payment details", icon: FaCreditCard, section: "payment-details" },
  { label: "Privacy", icon: FaShieldAlt, section: "privacy" },
  {
    label: "Email notifications",
    icon: FaBell,
    section: "email-notifications",
  },
  { label: "Other travelers", icon: FaUsers, section: "other-travelers" },
];
