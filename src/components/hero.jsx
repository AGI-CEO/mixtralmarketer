"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Hero() {
  // Function to create swords
  const createSwords = () => {
    const h1Element = document.querySelector("h1");
    h1Element.style.position = "relative";

    for (let i = 0; i < 3; i++) {
      const sword = document.createElement("div");
      sword.textContent = "🤖";
      sword.style.position = "absolute";
      sword.style.whiteSpace = "nowrap";
      sword.style.fontSize = "20px";
      h1Element.appendChild(sword);
    }
  };

  // Function to animate swords
  const animateSwords = () => {
    const swords = document.querySelectorAll("h1 div");
    let angle = 0;

    const intervalId = setInterval(() => {
      swords.forEach((sword, index) => {
        const radius = 52;
        const x = radius * Math.cos(angle + (index * Math.PI) / swords.length);
        const y = radius * Math.sin(angle + (index * Math.PI) / swords.length);
        sword.style.left = 50 + x + "%";
        sword.style.top = y + "%";
      });

      angle += 0.01;
    }, 20);

    return () => clearInterval(intervalId);
  };

  // useEffect hook to start the animation when the component mounts
  useEffect(() => {
    createSwords();
    const clearAnimation = animateSwords();

    // Cleanup function to clear the interval when the component unmounts
    return clearAnimation;
  }, []);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Stay Ahead of AI Trends
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Subscribe to our AI Newsletter and receive the latest news,
              insights, and updates straight to your inbox.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
