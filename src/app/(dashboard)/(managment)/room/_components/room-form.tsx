"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/ui/input-file";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AddRoomRequest, EditRoomRequest } from "@/services";
import { useGetAllClients } from "@/services/clients";
import { useGetAllLlm } from "@/services/llmModels";
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
                  disabled={form.formState.disabled}
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="انتخاب کلاینت" />
                  </SelectTrigger>
                  <SelectContent>
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
                  disabled={form.formState.disabled}
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="انتخاب مدل زبانی" />
                  </SelectTrigger>
                  <SelectContent>
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
                <InputFile
                  sendAsFile
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  accept="image/*"
                  maxSize={1 * 1024 * 1024}
                />
                {/* <InputFilePond
                  {...field}
                  value={field.value ? [field.value] : []}
                  storeAsFile
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="relative col-span-full">
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
          <span className="absolute bottom-2 left-3 text-sm text-muted-foreground">
            {form.watch("contentPrompt")?.length ?? 0}
          </span>
        </div>
        {/* <FormField
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
        /> */}
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
