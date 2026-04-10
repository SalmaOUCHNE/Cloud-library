import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  ArrowLeftRight,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/store";

const sidebarLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/livres", icon: BookOpen, label: "Livres" },
  { to: "/dashboard/categories", icon: FolderOpen, label: "Catégories" },
  { to: "/dashboard/emprunts", icon: ArrowLeftRight, label: "Emprunts" },
  { to: "/dashboard/utilisateurs", icon: Users, label: "Utilisateurs", adminOnly: true },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-[calc(100vh-64px)] sticky top-16 bg-sidebar border-r border-sidebar-border flex flex-col py-4 overflow-hidden"
    >
      <nav className="flex-1 px-3 space-y-1">
        {sidebarLinks.map((link) => {
          if (link.adminOnly && user?.role === "MEMBRE") return null;
          const active = location.pathname === link.to;
          return (
            <Link key={link.to} to={link.to}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{link.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 mt-auto">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
