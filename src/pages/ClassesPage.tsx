import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Sun,
  Moon,
  Sunrise,
  Sparkles,
  Star,
  Footprints,
  Apple,
  ChevronDown,
} from "lucide-react";
import FloatingBookingButton from "../components/FloatingBookingButton";

interface ClassesPageProps {
  onBack: () => void;
  onBook: () => void;
}

type RoomId = "light" | "green";
type DayId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const DAYS: { id: DayId; short: string; full: string }[] = [
  { id: 0, short: "Пн", full: "Понедельник" },
  { id: 1, short: "Вт", full: "Вторник" },
  { id: 2, short: "Ср", full: "Среда" },
  { id: 3, short: "Чт", full: "Четверг" },
  { id: 4, short: "Пт", full: "Пятница" },
  { id: 5, short: "Сб", full: "Суббота" },
  { id: 6, short: "Вс", full: "Воскресенье" },
];

interface ScheduleEntry {
  time: string;
  name: string;
  type: string;
  instructor: string;
  room: RoomId;
  icon: React.ReactNode;
}

const schedule: Record<DayId, ScheduleEntry[]> = {
  0: [
    // Понедельник
    { time: "08:30–09:30", name: "Доброе утро", type: "Хатха", instructor: "Рубен", room: "light", icon: <Sunrise size={13} /> },
    { time: "18:30–20:00", name: "Йогатерапия спины", type: "Йогатерапия", instructor: "Рубен", room: "light", icon: <Moon size={13} /> },

    { time: "18:00–19:15", name: "Начальный уровень", type: "Начальный уровень", instructor: "Наталья", room: "green", icon: <Moon size={13} /> },
    { time: "19:15–20:30", name: "Индивидуальные практики", type: "Индивидуальные практики", instructor: "Наталья", room: "green", icon: <Moon size={13} /> },
  ],
  1: [
    // Вторник
    { time: "11:00–12:00", name: "Йога-мудра 60+", type: "Йога-мудра", instructor: "Рубен", room: "light", icon: <Sun size={13} /> },
    { time: "18:30–20:00", name: "Хатха-йога начальный уровень", type: "Хатха", instructor: "Наталья", room: "light", icon: <Moon size={13} /> },

    { time: "18:15–19:30", name: "Йога-фитнес", type: "Фитнес", instructor: "Светлана", room: "green", icon: <Moon size={13} /> },
    { time: "19:30–21:00", name: "Йогатерапия спины", type: "Йогатерапия", instructor: "Рубен", room: "green", icon: <Moon size={13} /> },
  ],
  2: [
    // Среда
    { time: "08:30–09:30", name: "Доброе утро", type: "Хатха", instructor: "Рубен", room: "light", icon: <Sunrise size={13} /> },
    { time: "10:00–11:00", name: "Йогатерапия ТБС", type: "Йогатерапия", instructor: "Рубен", room: "light", icon: <Sun size={13} /> },
    { time: "18:30–20:00", name: "Йогатерапия спины", type: "Йогатерапия", instructor: "Рубен", room: "light", icon: <Moon size={13} /> },

    { time: "18:00–19:15", name: "Хатха-йога начальный уровень", type: "Хатха", instructor: "Наталья", room: "green", icon: <Sunrise size={13} /> },
    { time: "19:15–20:30", name: "Индивидуальные практики", type: "Индивидуальные практики", instructor: "Наталья", room: "green", icon: <Moon size={13} /> },
  ],
  3: [
    // Четверг
    { time: "18:30–20:00", name: "Хатха-йога начальный уровень", type: "Хатха", instructor: "Наталья", room: "light", icon: <Sun size={13} /> },

    { time: "18:15–19:30", name: "Йога фитнес", type: "Фитнес", instructor: "Светлана", room: "green", icon: <Moon size={13} /> },
    { time: "19:30–21:00", name: "Йогатерапия спины", type: "Йогатерапия", instructor: "Рубен", room: "green", icon: <Sun size={13} /> },
  ],
  4: [
    // Пятница (по вашему сообщению)
    { time: "08:30–09:30", name: "Доброе утро", type: "Хатха", instructor: "Рубен", room: "light", icon: <Sunrise size={13} /> },
    { time: "10:00–11:00", name: "Индивидуальные практики", type: "Индивидуальные практики", instructor: "Рубен", room: "green", icon: <Sun size={13} /> },
    { time: "11:00–12:00", name: "Йога мудра 60+", type: "Йога-мудра", instructor: "Рубен", room: "light", icon: <Sun size={13} /> },
    { time: "17:30–19:00", name: "Йогатерапия спины", type: "Йогатерапия", instructor: "Рубен", room: "light", icon: <Moon size={13} /> },
  ],
  5: [
    // Суббота (по вашему сообщению)
    { time: "11:00–11:30", name: "Хатха-йога", type: "Хатха", instructor: "Наталья", room: "light", icon: <Sunrise size={13} /> },
  ],
  6: [
    // Воскресенье (по вашему сообщению)
    { time: "10:00–11:30", name: "Йогатерапия спины", type: "Йогатерапия", instructor: "Рубен", room: "light", icon: <Sunrise size={13} /> },
  ],
};

