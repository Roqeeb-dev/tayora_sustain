import { NavItem } from "./DashboardShell";

interface SidebarProps {
  navItems: NavItem[];
  variant: "user" | "admin";
}

export default function Sidebar({ navItems, variant }: SidebarProps) {
  return (
    <aside className="w-64">
      <h1>Hello world</h1>
    </aside>
  );
}
