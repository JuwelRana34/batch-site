"use client";

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { useEffect, useState } from "react";

export default function Countdown({
  date,
  examName,
  reslut,
}: {
  date: string;
  examName: string;
  reslut: string;
}) {
  const [digitSize, setDigitSize] = useState({
    width: 50,
    height: 70,
    fontSize: 32,
  });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 400) {
        setDigitSize({ width: 26, height: 40, fontSize: 28 });
      } else if (window.innerWidth < 768) {
        setDigitSize({ width: 35, height: 55, fontSize: 26 });
      } else {
        setDigitSize({ width: 50, height: 70, fontSize: 32 });
      }
    };

    updateSize(); // initial check
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10  bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition hover:shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 text-center">
        <h2 className="text-xl font-semibold tracking-wide">{examName}</h2>
      </div>

      {/* Countdown Body */}
      <div className="p-6 flex flex-col items-center justify-center  ">
        <h3 className="text-gray-700 font-medium mb-4 text-sm tracking-wide uppercase">
          Time Remaining
        </h3>

        <FlipClockCountdown
          to={new Date(date).getTime()}
          labels={["Days", "Hours", "Minutes", "Seconds"]}
          labelStyle={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#4B5563",
          }}
          digitBlockStyle={{
            width: digitSize.width,
            height: digitSize.height,
            fontSize: digitSize.fontSize,
            fontWeight: "bold",
            borderRadius: 5,
          }}
          dividerStyle={{ color: "#4B5563", height: 1 }}
          duration={0.6}
        >
          <h1 className=" capitalize text-rose-400 font-semibold text-4xl">{reslut }</h1>
        </FlipClockCountdown>
      </div>
    </div>
  );
}
