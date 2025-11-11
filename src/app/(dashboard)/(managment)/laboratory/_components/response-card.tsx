import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    return inline ? (
                      <code
                        className="bg-gray-900 text-white px-1 rounded"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre
                        className="bg-gray-900 text-white p-2 rounded overflow-auto"
                        dir="ltr"
                      >
                        <code className={`${className} text-white`} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },
                }}
              >
                {response ? response : ""}
              </ReactMarkdown>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
