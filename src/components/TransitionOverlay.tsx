import { motion, AnimatePresence } from "framer-motion";
import LottieLoop from "./LottieLoop";
import loadingAnim from "../assets/Loading.json";

interface TransitionOverlayProps {
  isActive: boolean;
}

export default function TransitionOverlay({ isActive }: TransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center"
          style={{
            background: "linear-gradient(180deg, #0a3d4a 0%, #0d5259 50%, #125a66 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Water ripple effect */}
          <motion.div
            className="absolute rounded-full border border-ocean-300/20"
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 600, height: 600, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full border border-ocean-300/15"
            initial={{ width: 0, height: 0, opacity: 0.4 }}
            animate={{ width: 800, height: 800, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="absolute rounded-full border border-ocean-300/10"
            initial={{ width: 0, height: 0, opacity: 0.3 }}
            animate={{ width: 1000, height: 1000, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
          />

          {/* Center content - Lottie */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-28 h-28 rounded-full glass-strong flex items-center justify-center mb-4 overflow-hidden">
              <LottieLoop
                key="transition-lottie"
                animationData={loadingAnim}
                loop
                autoplay
                renderer="svg"
              />
            </div>
          </motion.div>

          {/* Floating bubbles during transition */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${6 + i * 3}px`,
                height: `${6 + i * 3}px`,
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(95,201,184,0.15))",
                border: "1px solid rgba(255,255,255,0.15)",
                left: `${20 + i * 15}%`,
                bottom: "10%",
              }}
              animate={{
                y: [0, -200 - i * 50],
                x: [0, (i % 2 === 0 ? 1 : -1) * 30],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
