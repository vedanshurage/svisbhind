"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FinalPage() {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event;
      if (beta !== null && gamma !== null) {
        const cappedGamma = Math.max(-45, Math.min(45, gamma));
        const cappedBeta = Math.max(-45, Math.min(45, beta));

        const multiplier = 1.2;
        setTiltX(cappedGamma * multiplier);
        setTiltY(cappedBeta * multiplier);
      }
    };

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.error("Permission request for device orientation failed:", error);
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
    <div className="relative w-full h-screen bg-pink-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative pandas */}
      <motion.div
        className="absolute top-10 left-5 w-20 h-20 opacity-60"
        animate={{ x: tiltX * 1.5, y: tiltY * 1.5 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <img src="/stickers/panda3.png" alt="" className="w-full h-full object-contain" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-5 w-24 h-24 opacity-60"
        animate={{ x: tiltX * 0.8, y: tiltY * 0.8 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <img src="/stickers/panda4.png" alt="" className="w-full h-full object-contain" />
      </motion.div>

      {/* Main Letter Container */}
      <motion.div
        className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center"
        animate={{ x: tiltX, y: tiltY, rotate: tiltX * 0.1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Love Letter */}
        <div className="bg-white/90 p-8 rounded-[40px] shadow-2xl border-8 border-pink-300 backdrop-blur-md relative overflow-hidden">
          {/* Cute ribbon top */}
          <div className="absolute top-0 left-0 w-full h-4 bg-pink-400"></div>

          <h1 className="text-4xl font-extrabold text-pink-600 mb-6 text-center font-serif italic">
            To My Favorite Person...
          </h1>

          <div className="space-y-4 text-gray-700 text-lg leading-relaxed text-center">
            <p>
              I just wanted to take a moment to tell you how incredibly special you are to me.
              Every moment with you feels like a beautiful dream, and I cherish all the little
              things that make you, YOU.
            </p>
            <p>
              You light up my world in ways I never thought possible.
              Thank you for being the amazing, wonderful person that you are.
            </p>
            <p className="font-bold text-pink-500 text-xl mt-4">
              I love you more than words can say. 💕
            </p>
          </div>
        </div>

        {/* Cliffhanger Text */}
        <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
        >
            <p className="text-purple-600 font-bold text-xl bg-purple-100/80 px-6 py-3 rounded-full border-2 border-purple-300 shadow-sm animate-pulse">
                But wait... there&apos;s another surprise coming soon! ✨👀
            </p>
        </motion.div>
      </motion.div>

       {/* Page indicator */}
       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-0">
         {[1, 2, 3, 4, 5].map((idx) => (
             <div key={idx} className={`w-3 h-3 rounded-full ${idx === 5 ? 'bg-pink-500' : 'bg-pink-200'}`} />
         ))}
      </div>
    </div>
  );
}
