import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Info,
  CalendarDays,
  Users,
  Banknote,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import MenuBlock from "../components/MenuBlock";

import logoOm from "../assets/Logos/White_Om_Shani_BGRFREE.png";
import logoTextMobile from "../assets/Logos/Text_white_mobgr.png";
import imgLila from "../assets/events/Lila.jpg";
import imgNailsMarathon from "../assets/events/Nails_Therapy_Marathon.jpg";
import imgOpenDay from "../assets/events/OpenDay.jpg";
import imgYogaDay from "../assets/events/YogaDay.jpg";

interface MenuPageProps {
  onNavigate: (path: string) => void;
}

const eventSlides = [
  {
    image: imgLila,
    title: "Сакральная Игра Лила",
    subtitle: "Играйте с нами",
    accent: "rgba(251,191,36,0.4)",
  },
  {
    image: imgNailsMarathon,
    title: "Марафон Гвоздетерапии",
    subtitle: "Совместная практика",
    accent: "rgba(74,222,128,0.4)",
  },
  {
    image: imgOpenDay,
    title: "День открытых дверей",
    subtitle: "Приходите знакомиться",
    accent: "rgba(96,165,250,0.4)",
  },
  {
    image: imgYogaDay,
    title: "День йоги",
    subtitle: "Празднуем вместе на природе",
    accent: "rgba(244,114,182,0.4)",
  },
];

export default function MenuPage({ onNavigate }: MenuPageProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % eventSlides.length;
        scrollCarouselTo(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollCarouselTo = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement;
    if (child) {
      el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  };

  // Track manual scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const children = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveSlide(closest);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="min-h-full flex flex-col items-center justify-center px-5 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtitle */}
      <motion.p
        className="text-ocean-100/80 text-sm sm:text-base tracking-[0.4em] uppercase mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Центр Йоги
      </motion.p>

      {/* Menu Grid */}
      <div className="w-full max-w-sm grid grid-cols-3 grid-rows-4 gap-3">
        {/* Row 1 */}
        <MenuBlock
          onClick={() => onNavigate("/about")}
          delay={0.1}
          icon={<Info size={28} />}
          label="О нас"
          size="small"
        />
        <MenuBlock
          onClick={() => onNavigate("/classes")}
          delay={0.15}
          icon={<CalendarDays size={28} />}
          label="Расписание"
          size="small"
        />
        {/* Контакты — tall block right side */}
        <MenuBlock
          onClick={() => onNavigate("/contact")}
          delay={0.2}
          icon={<MessageCircle size={28} />}
          label="Контакты"
          size="small"
          className="row-span-2 h-full"
        />

        {/* Row 2-3 — Center Logo Block (2 cols x 2 rows) */}
        <motion.div
          className="col-span-2 row-span-2 glass-strong rounded-2xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer pulse-glow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Logo */}
          <div className="relative flex flex-col items-center top-[-14px]">
            <img
              src={logoOm}
              alt="ОМ ШАНИ"
              className="w-48 h-40 sm:w-56 sm:h-56 object-contain"
            />

            {/* Name text (image) */}
            <img
              src={logoTextMobile}
              alt="Погружение в себя"
              className="-mt-6 h-9 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Row 3, col 3 — Цены */}
        <MenuBlock
          onClick={() => onNavigate("/prices")}
          delay={0.25}
          icon={<Banknote size={28} />}
          label="Цены"
          size="small"
        />

        {/* Row 4, col 1-2 — Инструкторы (wide) */}
        <MenuBlock
          onClick={() => onNavigate("/instructors")}
          delay={0.3}
          icon={<Users size={28} />}
          label="Инструкторы"
          size="small"
          className="col-span-2"
        />

        {/* Row 4, col 3 — Записаться CTA */}
        <motion.button
          className="relative rounded-2xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer w-full min-h-[96px] overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(95, 201, 184, 0.35) 0%, rgba(42, 157, 143, 0.45) 100%)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(136, 212, 196, 0.4)",
            boxShadow: "0 4px 30px rgba(42, 157, 143, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.6, delay: 0.35 },
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.35 },
            scale: { duration: 0.6, delay: 0.35 },
          }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate("/booking")}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          />
          <CalendarCheck size={28} className="text-ocean-50 relative z-10" />
          <span className="text-ocean-50 text-sm font-semibold tracking-wide relative z-10">
            Записаться
          </span>
        </motion.button>
      </div>

      {/* ── Events / Photos Carousel ── */}
      <motion.div
        className="w-full max-w-lg mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-ocean-100 text-sm sm:text-base font-semibold tracking-wide">
            Новости и события
          </p>
          <div className="flex gap-1.5">
            {eventSlides.map((_, i) => (
              <button
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSlide
                    ? "w-5 h-2 bg-ocean-300"
                    : "w-2 h-2 bg-ocean-300/25"
                }`}
                onClick={() => {
                  setActiveSlide(i);
                  scrollCarouselTo(i);
                }}
              />
            ))}
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {eventSlides.map((slide, i) => (
            <div key={i} className="snap-start shrink-0 w-[85vw] max-w-sm">
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="relative h-52 sm:h-60">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Accent glow */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-40"
                    style={{ background: slide.accent }}
                  />
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-base sm:text-lg font-semibold drop-shadow-md">
                      {slide.title}
                    </p>
                    <p className="text-white/70 text-xs sm:text-sm mt-1">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        className="text-ocean-100/40 text-xs sm:text-sm tracking-wider mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Магнитогорск, 2026 г
      </motion.p>
    </motion.div>
  );
}
