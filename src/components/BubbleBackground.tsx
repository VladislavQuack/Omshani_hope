import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Отрицательная задержка означает, что анимация уже идёт какое-то время
    // Пузырьки появляются из нижней части экрана, а не «зависают» сверху
    // Длительность всегда больше абсолютного значения задержки, чтобы пузырьки
    // начинали путь снизу и не оказывались вверху при загрузке
    const newBubbles: Bubble[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 4,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 25, // 25-35 секунд
      delay: -(Math.random() * 20), // Отрицательная задержка: 0-20с «уже прошло»
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Caustics overlay */}
      <div className="caustics" />
      
      {/* Light rays */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`ray-${i}`}
          className="light-ray"
          style={{
            left: `${15 + i * 18}%`,
            height: `${60 + Math.random() * 40}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            opacity: bubble.opacity,
          }}
        />
      ))}

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(26, 122, 122, 0.15)" />
              <stop offset="100%" stopColor="rgba(10, 61, 74, 0.3)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,120 L0,120 Z"
            fill="url(#waveGrad)"
            animate={{
              d: [
                "M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,120 L0,120 Z",
                "M0,50 C360,20 720,90 1080,50 C1260,30 1380,70 1440,50 L1440,120 L0,120 Z",
                "M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ transform: "translateY(10px)" }}
        >
          <motion.path
            d="M0,70 C240,40 480,90 720,60 C960,30 1200,80 1440,70 L1440,120 L0,120 Z"
            fill="rgba(42, 157, 143, 0.08)"
            animate={{
              d: [
                "M0,70 C240,40 480,90 720,60 C960,30 1200,80 1440,70 L1440,120 L0,120 Z",
                "M0,60 C240,90 480,40 720,70 C960,100 1200,50 1440,60 L1440,120 L0,120 Z",
                "M0,70 C240,40 480,90 720,60 C960,30 1200,80 1440,70 L1440,120 L0,120 Z",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>
    </div>
  );
}
