import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Leaf, Waves, ChevronLeft, ChevronRight } from "lucide-react";

import groupPracticeImg from "../assets/Gallery/groupPractice.jpg";
import dayYogaImg from "../assets/Gallery/YogaDay.jpg";
import kidsPracticeImg from "../assets/Gallery/ChildPractice.jpg";
import greenHallImg from "../assets/Gallery/GreenHall.jpg";
import naturePracticeImg from "../assets/Gallery/NaturePractice.jpg";
import lightHallImg from "../assets/Gallery/LightHall.jpg";

interface AboutPageProps {
  onBack: () => void;
}

const galleryImages = [
  {
    url: groupPracticeImg,
    alt: "Групповая практика",
    caption: "Групповая практика",
  },
  {
    url: dayYogaImg,
    alt: "День йоги",
    caption: "День йоги",
  },
  {
    url: kidsPracticeImg,
    alt: "Детская практика",
    caption: "Детская практика",
  },
  {
    url: greenHallImg,
    alt: "Зеленый зал",
    caption: "Зеленый зал",
  },
  {
    url: naturePracticeImg,
    alt: "Практика на природе",
    caption: "Практика на природе",
  },
  {
    url: lightHallImg,
    alt: "Светлый зал",
    caption: "Светлый зал",
  },
];

export default function AboutPage({ onBack }: AboutPageProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: <Waves size={20} />,
      title: "Гармония",
      desc: "Баланс тела, разума и духа через практику йоги",
    },
    {
      icon: <Heart size={20} />,
      title: "Забота",
      desc: "Индивидуальный подход к каждому практикующему",
    },
    {
      icon: <Leaf size={20} />,
      title: "Природа",
      desc: "Единение с собой и окружающим миром",
    },
  ];

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, galleryImages.length - 1));
    setActiveIdx(clamped);
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[clamped] as HTMLElement;
    if (child) {
      el.scrollTo({ left: child.offsetLeft - 20, behavior: "smooth" });
    }
  };

  // Track scroll position for active dot
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const children = Array.from(el.children) as HTMLElement[];
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft - 20 - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="min-h-full px-5 py-6 pb-20"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.button
        className="flex items-center gap-2 text-ocean-300/70 mb-6"
        onClick={onBack}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={18} />
        <span className="text-sm tracking-wide">Назад</span>
      </motion.button>

      <motion.h1
        className="text-2xl font-light text-ocean-50 mb-2 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        О нас
      </motion.h1>
      <motion.div
        className="w-12 h-0.5 bg-ocean-400/50 mb-6"
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Description */}
      <motion.div
        className="glass-card rounded-2xl p-5 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-ocean-100/80 text-sm leading-relaxed mb-3">
          Мы - центр йога-терапии <span className="text-ocean-200 font-medium">Ом Шани</span> в Магнитогорске. Находимся по адресу Магнитогорск, ул.Доменщиков 15.
        </p>

        <p className="text-ocean-100/60 text-sm leading-relaxed">
          В нашем центре вас ждут практики по хатха-йоге, йогатерапии спины, 
          йоге-мудре и многое другое. 
          Так же к вашим услугам наши специалисты по ведической астрологии, 
          нумерологии и таро. Помимо этого, готовы вам предложить великолепный 
          массаж и практику гвоздестояния.
        </p>

        <div className="mt-4 px-4 py-3 glass-card rounded-2xl">
          <p className="text-center text-ocean-100/90 text-base sm:text-lg leading-relaxed italic drop-shadow-md">
            «Меняя своё тело, ты меняешь пространство вокруг себя!»
          </p>
        </div>
      </motion.div>

      {/* ── Gallery Carousel ── */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-light text-ocean-200 tracking-wide">
            Галерея
          </h2>
          <div className="flex items-center gap-1">
            <button
              className="w-7 h-7 rounded-full glass flex items-center justify-center text-ocean-200 active:scale-90 transition-transform"
              onClick={() => scrollTo(activeIdx - 1)}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className="w-7 h-7 rounded-full glass flex items-center justify-center text-ocean-200 active:scale-90 transition-transform"
              onClick={() => scrollTo(activeIdx + 1)}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[75vw] max-w-xs"
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  {/* Gradient overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white text-xs font-medium drop-shadow-md">
                    {img.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-5 h-1.5 bg-ocean-300"
                  : "w-1.5 h-1.5 bg-ocean-300/30"
              }`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* Values */}
      <motion.h2
        className="text-lg font-light text-ocean-200 mb-3 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Наши ценности
      </motion.h2>

      <div className="space-y-3">
        {values.map((value, i) => (
          <motion.div
            key={value.title}
            className="glass-card rounded-xl p-4 flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.1 }}
          >
            <div className="text-ocean-300 mt-0.5">{value.icon}</div>
            <div>
              <h3 className="text-ocean-100 text-sm font-medium mb-1">{value.title}</h3>
              <p className="text-ocean-100/50 text-xs leading-relaxed">{value.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-ocean-300/40 text-xs italic leading-relaxed">
          «Йога — это путешествие себя, через себя, к себе»
        </p>
        <p className="text-ocean-300/25 text-[10px] mt-1">— Бхагавад-гита</p>
      </motion.div>
    </motion.div>
  );
}
