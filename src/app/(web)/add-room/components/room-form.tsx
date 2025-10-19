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

const RoomForm = () => {
  return (
    <div>
      {" "}
      <FormField
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>عکس</FormLabel>
            <FormControl>
              <InputFilePond />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
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
