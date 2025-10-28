"use client";

import {
  BookOpenCheck,
  Bot,
  Briefcase,
  FileText,
  ImageIcon,
  LayoutDashboard,
  Settings,
  ShieldQuestion,
  UserSearch as UserRoundSearch,
  Users,
} from "lucide-react";
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
import { useGetAllClients } from "@/services/clients";
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  const { data } = useGetAllClients({ returnAll: true });

  // const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);
  const { selectedVersion, setSelectedVersion } = useClientStore();

  React.useEffect(() => {
    const findOpenKeys = (menuItems: typeof MenuItem.navMain): string[] => {
      const keys: string[] = [];

      const checkItem = (item: (typeof menuItems)[0]): boolean => {
        let isActive = false;

        if (pathname === item.url || pathname.startsWith(item.url + "/")) {
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
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="group-data-[collapsible=icon]:!p-0 items-center"
              asChild
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <p className="flex-1 text-right truncate font-medium">
                  داشبورد مدیریت
                </p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
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
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
