"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CarouselProps {
  images: { src: string; alt?: string }[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function Carousel({
  images,
  autoPlay = true,
  interval = 4000,
  className,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    setTransition(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setTransition(true);
    setIndex((prev) => prev - 1);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    timeoutRef.current = setInterval(next, interval);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [autoPlay, interval]);

  // Infinite Loop Handling
  useEffect(() => {
    if (index === images.length) {
      // After last image, instantly jump to first without animation
      const timer = setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 700); // wait for slide animation to finish
      return () => clearTimeout(timer);
    }

    if (index === -1) {
      // If we go before first image, instantly jump to last
      const timer = setTimeout(() => {
        setTransition(false);
        setIndex(images.length - 1);
      }, 700);
      return () => clearTimeout(timer);
    }

    setTransition(true);
  }, [index, images.length]);

  return (
    <div
      className={cn(
        "relative w-full max-w-8xl mx-auto overflow-hidden h-[70vh] rounded shadow-lg group",
        className
      )}
    >
      <div
        className={cn(
          "flex",
          transition ? "transition-transform duration-700 ease-in-out" : ""
        )}
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${(images.length + 1) * 100}%`,
        }}
      >
        {/* Slides */}
        {[...images, images[0]].map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt || ""}
            className="w-full h-68 md:h-full object-cover object-center flex-shrink-0"
          />
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <Button
        size="icon"
        variant="secondary"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        size="icon"
        variant="secondary"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i === index % images.length ? "bg-emerald-500 w-4" : "bg-gray-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
