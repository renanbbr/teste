import { motion } from "framer-motion";

export const AnimatedBlueRays = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base escura gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      
      {/* Camada de raios azuis - 3 raios principais */}
      <motion.div
        className="absolute -right-1/4 top-0 w-[150%] h-full"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Raio 1 - Principal (mais brilhante) */}
        <motion.div
          className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.2) 25%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Raio 2 - Secundário (mais claro) */}
        <motion.div
          className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.15) 25%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Raio 3 - Acento (mais distante) */}
        <motion.div
          className="absolute bottom-1/4 -right-1/3 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.1) 25%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>
      
      {/* Gradiente de proteção para o texto à esquerda */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
      
      {/* Vignette sutil nas bordas */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
};
