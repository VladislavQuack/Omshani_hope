import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

interface FloatingBookingButtonProps {
  onClick: () => void;
}

export default function FloatingBookingButton({ onClick }: FloatingBookingButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="fixed right-5 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-ocean-50 shadow-2xl"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        background:
          "linear-gradient(135deg, rgba(95, 201, 184, 0.78) 0%, rgba(42, 157, 143, 0.92) 100%)",
        border: "1px solid rgba(136, 212, 196, 0.45)",
        boxShadow:
          "0 10px 30px rgba(42, 157, 143, 0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12">
        <CalendarCheck size={18} />
      </span>
      <span className="pr-1">Записаться</span>
    </motion.button>
  );
}
