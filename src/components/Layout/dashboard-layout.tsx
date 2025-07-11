import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "react-router";
import { SiteHeader } from "./sidebar-header";
import { UserEditModal } from "../popup";

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <Outlet />
      </SidebarInset>
      <UserEditModal />
    </SidebarProvider>
  );
};

export default DashboardLayout;
