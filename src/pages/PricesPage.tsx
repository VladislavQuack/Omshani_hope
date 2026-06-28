import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  User,
  Sunrise,
  GraduationCap,
  Heart,
  Clock,
  Ticket,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import FloatingBookingButton from "../components/FloatingBookingButton";

interface PricesPageProps {
  onBack: () => void;
  onBook: () => void;
}

const groupStandard = {
  label: "Стандартное групповое занятие",
  description: "Полная стоимость · любое групповое занятие",
  price: "650",
  duration: "1-1,5 часа",
};

const preferentialSessions = [
  {
    label: "Утреннее посещение",
    description: "Для утренних посетителей · до 11:00",
    price: "550",
    duration: "1-1,5 часа",
    icon: <Sunrise size={12} />,
    color: "text-amber-300/80",
  },
  {
    label: "Студенческое посещение",
    description: "При наличии студенческого билета",
    price: "550",
    duration: "1-1,5 часа",
    icon: <GraduationCap size={12} />,
    color: "text-sky-300/80",
  },
  {
    label: "Льготное посещение",
    description: "Для пенсионеров",
    price: "550",
    duration: "1-1,5 часа",
    icon: <Heart size={12} />,
    color: "text-rose-300/80",
  },
];

const individualSession = {
  label: "Индивидуальное занятие",
  description: "Персональная практика с инструктором",
  price: "2200",
  duration: "1 час",
};

const passes = [
  {
    name: "ОМ 10",
    target: "10 занятий",
    details: "Самый наполненный абонимент",
    price: 4800,
    popular: true,
  },
  {
    name: "ОМ 5",
    target: "5 занятий",
    details: "Удобный формат для ознакомления",
    price: 2600,
    popular: false,
  },
  {
    name: "ОМ Добрый",
    target: "10 занятий (1 час)",
    details: "Начало практик до 12:00 и после 20:00",
    price: 3800,
    popular: false,
  },
  {
    name: "ОМ Студенческий",
    target: "10 занятий",
    details: "Льготный формат для студентов",
    price: 3800,
    popular: false,
    badge: "льготный",
  },
  {
    name: "ОМ Пенсионный",
    target: "10 занятий",
    details: "Мягкий льготный формат с комфортной стоимостью",
    price: 3800,
    popular: false,
    badge: "льготный",
  },
  {
    name: "ОМ Йога Мудра",
    target: "10 занятий",
    details: "Абонимент с доступом на лечебные практики 'Йога Мудра'",
    price: 3800,
    popular: false,
  },
  {
    name: "ШАНИ 5",
    target: "5 индивидуальных занятий",
    details: "Для тех, кому нужен личный ритм и персональное сопровождение",
    price: 8500,
    popular: false,
  },
];

