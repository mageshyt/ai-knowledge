import { SocketIndicatorBadge } from "@/components/global/socket-indicator-badge";
import MobileSidebar from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

const Navbar = () => {
  return (
    <div className="flex bg-background justify-between items-center p-4 border-b h-full ">
      <MobileSidebar />
      <div className="flex-grow"></div>
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
