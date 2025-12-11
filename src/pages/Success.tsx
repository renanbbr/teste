import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation"; // Se tiver a nav
import Footer from "@/components/Footer"; // Se tiver o footer

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Se quiser a barra de navegação, descomente a linha abaixo */}
      {/* <Navigation /> */}

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 text-center space-y-6"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Pagamento Confirmado!
            </h1>
            <p className="text-gray-400">
              Sua assinatura foi ativada com sucesso. Você já faz parte do SealClub.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Button 
              onClick={() => navigate("/")} 
              className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12"
            >
              Acessar Plataforma
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="w-full text-gray-400 hover:text-white"
            >
              Voltar ao início
            </Button>
          </div>
        </motion.div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Success;