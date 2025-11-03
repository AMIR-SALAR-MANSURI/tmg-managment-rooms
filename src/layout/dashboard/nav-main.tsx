"use client";

import { ChevronLeft, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavMainProps {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    children?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
  openKeys: string[];
  onToggleOpenKey: (key: string) => void;
  currentPath: string;
}

export function NavMain({
  items,
  openKeys,
  onToggleOpenKey,
  currentPath,
}: NavMainProps) {
  const { isMobile, open } = useSidebar();
  const cleanPath = currentPath.split("?")[0].replace(/\/$/, "");

  const isItemActive = (url: string, children?: any[]): boolean => {
    // Active if exact match or child path
    if (cleanPath === url || cleanPath.startsWith(`${url}/`)) {
      return true;
    }

    if (children) {
      return children.some(
        (child) =>
          cleanPath === child.url || cleanPath.startsWith(`${child.url}/`)
      );
    }

    return false;
  };

  const isParentItemActive = (children?: any[]): boolean => {
    if (children) {
      return children.some(
        (child) =>
          cleanPath === child.url || cleanPath.startsWith(`${child.url}/`)
      );
    }
    return false;
  };

  const isItemOpen = (url: string) => openKeys.includes(url);

  const handleItemClick = (
    url: string,
    hasChildren: boolean,
    e: React.MouseEvent
  ) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      onToggleOpenKey(url);
    }
  };

  if (!open) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    isActive={isItemActive(item.url, item.children)}
                  >
                    <Link href={item.children ? "#" : item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                {item.children?.length ? (
                  <DropdownMenuContent
                    className="w-48"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 w-full p-2"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {item.children.map((sub) => (
                      <DropdownMenuItem
                        key={sub.url}
                        asChild
                        className={cn(
                          currentPath === sub.url
                            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                            : ""
                        )}
                      >
                        <Link
                          href={sub.url}
                          className="flex items-center gap-2 w-full p-2"
                        >
                          {sub.icon && <sub.icon className="h-4 w-4" />}
                          <span>{sub.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                ) : null}
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  } else
    return (
      <SidebarGroup>
        <SidebarGroupLabel>پنل مدیریت</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.children ? (
                <Collapsible
                  open={isItemOpen(item.url)}
                  onOpenChange={() => onToggleOpenKey(item.url)}
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={isParentItemActive(item.children)}
                      className="flex justify-between items-center w-full"
                      onClick={(e) => handleItemClick(item.url, true, e)}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </span>
                      <ChevronLeft
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isItemOpen(item.url) ? "rotate-90" : "-rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="rounded-b-md bg-sidebar-foreground/5 py-3 gap-2">
                      {item.children.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.url}>
                          <SidebarMenuSubButton
                            asChild
                            className="h-8"
                            isActive={currentPath === subItem.url}
                          >
                            <Link href={subItem.url}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  isActive={
                    cleanPath === item.url ||
                    cleanPath.startsWith(`${item.url}/`)
                  }
                  onClick={(e) => handleItemClick(item.url, false, e)}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
}
