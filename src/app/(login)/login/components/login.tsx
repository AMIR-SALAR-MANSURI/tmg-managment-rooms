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
import { AuthService } from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, GalleryVerticalEnd, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = AuthService.Login();

type LoginFormData = z.infer<typeof schema>;

export default function Login() {
  const { handleLogin, token, isPending } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

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
  }, [token, router]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex flex-col p-6 md:p-8">
        <div className="flex justify-center md:justify-start">
          <div className="flex items-center gap-2 font-semibold  transition-colors">
            <div className="flex size-12 items-center justify-center rounded-md shadow-sm">
              <Image
                width={100}
                height={100}
                alt="Company Logo"
                src="/support/icon/main.png"
                priority
                className="rounded-full"
              />
            </div>
            <span>داده پردازان بنیان آوا</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="px-6 py-2 text-center ">
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-semibold text-foreground">
                ورود به حساب کاربری
              </h1>

              <p className="text-muted-foreground mt-2 text-sm">
                لطفاً اطلاعات خود را وارد کنید
              </p>
            </div>

            <div className="px-6 py-8">
              <Form {...form}>
                <form
                  className="space-y-4"
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
                          <Input placeholder="admin" {...field} />
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
                        <FormLabel className="text-gray-700">
                          رمز عبور
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="رمز عبور"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute left-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="text"
                    type="submit"
                    loading={isPending}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    ورود به حساب
                  </Button>
                </form>
              </Form>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center text-sm text-gray-500">
              <p className="flex justify-center items-center flex-wrap gap-1">
                با ورود یا ثبت‌نام، شما{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  شرایط استفاده
                </a>{" "}
                و{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  حریم خصوصی
                </a>{" "}
                ما را می‌پذیرید.
              </p>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block bg-muted">
        <img
          src="/support/images/ai-support.png"
          alt="ورود"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
      </div>
    </div>
  );
}
