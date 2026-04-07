import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          O QUE UMA <span className="text-purple-500">MÁQUINA</span> DEVE FAZER?
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl mb-8 leading-relaxed">
          Bem-vindo à Moral Machine. Explore dilemas éticos enfrentados por veículos autônomos e ajude a moldar o futuro da inteligência artificial.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/judge"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all transform hover:scale-105"
          >
            COMEÇAR JULGAMENTO
          </Link>
          <Link
            to="/results"
            className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold rounded-full transition-all"
          >
            VER RESULTADOS
          </Link>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] z-[-1]" />
    </div>
  );
}
