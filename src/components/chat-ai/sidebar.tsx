"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  HelpCircle,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface Chat {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
}

interface SidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}

export default function Sidebar({
  chats,
  selectedChatId,
  onNewChat,
  onSelectChat,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-muted flex h-screen flex-col border-l transition-all duration-300",
          isOpen ? "w-72 opacity-100" : "w-0 opacity-0 overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="font-semibold text-right text-base">logo</h2>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat list */}
        <div className="flex-1 min-h-0 flex flex-col">
          {/* <ScrollArea className="flex-1"> */}
          <div className="space-y-1 p-2 overflow-y-auto" dir="rtl">
            {filteredChats.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "h-auto w-full justify-start p-3 text-right hover:bg-gray-100",
                  selectedChatId === chat.id && "bg-gray-100"
                )}
              >
                <div className="flex w-full items-start gap-2">
                  <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {chat.title}
                    </div>
                    <div className="text-muted-foreground mt-0.5 truncate text-xs">
                      {chat.preview}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          {/* </ScrollArea> */}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <Button
            className="text-muted-foreground w-full justify-start gap-2"
            variant="ghost"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>

          <Button
            variant="ghost"
            className="text-muted-foreground w-full justify-start gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          {/* 
          <Button
            variant="ghost"
            className="text-muted-foreground w-full justify-start gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </Button> */}
        </div>
      </div>
    </>
  );
}
