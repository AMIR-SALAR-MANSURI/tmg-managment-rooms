"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteLab, useGetAllLab, useMarkLab } from "@/services/laboratory";
import { LabList } from "@/services/laboratory/laboratory.interface";
import { Ellipsis, List, Star, Trash } from "lucide-react";
import { useState } from "react";
import { useLabStore } from "../store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import DeleteDialog from "./dialog-delete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AssignDialog from "./dialog-assign";
import { Skeleton } from "@/components/ui/skeleton";

interface ListItem {
  id: string;
  title: string;
  description?: string;
  status?: "active" | "pending" | "completed";
}

interface ItemListProps {
  title?: string;
  items?: LabList[];
}

export function ItemList({
  title = "لیست آیتم‌ها",
  items = [],
}: ItemListProps) {
  const { setLabId, setLabDeleteId } = useLabStore();

  const { data, isLoading } = useGetAllLab({ returnAll: true });

  const { mutateAsync } = useMarkLab();

  const onSubmit = async (id: string) => {
    await mutateAsync(id);
  };

  const getLLmColor = (status?: string) => {
    switch (status) {
      case "Qwen-8":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "completed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLLmLabel = (status?: string) => {
    switch (status) {
      case "Qwen-8":
        return "Qwen-8";
      case "pending":
        return "در انتظار";
      case "completed":
        return "تکمیل شده";
      default:
        return "";
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3 h-[550px]">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="border border-border rounded-lg p-2 animate-pulse"
              >
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          <p className="text-center text-muted-foreground py-8" dir="rtl">
            هیچ آیتمی وجود ندارد
          </p>
        ) : (
          <div className="space-y-3 h-[550px] ">
            {data?.data.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-2 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1" onClick={() => setLabId(item.id)}>
                    <h4 className="font-medium w-40 truncate" dir="rtl">
                      {item.question}
                    </h4>
                    {item.response && (
                      <p
                        className="text-sm text-muted-foreground line-clamp-1"
                        dir="rtl"
                      >
                        {item.response}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {item.llmModel && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getLLmColor(
                            item.llmModel.name
                          )}`}
                        >
                          {getLLmLabel(item.llmModel.name)}
                        </span>
                      )}
                      <button
                        onClick={() => onSubmit(item.id)}
                        className=" rounded-full transition-colors"
                      >
                        <Star
                          className={`w-4 h-4 transition-colors cursor-pointer ${
                            item.isMarked
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className="cursor-pointer"
                          onClick={() => setLabDeleteId(item.id)}
                        >
                          <Ellipsis />
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="bottom" className="w-32">
                        <DropdownMenuItem className="cursor-pointer" dir="rtl">
                          <div
                            dir="rtl"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLabDeleteId(item.id);
                            }}
                            className="w-full"
                          >
                            <AssignDialog />
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" dir="rtl">
                          <div
                            dir="rtl"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLabDeleteId(item.id);
                            }}
                            className="w-full"
                          >
                            <DeleteDialog />
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
