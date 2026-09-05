"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface QuestionPageProps {
  question: string;
  pageIndex: number;
  onNext: () => void;
}

export default function QuestionPage({ question, pageIndex, onNext }: QuestionPageProps) {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;
      if (beta !== null && gamma !== null) {
        // gamma is left/right (-90 to 90)
        // beta is front/back (-180 to 180)
        // Cap values to prevent extreme sliding
        const cappedGamma = Math.max(-45, Math.min(45, gamma));
        const cappedBeta = Math.max(-45, Math.min(45, beta));

        // Calculate offset multiplier (tweak for stronger/weaker effect)
        const multiplier = 1.5;
        setTiltX(cappedGamma * multiplier);
        setTiltY(cappedBeta * multiplier);
      }
    };

    // Try to request permission if needed (iOS 13+)
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.error("Permission request for device orientation failed:", error);
          // Fallback to listening anyway, maybe it works
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    requestPermission();

    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return (
    <div className="relative w-full h-screen bg-pink-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative floating elements reacting to tilt */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 opacity-50"
        animate={{ x: tiltX * 1.2, y: tiltY * 1.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <img src="/stickers/panda1.png" alt="" className="w-full h-full object-contain" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 opacity-50"
        animate={{ x: tiltX * 0.8, y: tiltY * 0.8 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <img src="/stickers/panda2.png" alt="" className="w-full h-full object-contain" />
      </motion.div>


      {/* Main swinging question */}
      <motion.div
        className="relative z-10 text-center px-4"
        animate={{
          x: tiltX,
          y: tiltY,
          rotate: tiltX * 0.2, // slight rotation based on tilt
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Rope */}
        <div className="absolute left-1/2 -top-[50vh] h-[50vh] w-1 bg-amber-800 -translate-x-1/2 origin-top" />

        <motion.div
           animate={{ rotate: [-5, 5] }}
           transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 2, ease: "easeInOut" as const }}
           style={{ transformOrigin: "top center" }}
        >
            <h1 className="text-3xl md:text-5xl font-extrabold text-pink-600 bg-white/80 p-6 rounded-3xl shadow-xl border-4 border-pink-200 mt-8 mb-8 backdrop-blur-sm relative">
                {/* Connecting knot */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-amber-900 rounded-full" />
                {question}
            </h1>
        </motion.div>
      </motion.div>

      {/* Input and button container */}
      <motion.div
        className="z-10 flex flex-col items-center gap-4 w-full max-w-md px-6"
        animate={{ x: tiltX * 1.5, y: tiltY * 1.5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full p-4 text-center rounded-full border-4 border-purple-200 focus:border-purple-400 focus:outline-none shadow-lg text-lg text-gray-700 bg-white/90"
        />
        <button
          onClick={onNext}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform hover:scale-105 active:scale-95 border-b-4 border-purple-700"
        >
          Next 💖
        </button>
      </motion.div>

      {/* Page indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-0">
         {[1, 2, 3, 4, 5].map((idx) => (
             <div key={idx} className={`w-3 h-3 rounded-full ${idx === pageIndex ? 'bg-pink-500' : 'bg-pink-200'}`} />
         ))}
      </div>
    </div>
  );
}
