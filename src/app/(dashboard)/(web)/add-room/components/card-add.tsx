"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RoomForm from "./room-form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("لطفا یک ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const CardAdd = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    disabled: false,
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <div className="relative group">
      {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg blur opacity-25 transition duration-1000 animate-pulse"></div> */}

      <Card className="relative shadow-lg bg-white border-0">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">افزودن اتاق جدید</CardTitle>
          <CardDescription>اطلاعات اتاق جدید خود را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <RoomForm />
            </form>
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" size="lg">
                ذخیره
              </Button>
              <Button
                type="button"
                variant="primary"
                // onClick={() => router.push("/")}
                size="lg"
              >
                انصراف
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardAdd;
