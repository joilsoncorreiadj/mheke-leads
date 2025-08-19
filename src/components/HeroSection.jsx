import { motion } from "framer-motion";

export default function HeroSection({ onStart }) {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">      
          Sua marca merece mais do que <span className="text-highlight">likes</span>. Ela merece <span className="text-highlight">estratégia</span>.
        </h1>

        <motion.div 
          className="w-full lg:max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Responda ao questionário e concorra a uma análise gratuita com a nossa estrategista. Descubra o que está travando o crescimento da sua marca — e como mudar isso agora.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={onStart}
            className="btn-primary text-base sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            👉 Quero minha análise gratuita
          </button>
        </motion.div>
      </div>
    </section>
  );
}