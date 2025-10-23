import { motion } from "framer-motion";

export const AnimatedLines = () => {
  return (
    <div className="absolute right-0 top-0 w-full h-full overflow-hidden pointer-events-none -z-5">
      {/* Linha 1 - Azul principal */}
      <motion.div
        className="absolute right-[10%] top-[10%] w-[600px] h-[600px]"
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          x: [100, 0, 100],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-transparent blur-3xl" />
      </motion.div>

      {/* Linha 2 - Ciano */}
      <motion.div
        className="absolute right-[5%] top-[30%] w-[500px] h-[500px]"
        initial={{ opacity: 0, x: 150 }}
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          x: [150, 50, 150],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-cyan-500/25 via-blue-400/20 to-transparent blur-2xl" />
      </motion.div>

      {/* Linha 3 - Azul escuro (profundidade) */}
      <motion.div
        className="absolute right-[15%] top-[50%] w-[400px] h-[400px]"
        initial={{ opacity: 0, x: 200 }}
        animate={{ 
          opacity: [0.15, 0.4, 0.15],
          x: [200, 100, 200],
          rotate: [0, 3, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600/15 via-cyan-600/15 to-transparent blur-3xl" />
      </motion.div>

      {/* Linha de destaque - mais intensa */}
      <motion.div
        className="absolute right-0 top-[20%] w-[3px] h-[400px] origin-top"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ 
          scaleY: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent blur-sm" />
      </motion.div>
    </div>
  );
};
