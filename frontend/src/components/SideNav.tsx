import { IconType } from "react-icons";
import { MdDashboard, MdStore } from "react-icons/md";
import { Link } from "react-router-dom";

const NavLinks: { icon: IconType; path: string; name: string }[] = [
  {
    icon: MdDashboard,
    path: "overview",
    name: "Overview",
  },
  {
    icon: MdStore,
    path: "grocery-item",
    name: "Grocery Item",
  },
];

type TProps = {
  tab: string;
};

const SideNav: React.FC<TProps> = ({ tab }) => {
  return (
    <div className="bg-primary/90 h-full py-10 text-white flex flex-col gap-4">
      {NavLinks.map((link, idx) => {
        const Icon = link.icon;

        return (
          <div
            key={idx}
            className={`px-8 py-3 ${
              tab === link.path ? "bg-slate-600" : "hover:bg-slate-700"
            } `}
          >
            <Link
              to={`?tab=${link.path}`}
              className="text-xl flex items-center gap-2"
            >
              <Icon size={30} /> {link.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SideNav;
