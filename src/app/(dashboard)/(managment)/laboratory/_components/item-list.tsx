"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllLab } from "@/services/laboratory";
import { LabList } from "@/services/laboratory/laboratory.interface";
import { List, Star } from "lucide-react";
import { useState } from "react";
import { useLabStore } from "../store";

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
  const [isActive, setIsActive] = useState(false);
  const { setLabId } = useLabStore();

  const { data, isLoading } = useGetAllLab({ returnAll: true });

  const getStatusColor = (status?: string) => {
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

  const getStatusLabel = (status?: string) => {
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto">
        {data?.data.length === 0 ? (
          <p className="text-center text-muted-foreground py-8" dir="rtl">
            هیچ آیتمی وجود ندارد
          </p>
        ) : (
          <div className="space-y-3 h-[550px] ">
            {data?.data.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-2 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => setLabId(item.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-medium w-40 truncate" dir="rtl">
                      {/* {item.question.split(" ").length > 6
                        ? item.question.split(" ").slice(0, 6).join(" ") + "..."
                        : item.question} */}
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
                  <div className="flex items-center gap-0.5">
                    {item.llmModel && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(
                          item.llmModel.name
                        )}`}
                      >
                        {getStatusLabel(item.llmModel.name)}
                      </span>
                    )}
                    <button
                      onClick={() => setIsActive(!isActive)}
                      className="p-2 rounded-full transition-colors"
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
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
