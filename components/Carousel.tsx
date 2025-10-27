// "use client";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// interface CarouselProps {
//   images: { src: string; alt?: string }[];
//   autoPlay?: boolean;
//   interval?: number;
//   className?: string;
// }

// export default function Carousel({
//   images,
//   autoPlay = true,
//   interval = 4000,
//   className,
// }: CarouselProps) {
//   const [index, setIndex] = useState(0);
//   const [transition, setTransition] = useState(true);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const next = () => setIndex((prev) => prev + 1);
//   const prev = () => setIndex((prev) => prev - 1);

//   // Auto-play
//   useEffect(() => {
//     if (!autoPlay) return;
//     timeoutRef.current = setInterval(next, interval);
//     return () => {
//       if (timeoutRef.current) clearInterval(timeoutRef.current);
//     };
//   }, [autoPlay, interval]);

//   // Infinite Loop
//   useEffect(() => {
//     if (index >= images.length) {
//       const timer = setTimeout(() => {
//         setTransition(false);
//         setIndex(0);
//       }, 700);
//       return () => clearTimeout(timer);
//     }
//     if (index < 0) {
//       const timer = setTimeout(() => {
//         setTransition(false);
//         setIndex(images.length - 1);
//       }, 700);
//       return () => clearTimeout(timer);
//     }
//     setTransition(true);
//   }, [index, images.length]);

//   return (
//     <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded group ">
//   <div
//     className={cn(
//       "flex transition-transform duration-700 ease-in-out",
//       !transition && "transition-none"
//     )}
//     style={{
//       transform: `translateX(-${index * 100}%)`,
//     }}
//   >
//     {images.map((img, i) => (
//       <div
//         key={i}
//         className="flex-shrink-0 w-full h-[50vh] md:h-[80vh] flex items-center justify-center"
//       >
//         <img
//           src={img.src}
//           alt={img.alt || ""}
//           className="object-center w-full max-h-[100%]  object-cover rounded"
//           onLoad={() => setTransition(true)} // ensure transition only after image loads
//         />
//       </div>
//     ))}
//   </div>
// </div>

//   );
// }






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

  const next = () => setIndex((prev) => prev + 1);
  const prev = () => setIndex((prev) => prev - 1);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    timeoutRef.current = setInterval(next, interval);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [autoPlay, interval]);

  // Infinite Loop
  useEffect(() => {
    if (index >= images.length) {
      const timer = setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (index < 0) {
      const timer = setTimeout(() => {
        setTransition(false);
        setIndex(images.length - 1);
      }, 700);
      return () => clearTimeout(timer);
    }
    setTransition(true);
  }, [index, images.length]);

  return (
    <div className={cn("relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg group", className)}>
      {/* Slides */}
      <div
        className={cn(
          "flex transition-transform duration-700 ease-in-out",
          !transition && "transition-none"
        )}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full h-[50vh] md:h-[80vh] flex items-center justify-center bg-gray-100"
          >
            <img
              src={img.src}
              alt={img.alt || ""}
              className="object-cover w-full  rounded-lg"
              onLoad={() => setTransition(true)}
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <Button
        size="icon"
        variant="secondary"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full backdrop-blur-sm ring-2 ring-emerald-400 opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft className="h-6 w-6 text-emerald-600" />
      </Button>

      {/* Next Button */}
      <Button
        size="icon"
        variant="secondary"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white/80 rounded-full backdrop-blur-sm ring-2 ring-emerald-400 opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight className="h-6 w-6 text-emerald-600" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full transition-all",
              i === index % images.length
                ? "bg-emerald-500/80 w-2.5 h-2.5 ring-2 ring-emerald-300"
                : "bg-gray-300 w-2 h-2"
            )}
          />
        ))}
      </div>
    </div>
  );
}

