"use client";

import InputFilePond from "@/components/file/input-file-pond";
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
import { AddRoomRequest, EditRoomRequest } from "@/services";
import {
  AddClientsRequest,
  EditClientsRequest,
  useGetAllClients,
} from "@/services/clients";
import { useGetAllLlm } from "@/services/llmModels";
import { useGetAllUser } from "@/services/users";
import { UseFormReturn } from "react-hook-form";

interface RoomFormProps {
  form: UseFormReturn<AddRoomRequest, any, EditRoomRequest>;
}

export default function RoomForm({ form }: RoomFormProps) {
  const { data, isLoading } = useGetAllLlm();
  const { data: client } = useGetAllClients({ returnAll: true });
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-2">
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
          name="clientId"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>کلاینت</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="انتخاب کلاینت" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Map actual clients */}
                    {client?.data?.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="llmModelId"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>مدل زبانی</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="انتخاب مدل زبانی" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Map actual LLM models */}
                    {data?.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ImageFile"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>عکس</FormLabel>
              <FormControl>
                <InputFilePond
                  {...field}
                  value={field.value ? [field.value] : []}
                  storeAsFile
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contentPrompt"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>contentPrompt</FormLabel>
              <FormControl>
                <Textarea placeholder="توضیحات" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="systemPrompt"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>systemPrompt</FormLabel>
              <FormControl>
                <Textarea placeholder="توضیحات" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full">
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
