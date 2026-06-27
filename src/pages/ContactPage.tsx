import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, Camera } from "lucide-react";

interface ContactPageProps {
  onBack: () => void;
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const contacts = [
    {
      icon: <MapPin size={16} />,
      label: "Адрес",
      value: "ул. Доменщиков, 15, Магнитогорск",
    },
    {
      icon: <Phone size={16} />,
      label: "Телефон",
      value: "+7 (909) 096-88-87",
    },
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: "omshani108@gmail.com",
    },
    {
      icon: <Clock size={16} />,
      label: "Часы работы",
      value: null as string | null,
      hours: {
        line1: "Пн–Пт: 09:00-13:00, 16:00-21:00",
        line2: "Сб–Вс: 09:00-12:00",
      },
    },
  ] as const;

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
        className="text-2xl font-light text-ocean-50 mb-2 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Контакты
      </motion.h1>
      <motion.div
        className="w-12 h-0.5 bg-ocean-400/50 mb-6"
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Contact info cards */}
      <div className="space-y-3 mb-6">
        {contacts.map((contact, i) => (
          <motion.div
            key={contact.label}
            className="glass-card rounded-xl p-3 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <div className="text-ocean-300">{contact.icon}</div>
            <div>
              <p className="text-ocean-100/40 text-[10px] uppercase tracking-wider">{contact.label}</p>

              {"hours" in contact && contact.hours ? (
                <div className="text-ocean-100 text-sm leading-relaxed">
                  <p>{contact.hours.line1}</p>
                  <p>{contact.hours.line2}</p>
                </div>
              ) : (
                <p className="text-ocean-100 text-sm">{contact.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-ocean-200 text-sm font-medium mb-3 tracking-wide">Мы в соцсетях</h2>
        <div className="flex gap-3">
          <motion.a
            href="https://vk.com/omshani"
            target="_blank"
            rel="noreferrer noopener"
            className="glass-card rounded-xl p-3 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera size={18} className="text-ocean-300" />
            <span className="text-ocean-100 text-xs">vk.com/omshani</span>
          </motion.a>
          <motion.a
            href="https://t.me/omshani_mgn"
            target="_blank"
            rel="noreferrer noopener"
            className="glass-card rounded-xl p-3 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={18} className="text-ocean-300" />
            <span className="text-ocean-100 text-xs">t.me/omshani_mgn</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Map */}
      <motion.div
        className="glass-card rounded-2xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-ocean-200 text-sm font-medium mb-3 tracking-wide">Как нас найти</h2>
        <div className="w-full h-64 rounded-xl overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=58.964113%2C53.371467&z=16&pt=58.964113%2C53.371467%2Cpm2rdm"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Карта проезда"
            className="rounded-xl"
          />
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-ocean-300/40 text-xs">
          Ждём вас на практике!
        </p>
      </motion.div>
    </motion.div>
  );
}
