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

const CardAdd = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          افزودن Feature جدید
        </CardTitle>
        <CardDescription>اطلاعات feature جدید خود را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Form> */}
        <form className="space-y-6">
          <RoomForm />
        </form>
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1" size="lg">
            ذخیره Feature
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
        {/* </Form> */}
      </CardContent>
    </Card>
  );
};

export default CardAdd;
