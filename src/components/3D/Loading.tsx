"use client";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const LoadingScreen = ({ started, setStarted }: { started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress, setStarted]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
  flex items-center justify-center bg-black shadow-2xl
  ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-4xl md:text-9xl font-bold text-white relative">
        <div
          className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        >
          TRACK WELL
        </div>
        <div className="opacity-40">TRACK WELL</div>
      </div>
    </div>
  );
};