const extras = [
  {
    name: "Стояние на гвоздях",
    description: "Практика на доске Садху — путь к осознанности через тело. Групповые и индивидуальные сессии.",
    icon: <Footprints size={18} />,
    color: "from-amber-400/30 to-ocean-500/30",
  },
  {
    name: "Нутрициология",
    description: "Консультации по питанию и здоровому образу жизни. Индивидуальные программы.",
    icon: <Apple size={18} />,
    color: "from-emerald-400/30 to-ocean-500/30",
  },
  {
    name: "Консультация астролога",
    description: "Персональный разбор натальной карты. Помощь в самопознании через астрологию.",
    icon: <Star size={18} />,
    color: "from-purple-400/30 to-ocean-500/30",
  },
  {
    name: "Консультация нумеролога",
    description: "Анализ жизненного пути по дате рождения. Рекомендации для гармоничной жизни.",
    icon: <Sparkles size={18} />,
    color: "from-sky-400/30 to-ocean-500/30",
  },
];

const ROOM_LABELS: Record<RoomId, { name: string; dot: string }> = {
  light: { name: "Светлый зал", dot: "bg-amber-300/70" },
  green: { name: "Зелёный зал", dot: "bg-emerald-400/70" },
};

export default function ClassesPage({ onBack, onBook }: ClassesPageProps) {
  const todayIdx = (new Date().getDay() + 6) % 7;
  const [selectedDay, setSelectedDay] = useState<DayId>(todayIdx as DayId);
  const [extrasOpen, setExtrasOpen] = useState(false);

  const dayClasses = schedule[selectedDay] || [];
  const lightClasses = dayClasses.filter((c) => c.room === "light");
  const greenClasses = dayClasses.filter((c) => c.room === "green");

  return (
    <motion.div
      className="min-h-full px-5 py-6 pb-32"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.button
        className="mb-6 flex items-center gap-2 text-ocean-300/70"
        onClick={onBack}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} />
        <span className="text-sm tracking-wide">Назад</span>
      </motion.button>

      <motion.h1
        className="mb-3 text-3xl sm:text-4xl font-light tracking-wide text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Расписание
      </motion.h1>
      <motion.div
        className="mb-6 h-0.5 w-12 bg-ocean-400/50"
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <motion.div
        className="-mx-5 mb-5 flex gap-1.5 overflow-x-auto px-5 pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {DAYS.map((day) => {
          const isActive = selectedDay === day.id;
          const isToday = day.id === todayIdx;
          return (
            <button
              key={day.id}
              className={`relative shrink-0 rounded-xl px-4 py-2.5 text-lg sm:text-xl transition-all ${
                isActive
                  ? "text-white font-semibold drop-shadow-sm"
                  : "text-ocean-100 font-semibold active:scale-95"
              }`}
              style={
                isActive
                  ? {
                      background: "rgba(42, 157, 143, 0.50)",
                      border: "1px solid rgba(136, 212, 196, 0.60)",
                      boxShadow: "0 2px 12px rgba(42,157,143,0.30)",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }
              }
              onClick={() => setSelectedDay(day.id)}
            >
              <span className="inline-block">{day.short}</span>
              {isToday && (
                <span className="absolute -right-1 top-0.5 h-3 w-3 translate-y-0.5 rounded-full bg-ocean-300 drop-shadow" />
              )}
            </button>
          );
        })}
      </motion.div>

      <motion.div
        className="mb-4 ml-1 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {(["light", "green"] as RoomId[]).map((r) => (
          <div key={r} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${ROOM_LABELS[r].dot}`} />
            <span className="text-xs sm:text-sm text-ocean-200/80">{ROOM_LABELS[r].name}</span>
          </div>
        ))}
      </motion.div>

      <motion.h2
        className="mb-4 text-xl sm:text-2xl font-medium tracking-wide text-ocean-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {DAYS[selectedDay].full}
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-8 space-y-5"
        >
          {lightClasses.length > 0 && (
            <div>
              <div className="mb-2 ml-1 flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${ROOM_LABELS.light.dot}`} />
                <span className="text-sm sm:text-base font-semibold tracking-wide text-ocean-100">
                  {ROOM_LABELS.light.name}
                </span>
              </div>
              <div className="space-y-2">
                {lightClasses.map((cls, i) => (
                  <motion.div
                    key={`l-${i}`}
                    className="glass-card flex items-center gap-3 rounded-xl p-3.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <div className="text-amber-300/80">{cls.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base text-white whitespace-normal break-words leading-snug">{cls.name}</p>
                      <p className="text-xs text-ocean-100/60 whitespace-normal break-words leading-snug">
                        {cls.type} · {cls.instructor}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 rounded-lg border border-white/15 bg-white/6 px-2.5 py-1.5 ring-1 ring-ocean-400/10">
                      <Clock size={14} className="text-white/90" />
                      <span className="text-base font-semibold text-white">{cls.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {greenClasses.length > 0 && (
            <div>
              <div className="mb-2 ml-1 flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${ROOM_LABELS.green.dot}`} />
                <span className="text-sm sm:text-base font-semibold tracking-wide text-ocean-100">
                  {ROOM_LABELS.green.name}
                </span>
              </div>
              <div className="space-y-2">
                {greenClasses.map((cls, i) => (
                  <motion.div
                    key={`g-${i}`}
                    className="glass-card flex items-center gap-3 rounded-xl p-3.5"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04 }}
                  >
                    <div className="text-emerald-400/80">{cls.icon}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base text-white whitespace-normal break-words leading-snug">{cls.name}</p>
                      <p className="text-xs text-ocean-100/60 whitespace-normal break-words leading-snug">
                        {cls.type} · {cls.instructor}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 rounded-lg border border-white/15 bg-white/6 px-2.5 py-1.5 ring-1 ring-ocean-400/10">
                      <Clock size={14} className="text-white/90" />
                      <span className="text-base font-semibold text-white">{cls.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <button
          className="mb-4 flex w-full items-center justify-between"
          onClick={() => setExtrasOpen(!extrasOpen)}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ocean-500/30 text-ocean-100">
              <Sparkles size={16} />
            </div>
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-ocean-100">
              Дополнительно
            </h2>
          </div>
          <motion.div
            animate={{ rotate: extrasOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-ocean-200/80"
          >
            <ChevronDown size={22} />
          </motion.div>
        </button>

        <motion.p
          className="mb-4 ml-1 text-sm text-ocean-200/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Запись по предварительной договорённости
        </motion.p>

        <AnimatePresence>
          {extrasOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-2.5 pb-2">
                {extras.map((extra, i) => (
                  <motion.div
                    key={extra.name}
                    className="glass-card flex items-start gap-3 rounded-xl p-3.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${extra.color} text-ocean-50`}
                    >
                      {extra.icon}
                    </div>
                    <div>
                      <p className="mb-0.5 text-base font-semibold text-white">{extra.name}</p>
                      <p className="text-sm leading-relaxed text-ocean-100/75">
                        {extra.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <FloatingBookingButton onClick={onBook} />
    </motion.div>
  );
}
