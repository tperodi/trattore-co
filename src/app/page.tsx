"use client";

import React from "react";
import Features from "@/components/LandingPage/Features";
import Testimonials from "@/components/LandingPage/Testimonials";
import Footer from "@/components/LandingPage/Footer";
import Header from "@/components/LandingPage/Header";
import Navbar from "@/components/LandingPage/Navbar";



export default function MarketingPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <Header />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
