"use client";

import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import * as React from "react";

import { usePathname } from "next/navigation";
import { NavMain } from "./nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "@/components/ui/version-switcher";
import useAuth from "@/hooks/use-auth";
import { useGetAllClients } from "@/services/clients";
import { ExitIcon } from "@radix-ui/react-icons";
import { useClientStore } from "./store";

export const MenuItem = {
  versions: ["1 کلاینت", "کلاینت 2", "کلاینت 3"],

  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "خانه",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "کاربران",
      url: "/client",
      icon: Settings,
    },
    {
      title: "اتاق ها",
      url: "/room",
      icon: Settings,
    },
    {
      title: "آزمایشگاه",
      url: "/laboratory",
      icon: LayoutDashboard,
      // children: [{}],
    },
  ],
  exists: [
    {
      title: "خروج",
      url: "/login",
      icon: ExitIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const { data } = useGetAllClients({ returnAll: true });
  const { selectedVersion, setSelectedVersion } = useClientStore();
  const { handleLogout } = useAuth();

  React.useEffect(() => {
    const cleanPath = pathname.split("?")[0].replace(/\/$/, "");

    const findOpenKeys = (menuItems: typeof MenuItem.navMain): string[] => {
      const keys: string[] = [];

      const checkItem = (item: (typeof menuItems)[0]): boolean => {
        let isActive = false;

        if (cleanPath === item.url || cleanPath.startsWith(`${item.url}/`)) {
          isActive = true;
          if ((item as any).children) {
            keys.push(item.url);
          }
        }

        if ((item as any).children) {
          (item as any).children.forEach((child: any) => {
            if (checkItem(child)) {
              isActive = true;
              keys.push(item.url);
            }
          });
        }

        return isActive;
      };

      menuItems.forEach(checkItem);
      return Array.from(new Set(keys));
    };

    const newOpenKeys = findOpenKeys(MenuItem.navMain);
    setOpenKeys(newOpenKeys);
  }, [pathname]);

  const toggleOpenKey = (key: string) => {
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <Sidebar collapsible="icon" side="right" variant="inset" {...props}>
      <SidebarHeader className="">
        <VersionSwitcher
          versions={data?.data || []}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={MenuItem.navMain}
          openKeys={openKeys}
          onToggleOpenKey={toggleOpenKey}
          currentPath={pathname}
        />{" "}
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <div
          className="flex items-center justify-between w-full  py-3 text-sm cursor-pointer text-destructive
      hover:bg-accent hover:text-red-600 transition rounded-lg"
          onClick={handleLogout}
          dir="rtl"
        >
          <span>خروج</span>
          <LogOut className="h-4 w-4" />
        </div>
      </SidebarFooter>{" "}
    </Sidebar>
  );
}
