"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Copy,
  Share,
  ThumbsUp,
  ThumbsDown,
  Send,
  Paperclip,
  Mic,
} from "lucide-react";
import type { Message } from "@ai-sdk/react";

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export function ChatInterface({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInterfaceProps) {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const masked = value.replace(/[^\u0600-\u06FFa-zA-Z0-9 \n]/g, "");

    handleInputChange({
      target: { value: masked },
    } as any);

    // form.setFieldsValue({ userInput: masked });
  };
  return (
    <div className="relative flex h-screen flex-col">
      {/* Scrollable Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-6">
          <div className="mx-auto max-w-4xl space-y-6 pb-32">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <Avatar className="size-11">
                      <AvatarFallback className="bg-blue-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1 max-w-[100%]" dir="rtl">
                    <div
                      className={`rounded-2xl border p-4 ${
                        isUser ? "bg-muted" : "bg-muted"
                      }`}
                    >
                      <p className="mb-4 text-sm text-gray-900">
                        {message.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <div className="ml-auto flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isUser && (
                    <Avatar className="size-11">
                      <AvatarFallback className="bg-gray-400 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="mx-auto max-w-3xl">
          <form onSubmit={handleSubmit} className="relative">
            <div className="bg-muted flex items-center gap-2 p-2 rounded-2xl border shadow-sm px-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <textarea
                value={input}
                onChange={handleTextareaChange}
                placeholder="Ask me anything..."
                className="w-full h-12 resize-none bg-transparent px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none leading-relaxed overflow-y-auto"
                disabled={isLoading}
                onInput={(e) => {
                  const target = e.currentTarget;

                  // Reset height to calculate scrollHeight correctly
                  target.style.height = "auto";

                  // Maximum height = 3 lines of text
                  const lineHeight = 16; // adjust based on your text size
                  const maxHeight =
                    3 * lineHeight +
                    parseInt(getComputedStyle(target).paddingTop) +
                    parseInt(getComputedStyle(target).paddingBottom);

                  // Set height: minimum of scrollHeight or maxHeight
                  target.style.height = `${Math.min(
                    target.scrollHeight,
                    maxHeight
                  )}px`;
                }}
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Mic className="h-4 w-4" />
              </Button>

              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// <div className="flex flex-col border-2 p-2 rounded-2xl gap-2">
//   <div className="w-full h-full flex-1 items-center ">
//     <textarea
//       autoFocus
//       // disabled={chat.isPending || isFetching}
//       // ref={inputRef}
//       // className="w-full border-0 focus:outline-none resize-none bg-transparent"
//       className="w-full resize-none bg-transparent px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none min-h-[44px] max-h-32 leading-relaxed overflow-y-auto"
//       placeholder="پیام خود را بنویسید..."
//       // maxLength={10000}
//       rows={1}
//       onChange={(e) => {
//         const value = e.target.value;
//         const masked = value.replace(/[^\u0600-\u06FFa-zA-Z0-9 \n]/g, "");
//         // form.setFieldsValue({ userInput: masked });
//       }}
//       style={{
//         height: "auto",
//         minHeight: "44px",
//         maxHeight: "calc(1.5em * 4 + 20px)",
//       }}
//       onInput={(e) => {
//         const target = e.target as HTMLTextAreaElement;
//         target.style.height = "auto";
//         target.style.height = `${Math.min(
//           target.scrollHeight,
//           4 * 24 + 20
//         )}px`;
//       }}
//     />
//   </div>
//   <div className="flex justify-end gap-2 items-center rounded-full">
//     <Button
//       className="min-h-10 min-w-10 rounded-full flex items-center"
//       variant={"primary"}
//       size={"icon"}
//       type="submit"
//       // htmlType="submit"
//       // shape="circle"
//       // icon={<SendOutlined className="rotate-180 [&>svg]:size-3" />}
//       // disabled={chat.isPending || isFetching}
//     >
//       <Send />
//     </Button>
//   </div>
// </div>;
