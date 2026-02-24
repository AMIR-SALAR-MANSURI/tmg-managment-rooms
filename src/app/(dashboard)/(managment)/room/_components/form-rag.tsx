"use client";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputFile from "@/components/ui/input-file";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AddRoomRagRequest,
  RagParameter,
} from "@/services/room/room.interface";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface Props {
  isPending: boolean;
  form: UseFormReturn<AddRoomRagRequest>;
}

const FormRag = ({ isPending, form }: Props) => {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <Alert
          title="info"
          className="border-primary/15 bg-sidebar-primary/15"
          variant={"default"}
        >
          <AlertTitle className="flex text-primary text-wrap items-center justify-center font-bold text-base">
            به منظور ثبت فرم دانش داده ها را به صورت متن در قسمت دانش اضافه کرده
            یا به صورت فایل اپلود نمایید (یکی از دوبخش قابل ثبت می باشد)
          </AlertTitle>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-2">
          <FormField
            control={form.control}
            name="Knowledge"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>دانش</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    className="max-h-[240px] overflow-y-auto"
                    placeholder="دانش"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="File"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>فایل دانش</FormLabel>
                <FormControl>
                  <InputFile
                    sendAsFile
                    value={field.value}
                    name={field.name}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    accept=".zip,.doc,.docx,.xls,.xlsx,.pdf,.jpg,.png,.tif,.txt"
                    maxSize={1 * 1024 * 1024}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="RAGParameters"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>RAGParameters</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(val) => {
                      field.onChange(Number(val));
                    }}
                    value={String(field.value)}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={String(RagParameter.MS_WORD_TEXT)}>
                          خط به خط
                        </SelectItem>
                        <SelectItem
                          value={String(RagParameter.MS_WORD_PARAGRAPH)}
                        >
                          پاراگراف به پاراگراف
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative col-span-full">
            <FormField
              control={form.control}
              name="SystemPrompt"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>SystemPrompt</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="max-h-[240px] overflow-y-auto"
                      placeholder="SystemPrompt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="relative col-span-full">
            <FormField
              control={form.control}
              name="SmallTalkPrompt"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>SmallTalkPrompt</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className="max-h-[240px] overflow-y-auto"
                      placeholder="SmallTalkPrompt"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2 mt-4">
          <Button
            type="button"
            className="w-full"
            variant="ghost"
            onClick={() => router.push("/room")}
          >
            لغو
          </Button>
          <Button type="submit" loading={isPending} className="w-full">
            ذخیره
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormRag;
