"use client";

import type React from "react";

import PageWrapper from "@/layout/dashboard/page-wrapper";
import { LayoutDashboard, Send } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ItemList } from "./_components/item-list";
import ResponseCard from "./_components/response-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import FormLab from "./_components/form-lab";

interface HistoryItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const sampleItems = [
    {
      id: "1",
      title: "پروژه اول",
      description: "توضیحات پروژه اول",
      status: "active" as const,
    },
    {
      id: "2",
      title: "پروژه دوم",
      description: "توضیحات پروژه دوم",
      status: "pending" as const,
    },
    {
      id: "3",
      title: "پروژه سوم",
      description: "توضیحات پروژه سوم",
      status: "completed" as const,
    },
    {
      id: "4",
      title: "پروژه چهارم",
      description: "توضیحات پروژه چهارم",
      status: "active" as const,
    },
    {
      id: "4",
      title: "پروژه چهارم",
      description: "توضیحات پروژه چهارم",
      status: "active" as const,
    },
    {
      id: "4",
      title: "پروژه چهارم",
      description: "توضیحات پروژه چهارم",
      status: "active" as const,
    },
    {
      id: "4",
      title: "پروژه چهارم",
      description: "توضیحات پروژه چهارم",
      status: "active" as const,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) return;

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      title: title.trim(),
      message: message.trim(),
      timestamp: new Date(),
    };

    setHistory([newItem, ...history]);
    setTitle("");
    setMessage("");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const form = useForm<any>({
    // disabled: isPending,
    reValidateMode: "onBlur",
    // resolver: zodResolver(schema),
    defaultValues: {
      clientId: undefined,
      contentPrompt: undefined,
      description: undefined,
      ImageFile: undefined,
      llmModelId: undefined,
      name: undefined,
      systemPrompt: undefined,
    },
  });

  return (
    <PageWrapper
      breadcrumbItems={[
        { href: "/dashboard", label: "آزمایشگاه", icon: LayoutDashboard },
      ]}
      title="آزمایشگاه"
      className="*:w-full *:min-h-full"
    >
      <div className="flex gap-6 h-full">
        <aside className="w-80 flex-shrink-0 space-y-6">
          <ItemList title="تاریخچه" items={sampleItems} />
        </aside>
        {/* Sidebar - Fixed width with form */}
        <main className="flex-1 min-w-0 space-y-6 h-[650px] overflow-y-auto p-1">
          <FormLab />
        </main>
      </div>
    </PageWrapper>
  );
}
