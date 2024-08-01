import { useState } from "react";
import PersonalDetails from "../components/user/PersonalDetails";
import Preferences from "../components/user/Preferences";
import PaymentDetails from "../components/user/PaymentDetails";
import Privacy from "../components/user/Privacy";
import EmailNotifications from "../components/user/EmailNotifications";
import Security from "../components/user/Security";
import Sidebar from "../components/user/Sidebar";

const ManageAccount = () => {
  const [activeSection, setActiveSection] = useState("personal-details");

  const renderSection = () => {
    switch (activeSection) {
      case "personal-details":
        return <PersonalDetails />;
      case "preferences":
        return <Preferences />;
      case "security":
        return <Security />;
      case "payment-details":
        return <PaymentDetails />;
      case "privacy":
        return <Privacy />;
      case "email-notifications":
        return <EmailNotifications />;

      default:
        return <PersonalDetails />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-1 p-8">{renderSection()}</div>
    </div>
  );
};

export default ManageAccount;
