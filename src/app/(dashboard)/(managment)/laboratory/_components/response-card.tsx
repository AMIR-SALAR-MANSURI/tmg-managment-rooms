import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  response?: any;
}

export default function ResponseCard({ response }: Props) {
  return (
    <Card className="max-w-full overflow-hidden">
      <CardHeader>
        <CardTitle>پاسخ‌</CardTitle>
      </CardHeader>
      <CardContent>
        {!response || response.length === 0 ? (
          <p className="text-center text-muted-foreground py-8" dir="rtl">
            هنوز پاسخی ثبت نشده است
          </p>
        ) : (
          <div className="space-y-4 w-full">
            <p
              className="text-sm text-gray-900 break-words whitespace-pre-wrap overflow-hidden text-ellipsis"
              style={{
                overflowWrap: "break-word",
                wordBreak: "break-word",
                maxWidth: "100%",
              }}
              dir="rtl"
            >
              {response}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
