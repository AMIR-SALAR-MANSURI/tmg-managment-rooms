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
import { useGetAllLab } from "@/services/laboratory";

interface HistoryItem {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
}

export default function Page() {
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
          <ItemList title="تاریخچه" />
        </aside>
        {/* Sidebar - Fixed width with form */}
        <main className="flex-1 min-w-0 space-y-6 h-[650px] overflow-y-auto p-1">
          <FormLab />
        </main>
      </div>
    </PageWrapper>
  );
}
