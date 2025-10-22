"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CardAdd from "./components/card-add";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end">
          <Link href="/" className="">
            <Button variant="dashed" className="mb-6">
              بازگشت
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>

        <CardAdd />
      </div>
    </div>
  );
}
