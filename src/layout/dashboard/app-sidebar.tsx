"use client";

import {
  BookOpenCheck,
  Bot,
  Briefcase,
  ClipboardList,
  Command,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LinkIcon,
  MessageSquareText,
  Phone,
  Presentation,
  Settings,
  ShieldQuestion,
  UserSearch as UserRoundSearch,
  Users,
} from "lucide-react";
import * as React from "react";

import { usePathname } from "next/navigation";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { NavMain } from "./nav-main";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "@/components/ui/version-switcher";

export const MenuItem = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],

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
      url: "/dashboard/client",
      icon: Settings,
    },
    // {
    //   title: "دسته بندی",
    //   url: "/dashboard/category",
    //   icon: ClipboardList,
    // },
    // {
    //   icon: Presentation,
    //   title: "وبینارها / سمینارها",
    //   url: "/dashboard/webinar",
    // },
    // {
    //   title: "راه های ارتباطی",
    //   url: "/dashboard/contact",
    //   icon: LinkIcon,
    //   children: [
    //     {
    //       icon: Phone,
    //       title: "اطلاعات تماس",
    //       url: "/dashboard/contact/info",
    //     },
    //     {
    //       icon: UserRoundSearch,
    //       title: "شبکه های اجتماعی",
    //       url: "/dashboard/contact/social",
    //     },
    //     {
    //       icon: MessageSquareText,
    //       title: "درخواست ها",
    //       url: "/dashboard/contact/request",
    //     },
    //   ],
    // },
    // {
    //   icon: GraduationCap,
    //   title: "پرتال دانشجویی",
    //   url: "/dashboard/portal",
    //   children: [
    //     {
    //       icon: FileText,
    //       title: "مقالات",
    //       url: "/dashboard/portal/article",
    //     },
    //   ],
    // },
    {
      title: "اطلاعات من",
      url: "/dashboard/my-information",
      icon: Bot,
      children: [
        {
          icon: Settings,
          title: "درباره من",
          url: "/dashboard/my-information/about",
        },
        {
          icon: ImageIcon,
          title: "گالری تصاویر",
          url: "/dashboard/my-information/gallery",
        },
        {
          icon: Briefcase,
          title: "سوابق علمی / شغلی",
          url: "/dashboard/my-information/career",
        },
        {
          icon: BookOpenCheck,
          title: "افتخارات / گواهینامه ها",
          url: "/dashboard/my-information/certificates",
        },
        {
          icon: FileText,
          title: "مقالات",
          url: "/dashboard/my-information/blog",
        },
        {
          icon: FileText,
          title: "جزوات",
          url: "/dashboard/my-information/article",
        },
      ],
    },
    {
      title: "مدیریت کاربران",
      url: "/dashboard/user-management",
      icon: Users,
      children: [
        {
          icon: UserRoundSearch,
          title: "لیست کاربران",
          url: "/dashboard/user-management/users",
        },
        {
          icon: UserRoundSearch,
          title: "کاربران مسدود شده",
          url: "/dashboard/user-management/ban",
        },
        {
          icon: Users,
          title: "نقش‌های کاربری",
          url: "/dashboard/user-management/roles",
        },
        {
          icon: ShieldQuestion,
          title: "سطح‌های دسترسی",
          url: "/dashboard/user-management/permissions",
        },
      ],
    },
    {
      title: "سوالات متداول",
      url: "/dashboard/FAQs",
      icon: ShieldQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    const findOpenKeys = (menuItems: typeof MenuItem.navMain): string[] => {
      const keys: string[] = [];

      const checkItem = (item: (typeof menuItems)[0]): boolean => {
        let isActive = false;

        if (pathname === item.url || pathname.startsWith(item.url + "/")) {
          isActive = true;
          if (item.children) {
            keys.push(item.url);
          }
        }

        if (item.children) {
          item.children.forEach((child) => {
            if (checkItem(child as any)) {
              isActive = true;
              if (item.children) {
                keys.push(item.url);
              }
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
          versions={MenuItem.versions}
          defaultVersion={MenuItem.versions[0]}
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
