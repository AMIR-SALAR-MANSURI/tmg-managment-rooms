import InputFilePond from "@/components/file/input-file-pond";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ServerFormProps {
  form?: UseFormReturn<any, any, any>;
}

const RoomForm = ({ form }: ServerFormProps) => {
  return (
    <div className="space-y-8">
      {" "}
      <FormField
        control={form?.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عنوان</FormLabel>
            <FormControl>
              <Input placeholder="سوال را وارد کنید..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form?.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عکس</FormLabel>
            <FormControl>
              <InputFilePond {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form?.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>توضیحات</FormLabel>
            <FormControl>
              <Textarea placeholder="پاسخ را وارد کنید..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RoomForm;
