import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
