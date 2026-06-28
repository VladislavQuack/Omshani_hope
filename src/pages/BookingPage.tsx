import { motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, ExternalLink, Sparkles } from "lucide-react";

interface BookingPageProps {
  onBack: () => void;
}

export default function BookingPage({ onBack }: BookingPageProps) {
  // ──────────────────────────────────────────────
  // Replace this function body with YOUR CRM widget open call.
  // Examples:
  //   (window as any).YClientsWidget?.open();
  //   (window as any).Yclients?.openWidget({...});
  //   window.open("https://your-crm-link.com/booking", "_blank");
  // ──────────────────────────────────────────────
  const openCrmWidget = () => {
    alert("Здесь откроется виджет CRM для записи");
  };

  return (
    <motion.div
      className="min-h-full px-5 py-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.button
        className="flex items-center gap-2 text-ocean-300/70 mb-6"
        onClick={onBack}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} />
        <span className="text-sm tracking-wide">Назад</span>
      </motion.button>

      <motion.h1
        className="text-3xl sm:text-4xl font-light text-white mb-3 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Запись на практику
      </motion.h1>
      <motion.div
        className="w-12 h-0.5 bg-ocean-400/50 mb-6"
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Hero icon */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full glass-strong flex items-center justify-center pulse-glow">
            <CalendarCheck size={40} className="text-ocean-200" strokeWidth={1.5} />
          </div>
          <motion.div
            className="absolute -top-1 -right-1 text-ocean-300/60"
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles size={16} />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-1 text-ocean-300/40"
            animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles size={12} />
          </motion.div>
        </div>
      </motion.div>

      {/* Brief description */}
      <motion.p
        className="text-ocean-50/90 text-base sm:text-lg text-center leading-relaxed mb-8 px-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Выберите удобную дату, время и вид занятия —
        запись занимает меньше минуты.
      </motion.p>

      {/* Main CTA button */}
      <motion.button
        className="w-full h-14 rounded-2xl font-semibold text-lg tracking-wide text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(95, 201, 184, 0.5) 0%, rgba(42, 157, 143, 0.7) 100%)",
          border: "1px solid rgba(136, 212, 196, 0.5)",
          boxShadow:
            "0 8px 32px rgba(42, 157, 143, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={openCrmWidget}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        <span className="relative z-10 flex items-center justify-center gap-2">
          Записаться на занятие
          <ExternalLink size={18} />
        </span>
      </motion.button>

      {/* Helpful info */}
      <motion.div
        className="space-y-3 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        <h2 className="text-ocean-100 text-base font-medium tracking-wide mb-2">
          Полезная информация
        </h2>

        <div className="glass-card rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-1 h-10 rounded-full bg-ocean-400/50" />
          <div>
            <p className="text-white text-sm font-medium mb-1">Первый раз у нас?</p>
            <p className="text-ocean-100/75 text-xs leading-relaxed">
              Пробное занятие — бесплатно. Возьмите с собой удобную одежду и воду.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-1 h-10 rounded-full bg-ocean-400/50" />
          <div>
            <p className="text-white text-sm font-medium mb-1">Не получается прийти?</p>
            <p className="text-ocean-100/75 text-xs leading-relaxed">
              Отмените запись за 4 часа до начала — и занятие сохранится в абонементе.
            </p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-1 h-10 rounded-full bg-ocean-400/50" />
          <div>
            <p className="text-white text-sm font-medium mb-1">Остались вопросы?</p>
            <p className="text-ocean-100/75 text-xs leading-relaxed">
              Позвоните нам или напишите — мы с радостью поможем подобрать практику.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
