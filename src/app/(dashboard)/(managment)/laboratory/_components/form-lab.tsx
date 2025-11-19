import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
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
import { Textarea } from "@/components/ui/textarea";
import {
  AddLabRequest,
  LabService,
  useAddLab,
  useGetLab,
} from "@/services/laboratory";
import { useGetAllLlm } from "@/services/llmModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResponseCard from "./response-card";
import { useLabStore } from "../store";

export default function FormLab() {
  const schema = LabService.Lab();

  const { mutateAsync, isPending, data: response } = useAddLab();

  const { LabId, setLabId } = useLabStore();

  const detail = useGetLab(LabId as string);

  const { data, isLoading } = useGetAllLlm();

  const onSubmit = async (values: AddLabRequest) => {
    const res = await mutateAsync(values);
    if (res.isSuccess) {
      form.reset({
        llmModelId: undefined,
        contentPrompt: "",
        temperature: 0.5,
        systemPrompt: "",
        question: "",
      });
    }
  };

  const form = useForm<AddLabRequest>({
    disabled: isPending || detail.isLoading,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: detail.data || {
      llmModelId: undefined,
      contentPrompt: undefined,
      temperature: 0.5,
      systemPrompt: "",
      question: undefined,
    },
  });

  useEffect(() => {
    if (LabId && detail.data) {
      form.reset({
        contentPrompt: detail.data.contentPrompt ?? "",
        llmModelId: detail.data.llmModel?.id ?? "",
        question: detail.data.question ?? "",
        systemPrompt: detail.data.systemPrompt ?? "",
        temperature: detail.data.temperature ?? 0,
      });
    }
  }, [form, detail.data, LabId]);

  const clearForm = () => {
    setLabId("");
    form.reset({
      llmModelId: "",
      contentPrompt: "",
      temperature: 0.5,
      systemPrompt: "",
      question: "",
    });
  };

  return (
    <>
      <Card className="top-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>فرم آزمایشگاه</CardTitle>
            <Button onClick={clearForm}>پاک کردن فرم</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <FormField
                  control={form.control}
                  name="llmModelId"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>مدل زبانی</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isPending}
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger
                            aria-invalid={fieldState.invalid}
                            loading={isLoading}
                          >
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
                  name="temperature"
                  rules={{
                    required: "لطفا خلاقیت را وارد کنید",
                    validate: (value) =>
                      value > 0 && value <= 2
                        ? true
                        : "مقدار باید به صورت اعشاری و بین 0 و 2 باشد",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>خلاقیت</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="2"
                          placeholder="خلاقیت را وارد نمایید"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="question"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>سوال</FormLabel>
                      <FormControl>
                        <Textarea placeholder="توضیحات" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full gap-2"
                loading={isPending}
              >
                <Send className="h-4 w-4" />
                ارسال
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ResponseCard
        response={
          LabId ? detail.data?.response : response?.data?.response || ""
        }
      />
    </>
  );
}
