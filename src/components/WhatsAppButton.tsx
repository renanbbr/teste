import { motion } from "framer-motion";

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/53991963971"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'whatsapp_click',
          button_location: 'floating_button',
          click_url: 'https://wa.me/53991963971',
          page_url: window.location.href
        });
      }}
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
      <img 
        src="/partner-logos/whatsapp-logo.png" 
        alt="WhatsApp" 
        className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform"
      />
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </motion.a>
  );
};
