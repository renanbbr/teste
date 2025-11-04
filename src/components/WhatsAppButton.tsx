import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/53991963971"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 
                 bg-[#25D366] hover:bg-[#20BA5A] 
                 text-white rounded-full 
                 w-14 h-14 md:w-16 md:h-16
                 flex items-center justify-center
                 shadow-2xl hover:shadow-[#25D366]/50
                 transition-all duration-300
                 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 1, 
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </motion.a>
  );
};
