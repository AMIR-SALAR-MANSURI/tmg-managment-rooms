import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUid } from "@/hooks/use-get-uid";
import { useGetRoomRagStatus } from "@/services";
import React, { useState } from "react";

interface Props {
  uid: string;
}

export default function RagStatusDialog({ uid }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetRoomRagStatus(isOpen ? uid : "");

  const getProgressColor = (percentage?: number) => {
    if (!percentage) return "secondary";
    if (percentage < 33) return "destructive";
    if (percentage < 66) return "warning";
    return "default";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>وضعیت تزریق دانش</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>وضعیت تزریق دانش</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {isLoading ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  اسم اتاق
                </span>
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  درصد پیشرفت
                </span>
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  وضعیت
                </span>
                <Skeleton className="h-6 w-24" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  اسم اتاق
                </span>
                <span className="text-sm font-semibold">
                  {data?.roomName || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  درصد پیشرفت
                </span>
                <Badge variant={"blue"}>
                  {data?.ragProgressPercentage || 0}%
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  وضعیت
                </span>
                <Badge variant="sky">{data?.roomStatus || "-"}</Badge>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
