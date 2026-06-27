import { motion } from "framer-motion";
import { ArrowLeft, Award, BookOpen } from "lucide-react";

interface InstructorsPageProps {
  onBack: () => void;
}

export default function InstructorsPage({ onBack }: InstructorsPageProps) {
  const instructors = [
    {
      name: "Байбулатов Рубен",
      role: "Основатель центра",
      specialty: "Йогатерапия, Йога-Мудра",
      experience: "15 лет практики",
      description: "",
      initials: "БР",
      color: "#2a9d8f",
    },
    {
      name: "Караваева Наталья",
      role: "Старший инструктор",
      specialty: "Хатха",
      experience: "12 лет практики",
      description: "",
      initials: "КН",
      color: "#1a7a7a",
    },
    {
      name: "Долгушева Мария",
      role: "Инструктор",
      specialty: "",
      experience: "8 лет практики",
      description: "",
      initials: "ДМ",
      color: "#3db5a8",
    },
    {
      name: "Ефимова Светлана",
      role: "Инструктор",
      specialty: "Йога-Фитнес",
      experience: "10 лет практики",
      description: "",
      initials: "ЕС",
      color: "#125a66",
    },
    
  ];

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
        Инструкторы
      </motion.h1>
      <motion.div
        className="w-12 h-0.5 bg-ocean-400/50 mb-6"
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      <div className="space-y-4">
        {instructors.map((instructor, i) => (
          <motion.div
            key={instructor.name}
            className="glass-card rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0"
                style={{ backgroundColor: instructor.color }}
              >
                {instructor.initials}
              </div>
              <div>
                <h3 className="text-ocean-50 text-sm font-medium">{instructor.name}</h3>
                <p className="text-ocean-300/60 text-xs">{instructor.role}</p>
              </div>
            </div>

            <p className="text-ocean-100/60 text-xs leading-relaxed mb-3">
              {instructor.description}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-ocean-300/70 bg-ocean-800/40 px-2 py-1 rounded-full">
                <Award size={10} />
                {instructor.experience}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-ocean-300/70 bg-ocean-800/40 px-2 py-1 rounded-full">
                <BookOpen size={10} />
                {instructor.specialty}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
