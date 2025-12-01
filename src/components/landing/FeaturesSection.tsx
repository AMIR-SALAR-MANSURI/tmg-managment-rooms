"use client";
import { Edit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GetAllRoomResponse, RoomService } from "@/services";
import { Button } from "../ui/button";
import { queryClient } from "@/lib/queryClient";

interface Props {
  data: GetAllRoomResponse[] | undefined;
}

//from-white to-blue-50
export function FeaturesSection({ data }: Props) {
  const router = useRouter();
  return (
    // <section className="bg-gradient-to-b ">
    //   <div className="container mx-auto px-6">
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <>
      {data?.map((feature, index) => (
        <div
          key={index}
          className="relative group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/room/${feature.id}/edit`);
            }}
            className="absolute top-3 left-3 z-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-200 shadow-md"
            title="ویرایش"
            iconLeft={Edit}
          ></Button>

          <div
            // onClick={() => router.push("/chat-bot")}
            className="cursor-pointer"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={
                  feature.imageData
                    ? `data:${feature.imageData.imageContentType};base64,${feature.imageData.imageBase64}`
                    : "/placeholder.svg"
                }
                alt={feature.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
    // </div>
    //   </div>
    // </section>
  );
}

//  <div
//    onClick={() => (window.location.href = "/add-feature")}
//    className="group bg-white/50 rounded-3xl p-8 border-2 border-dashed border-blue-300 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
//  >
//    <div className="absolute max-h-72 inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//    <div className="relative min-h-56 flex flex-col items-center justify-center h-full text-center">
//      <div className="w-16 h-16 bg-gradient-to-br bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 shadow-lg shadow-blue-400/30">
//        <Plus className="w-8 h-8 text-white" />
//      </div>

//      <h3 className="text-xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
//        افزودن پشتیبانی جدید
//      </h3>
//      <p className="text-gray-500 mt-2">سفارشی‌سازی پشتیبان</p>
//    </div>
//  </div>;
