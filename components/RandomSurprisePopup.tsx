"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Edge = "top" | "bottom" | "left" | "right";

interface PopupData {
  id: string;
  src: string;
  edge: Edge;
}

export default function RandomSurprisePopup() {
  const [popup, setPopup] = useState<PopupData | null>(null);

  useEffect(() => {
    // Function to trigger a random popup
    const triggerPopup = () => {
      const isSticker = Math.random() > 0.5;
      const src = isSticker
        ? `/stickers/panda${Math.floor(Math.random() * 25) + 1}.png`
        : `/photos/funny${Math.floor(Math.random() * 5) + 1}.jpg`;

      const edges: Edge[] = ["top", "bottom", "left", "right"];
      const edge = edges[Math.floor(Math.random() * edges.length)];

      setPopup({
        id: Date.now().toString(),
        src,
        edge,
      });

      // Clear the popup after 4-5 seconds
      setTimeout(() => {
        setPopup(null);
      }, 4500);
    };

    const intervalId = setInterval(() => {
      triggerPopup();
    }, Math.floor(Math.random() * (25000 - 12000 + 1)) + 12000); // 12 to 25 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (!popup) return null;

  // Determine initial position, transform origin, and rotation based on edge
  const getAnimationVariants = (edge: Edge) => {
    switch (edge) {
      case "top":
        return {
          initial: { y: -200, rotate: -20 },
          animate: { y: 0, rotate: 20, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1, ease: "easeInOut" as const } },
          exit: { y: -200, transition: { duration: 0.5 } },
          origin: "top center",
          position: { top: 0, left: "50%", x: "-50%" },
        };
      case "bottom":
        return {
          initial: { y: 200, rotate: -20 },
          animate: { y: 0, rotate: 20, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1, ease: "easeInOut" as const } },
          exit: { y: 200, transition: { duration: 0.5 } },
          origin: "bottom center",
          position: { bottom: 0, left: "50%", x: "-50%" },
        };
      case "left":
        return {
          initial: { x: -200, rotate: -20 },
          animate: { x: 0, rotate: 20, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1, ease: "easeInOut" as const } },
          exit: { x: -200, transition: { duration: 0.5 } },
          origin: "center left",
          position: { left: 0, top: "50%", y: "-50%" },
        };
      case "right":
        return {
          initial: { x: 200, rotate: 20 },
          animate: { x: 0, rotate: -20, transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1, ease: "easeInOut" as const } },
          exit: { x: 200, transition: { duration: 0.5 } },
          origin: "center right",
          position: { right: 0, top: "50%", y: "-50%" },
        };
    }
  };

  const animation = getAnimationVariants(popup.edge);

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          key={popup.id}
          className="fixed z-50 pointer-events-none"
          style={{
            ...animation.position,
            transformOrigin: animation.origin,
          }}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
        >
          {/* Rope line */}
          {(popup.edge === 'top' || popup.edge === 'bottom') && (
             <div className={`absolute w-1 bg-amber-700/50 left-1/2 -translate-x-1/2 ${popup.edge === 'top' ? 'bottom-full h-[50vh]' : 'top-full h-[50vh]'}`} />
          )}
          {(popup.edge === 'left' || popup.edge === 'right') && (
             <div className={`absolute h-1 bg-amber-700/50 top-1/2 -translate-y-1/2 ${popup.edge === 'left' ? 'right-full w-[50vw]' : 'left-full w-[50vw]'}`} />
          )}
          <div className="relative p-2 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm border-4 border-pink-200">
             <img src={popup.src} alt="Surprise" className="w-32 h-32 object-contain rounded-xl" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
