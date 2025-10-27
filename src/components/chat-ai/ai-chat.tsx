"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import WelcomeScreen from "./welcome-screen";
import { ChatInterface } from "./chat-interface";
import Sidebar from "./sidebar";

export default function AiChat() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState([
    {
      id: "1",
      title: "آیا می‌توانی پرواز کنی؟",
      preview: "خودم نه! من فقط در...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      title: "آیا احساسات داری؟",
      preview: "من نمی‌توانم احساسات را...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "3",
      title: "آیا ربات‌ها جهان را تصاحب خواهند کرد؟",
      preview: "داستان‌های علمی-تخیلی سرگرم‌کننده‌اند، اما...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "4",
      title: "معنای زندگی چیست؟",
      preview: "این یک سؤال بزرگ فلسفی است...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "5",
      title: "می‌توانی یک آهنگ بنویسی؟",
      preview: "قطعاً می‌توانم بهت کمک کنم...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "6",
      title: "بهترین راه برای...",
      preview: "متأسفانه راهی وجود ندارد...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "7",
      title: "رنگ مورد علاقه‌ات چیست؟",
      preview: "به عنوان یک مدل زبانی، من...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "8",
      title: "می‌توانی آینده را پیش‌بینی کنی؟",
      preview: "من نمی‌توانم آینده را ببینم، اما...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "9",
      title: "بهترین پیتزا چیست؟",
      preview: "این کاملاً به سلیقه تو بستگی دارد...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "10",
      title: "آیا خودآگاه هستی؟",
      preview: "خودآگاهی موضوع پیچیده‌ای است...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "11",
      title: "می‌توانی این مسئله را حل کنی؟",
      preview: "فقط بنویس...",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
  ]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages:
        selectedChatId === "2"
          ? [
              {
                id: "1",
                role: "user",
                content: "آیا احساسات داری؟",
              },
              {
                id: "2",
                role: "assistant",
                content:
                  "من خودم احساسات ندارم، اما می‌تونم احساسات تو رو درک کنم و بهشون پاسخ بدم! بگو امروز چه احساسی داری.",
              },
            ]
          : [],
    });

  const handleNewChat = () => {
    setSelectedChatId(null);
    // Reset chat messages would happen here in a real app
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // In a real app, this would start a new chat with the suggestion
    setSelectedChatId("new");
  };

  return (
    <div className="flex h-screen" dir="rtl">
      <Sidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      <div className="flex flex-1 flex-col">
        {/* {!selectedChatId ? (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        ) : ( */}
        <ChatInterface
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        {/* )} */}
      </div>
    </div>
  );
}
