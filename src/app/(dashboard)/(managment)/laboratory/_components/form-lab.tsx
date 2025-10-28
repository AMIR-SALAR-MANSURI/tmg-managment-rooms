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
import { AddLabRequest, LabService, useAddLab } from "@/services/laboratory";
import { useGetAllLlm } from "@/services/llmModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ResponseCard from "./response-card";

interface HistoryItem {}
export default function FormLab() {
  const schema = LabService.Lab();

  const { mutateAsync, isPending, data: response } = useAddLab();

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
    disabled: isPending,
    reValidateMode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
      contentPrompt: "",
      temperature: undefined,
      llmModelId: "",
      systemPrompt: "",
    },
  });
  return (
    <>
      <Card className="top-6">
        <CardHeader>
          <CardTitle>فرم آزمایشگاه</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 space-y-2">
                {/* <div className="flex flex-col md:flex-row md:items-end gap-4 col-span-full"> */}
                {/* <div className="flex-1"> */}
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
                {/* </div> */}

                {/* <div className="flex-1"> */}

                {/* </div> */}
                {/* </div> */}

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
                  name="temperature"
                  rules={{
                    required: "لطفا دقت را وارد کنید",
                    validate: (value) =>
                      value > 0 && value <= 2
                        ? true
                        : "مقدار باید به صورت اعشاری و بین 0 و 2 باشد",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>دقت</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="2"
                          placeholder="دقت را وارد نمایید"
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
              <Button type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                ارسال
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <ResponseCard response={response?.data.response} />
    </>
  );
}
