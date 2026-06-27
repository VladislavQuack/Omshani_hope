import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MenuBlockProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  delay?: number;
  icon?: ReactNode;
  label?: string;
  size?: "small" | "medium" | "large" | "tall";
}

export default function MenuBlock({
  children,
  onClick,
  className = "",
  delay = 0,
  icon,
  label,
  size = "medium",
}: MenuBlockProps) {
  const sizeClasses = {
    small: "min-h-[80px]",
    medium: "min-h-[100px]",
    large: "min-h-[140px]",
    tall: "min-h-[180px]",
  };

  return (
    <motion.button
      className={`glass-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer w-full ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: [0, -4, 0], 
        scale: 1 
      }}
      transition={{
        opacity: { duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 3 + delay * 2, repeat: Infinity, ease: "easeInOut", delay: delay },
        scale: { duration: 0.6, delay: delay },
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {icon && (
        <motion.div
          className="text-ocean-200"
          whileHover={{ rotate: 5 }}
        >
          {icon}
        </motion.div>
      )}
      {label && (
        <span className="text-ocean-100 text-sm font-medium tracking-wide">
          {label}
        </span>
      )}
      {children}
    </motion.button>
  );
}
