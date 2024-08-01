import { sections } from "../../config/user-options-config";

type SidebarProps = {
  setActiveSection: (section: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  return (
    <div className="w-[350px] h-fit mt-6">
      <ul className="space-y-2 p-4">
        <div className="">
          <ul className="space-y-2 border rounded-md">
            {sections.map(({ label, icon: Icon, section }) => (
              <li
                key={section}
                className="flex items-center text-slate-700 border-b cursor-pointer pt-5 pb-5 px-4 rounded"
                onClick={() => setActiveSection(section)}
              >
                <Icon className="w-4 h-4" />
                <span className="ml-2">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
