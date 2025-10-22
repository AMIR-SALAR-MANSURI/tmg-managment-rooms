"use client";

import * as React from "react";
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ClientsList } from "@/services/clients";

type data = {
  id: string;
  name: string;
};

export function VersionSwitcher({
  versions,
  selectedVersion,
  setSelectedVersion,
}: {
  versions: ClientsList[];
  selectedVersion: string | undefined;
  setSelectedVersion: (arg: string) => void;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex  justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                {/* <span className="font-medium">Documentation</span> */}
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="">
                    {selectedVersion ? (
                      versions.map((i) => i.id === selectedVersion && i.name)
                    ) : (
                      <p className="text-gray-400">کلاینت را انتخاب نمایید</p>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <ChevronsUpDown className="size-5" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {versions.map((version) => (
              <DropdownMenuItem
                dir="rtl"
                className="flex items-center justify-between"
                key={version.id}
                onSelect={() => setSelectedVersion(version.id)}
              >
                {version.name}
                {version.id === selectedVersion && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
