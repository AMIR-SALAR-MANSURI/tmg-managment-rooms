"use client";

import * as React from "react";
import { Check, ChevronsUpDown, GalleryVerticalEnd, XIcon } from "lucide-react";
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
      <SidebarMenuItem className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex justify-between items-center flex-1"
            >
              <div className="flex items-center gap-2">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span>
                    {selectedVersion ? (
                      versions.find((v) => v.id === selectedVersion)?.name
                    ) : (
                      <p className="text-gray-400">کلاینت را انتخاب نمایید</p>
                    )}
                  </span>
                </div>
              </div>
              <ChevronsUpDown className="size-5" />
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

        {selectedVersion && (
          <button
            type="button"
            onClick={() => setSelectedVersion("")}
            className="ml-2 hover:text-destructive cursor-pointer"
          >
            <XIcon className="size-5" />
          </button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
