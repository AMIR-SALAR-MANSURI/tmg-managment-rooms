import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default page;