export default function PricesPage({ onBack, onBook }: PricesPageProps) {
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
        Цены
      </motion.h1>
      <motion.div
        className="mb-3 h-0.5 w-12 bg-ocean-400/50"
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      <motion.p
        className="mb-8 text-sm sm:text-base text-ocean-100/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        Первое пробное занятие — бесплатно
      </motion.p>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ocean-500/30 text-ocean-200">
            <Clock size={14} />
          </div>
          <h2 className="text-lg font-light tracking-wide text-ocean-100">
            Разовые занятия
          </h2>
        </div>

        <div className="mb-5">
          <div className="mb-2.5 ml-1 flex items-center gap-2">
            <Users size={12} className="text-ocean-300/70" />
                <span className="text-xs sm:text-sm uppercase tracking-wider text-ocean-100/80">
                  Групповое · стандарт
                </span>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base text-white">{groupStandard.label}</p>
                <p className="mt-0.5 text-xs text-ocean-100/70">
                  {groupStandard.description}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xl font-light text-white">
                  {groupStandard.price}
                  <span className="ml-0.5 text-xs text-ocean-100/70">₽</span>
                </p>
                <p className="text-xs text-ocean-100/70">{groupStandard.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-2.5 ml-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-ocean-300/70" />
                <span className="text-xs sm:text-sm uppercase tracking-wider text-ocean-100/80">
                  Льготные условия
                </span>
            </div>
            <span className="rounded-full border border-ocean-300/20 bg-ocean-400/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-ocean-200/80">
              льготные
            </span>
          </div>

          <div
            className="rounded-2xl p-1"
            style={{
              background:
                "linear-gradient(135deg, rgba(95, 201, 184, 0.14) 0%, rgba(42, 157, 143, 0.08) 100%)",
              border: "1px solid rgba(136, 212, 196, 0.18)",
              boxShadow: "0 8px 30px rgba(42, 157, 143, 0.08)",
            }}
          >
            <div className="glass-card rounded-[14px] overflow-hidden">
              <div className="border-b border-white/5 px-3.5 py-2.5">
                <p className="text-xs leading-relaxed text-ocean-100/70">
                  Льготные разовые посещения действуют для студентов, пенсионеров
                  и утренних посетителей.
                </p>
              </div>
              {preferentialSessions.map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`flex items-center gap-3 p-3.5 ${
                    i !== preferentialSessions.length - 1 ? "border-b border-white/5" : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                >
                  <div className={`mt-0.5 ${item.color}`}>{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-base text-white">{item.label}</p>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wide text-ocean-100/80">
                        льготные
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-ocean-100/70">
                      {item.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-light text-white">
                      {item.price}
                      <span className="ml-0.5 text-xs text-ocean-100/70">₽</span>
                    </p>
                    <p className="text-xs text-ocean-100/70">{item.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2.5 ml-1 flex items-center gap-2">
            <User size={14} className="text-ocean-200/80" />
            <span className="text-xs sm:text-sm uppercase tracking-wider text-ocean-100/80">
              Индивидуальное
            </span>
          </div>
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base text-white">{individualSession.label}</p>
                <p className="mt-0.5 text-xs text-ocean-100/70">
                  {individualSession.description}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xl font-light text-white">
                  {individualSession.price}
                  <span className="ml-0.5 text-xs text-ocean-100/70">₽</span>
                </p>
                <p className="text-xs text-ocean-100/70">{individualSession.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ocean-500/30 text-ocean-200">
            <Ticket size={14} />
          </div>
          <h2 className="text-lg font-light tracking-wide text-ocean-100">
            Абонементы
          </h2>
        </div>

        <div className="mb-4 glass-card rounded-2xl p-3.5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-ocean-200/80">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm text-ocean-100/90">
                Все абонементы действуют <span className="text-white font-semibold">5 недель</span>.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ocean-100/70">
                Они различаются по типу занятий и формату посещения, а не по «заполненности».
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {passes.map((pass, i) => (
            <motion.div
              key={pass.name}
              className="relative overflow-hidden rounded-2xl p-4 glass-card"
              style={
                pass.popular
                  ? {
                      background:
                        "linear-gradient(135deg, rgba(95, 201, 184, 0.12) 0%, rgba(42, 157, 143, 0.08) 100%)",
                      border: "1px solid rgba(136, 212, 196, 0.36)",
                      boxShadow: "0 4px 24px rgba(42, 157, 143, 0.14)",
                    }
                  : undefined
              }
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58 + i * 0.06 }}
            >
              {pass.popular && (
                <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-ocean-400/80 to-ocean-500/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-white">
                  хит
                </div>
              )}

              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="text-lg font-medium tracking-wide text-white">
                      {pass.name}
                    </h3>
                    {pass.badge && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs uppercase tracking-wide text-ocean-100/80">
                        {pass.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ocean-100/80">{pass.target}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-2xl font-light text-white">
                    {pass.price.toLocaleString("ru-RU")}
                    <span className="ml-0.5 text-xs text-ocean-100/80">₽</span>
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-white/10 pt-2.5">
                <p className="text-xs leading-relaxed text-ocean-100/80">
                  {pass.details}
                </p>
                <div className="flex items-center justify-between text-xs text-ocean-100/70">
                  <span>Срок действия</span>
                  <span>5 недель</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <FloatingBookingButton onClick={onBook} />
    </motion.div>
  );
}
