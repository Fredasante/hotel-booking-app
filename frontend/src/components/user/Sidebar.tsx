import { sections } from "../../config/user-options-config";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type SidebarProps = {
  setActiveSection: (section: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultSection =
    new URLSearchParams(location.search).get("tab") || "personal-details";

  const [activeSection, setActiveSectionState] =
    useState<string>(defaultSection);

  useEffect(() => {
    const currentTab = new URLSearchParams(location.search).get("tab");
    if (currentTab && currentTab !== activeSection) {
      setActiveSectionState(currentTab);
      setActiveSection(currentTab);
    }
  }, [location.search]);

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    setActiveSectionState(section);
    navigate(`?tab=${section}`);
  };

  return (
    <div className="hidden md:block md:w-[350px] h-fit mt-5 p-4">
      <ul className="space-y-2">
        <div className="">
          <ul className="space-y-2 border rounded-md">
            {sections.map(({ label, icon: Icon, section }) => (
              <li
                key={section}
                className={`flex items-center text-slate-700 border-b cursor-pointer py-4 px-4 rounded ${
                  activeSection === section ? "text-blue-700" : ""
                }`}
                onClick={() => handleSectionClick(section)}
              >
                <button className="bg-gray-100 p-3 rounded-full">
                  <Icon
                    className={`w-4 h-4 hover:text-blue-700 ${
                      activeSection === section ? "text-blue-700" : ""
                    }`}
                  />
                </button>

                <span
                  className={`ml-2 hover:underline hover:text-blue-700 ${
                    activeSection === section ? "text-blue-700" : ""
                  }`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
