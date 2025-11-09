"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectSearchable from "@/components/ui/select-searchable";
import { Textarea } from "@/components/ui/textarea";
import { AddClientsRequest, EditClientsRequest } from "@/services/clients";
import { useGetAllUser } from "@/services/users";
import { UseFormReturn } from "react-hook-form";

interface ClientFormProps {
  form: UseFormReturn<AddClientsRequest, any, EditClientsRequest>;
}

export default function ClientForm({ form }: ClientFormProps) {
  const { data, isLoading } = useGetAllUser({ returnAll: true });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام</FormLabel>
              <FormControl>
                <Input placeholder="نام" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isDisabled"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>وضعیت</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => field.onChange(val === "true")}
                  value={String(field.value)}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="انتخاب وضعیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">فعال</SelectItem>
                    <SelectItem value="true">غیرفعال</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userIds"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>کاربران</FormLabel>
              <FormControl>
                <SelectSearchable
                  multiSelect
                  isLoading={isLoading}
                  value={field.value}
                  id="target_achieving"
                  placeholder="انتخاب نمایید ..."
                  searchPlaceholder="جستجوی ..."
                  onChange={(arg) => {
                    field.onChange(arg);
                  }}
                  options={data?.map((i) => ({
                    label: i.username,
                    value: i.id,
                  }))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Textarea placeholder="توضیحات" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
