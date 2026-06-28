import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import LottieLoop from "./LottieLoop";
import loadingAnim from "../assets/Loading.json";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const completedRef = useRef(false);

  const finishLoading = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setShowLoader(false);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(finishLoading, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    // Hard timeout fallback: never block app behind loader forever
    const hardTimeout = setTimeout(() => {
      setProgress(100);
      finishLoading();
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(hardTimeout);
    };
  }, [finishLoading]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #0a3d4a 0%, #0d5259 50%, #125a66 100%)",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated bubbles in loader */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${8 + i * 4}px`,
                height: `${8 + i * 4}px`,
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(95,201,184,0.2))",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              animate={{
                y: [-20, -100 - i * 30],
                x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Lottie area */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-56 h-56 rounded-full glass-strong flex items-center justify-center pulse-glow overflow-hidden">
              <LottieLoop animationData={loadingAnim} loop autoplay renderer="svg" />
            </div>

            {/* Orbiting ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-ocean-300/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ margin: "-8px" }}
            />
            <motion.div
              className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-ocean-300/60"
              style={{ marginTop: "-8px", marginLeft: "-4px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Brand name */}
          <motion.h1
            className="text-3xl font-light tracking-[0.3em] text-ocean-100 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ОМ ШАНИ
          </motion.h1>
          <motion.p
            className="text-base font-normal tracking-[0.22em] text-white drop-shadow-[0_2px_0_rgba(10,61,74,0.55)] mb-10"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            ЦЕНТР ЙОГИ
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-ocean-400 to-ocean-200 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-xs text-ocean-300/50 mt-3 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>

          {/* Caption */}
          <motion.p
            className="absolute bottom-8 text-[10px] text-ocean-300/30 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Загрузка...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
