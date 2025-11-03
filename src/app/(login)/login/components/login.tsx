"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { LoginRequest } from "@/services";
import { AuthService } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = AuthService.Login();

type LoginFormData = z.infer<typeof schema>;

export default function Login() {
  const { handleLogin, token, isPending } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    disabled: isPending,
    resolver: zodResolver(schema),
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    await handleLogin(values);
  };

  useEffect(() => {
    if (token) router.push("/dashboard");
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-center">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">
              ورود به حساب کاربری
            </h1>
            <p className="text-blue-100 mt-2">لطفا اطلاعات خود را وارد کنید</p>
          </div>

          <div className="px-6 py-8">
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        نام کاربری
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">رمز عبور</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant={"primary"}
                  type="submit"
                  loading={isPending}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ورود به حساب
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                حساب کاربری ندارید؟{" "}
                <span className="font-medium text-blue-600">ثبت‌نام کنید</span>
              </button>
            </div>
          </div>

          <div className=" bg-gray-50 px-6 py-4 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              با ورود یا ثبت‌نام، شما{" "}
              <p className="text-blue-600 hover:underline">شرایط استفاده</p> و{" "}
              <p className="text-blue-600 hover:underline">حریم خصوصی</p> ما را
              می‌پذیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
