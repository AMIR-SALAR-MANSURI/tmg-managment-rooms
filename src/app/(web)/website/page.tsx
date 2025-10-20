"use client";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { useGetAllLlm } from "@/services";
import React from "react";

const page = () => {
  const { data } = useGetAllLlm();
  return (
    <div>
      <HeroSection />
      <FeaturesSection data={data as []} />
      <Footer />
    </div>
  );
};

export default page;
