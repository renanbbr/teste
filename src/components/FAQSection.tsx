import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const faqs = [
  {
    question: "A assinatura do SealClub tem fidelidade mínima?",
    answer: "Sim. A assinatura é anual, garantindo acesso aos benefícios exclusivos durante todo o período. O compromisso mínimo é de 12 meses, vinculado ao uso dos benefícios do plano escolhido."
  },
  {
    question: "Existe limite de produtos que posso comprar com preço de custo?",
    answer: "Sim. Cada plano prevê cotas anuais por categoria. Por exemplo, você pode adquirir até 1 iPhone, 1 Apple Watch, 1 JBL, etc., por ano. Essa regra mantém o clube justo e sustentável para todos."
  },
  {
    question: "Quando posso começar a usar os benefícios após assinar?",
    answer: "O acesso aos benefícios é imediato após a confirmação da assinatura. Você já pode aproveitar as vantagens sem precisar esperar carência."
  },
  {
    question: "Os benefícios do clube podem ser transferidos para outra pessoa?",
    answer: "Não. O uso dos benefícios e dos produtos adquiridos pelo clube é pessoal e intransferível."
  },
  {
    question: "Como funciona o cancelamento dentro dos 7 dias?",
    answer: "Você pode cancelar sua assinatura dentro de 7 dias após a contratação, de acordo com o Código de Defesa do Consumidor — caso já tenha efetuado a compra ela será cancelada também junto a assinatura. Basta solicitar o cancelamento pelo nosso canal oficial."
  },
  {
    question: "Posso cancelar depois de usar algum benefício?",
    answer: "Após utilizar algum benefício (ex: comprar um produto com preço de custo), não é mais possível cancelar de imediato. Sua assinatura segue ativa até o fim do ciclo anual contratado, garantindo que o acesso privilegiado permaneça justo para todos os membros."
  }
];

const FAQSection = () => {
  return (
    <section className="container px-4 py-20 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Regras do jogo.
            <span className="block text-3xl md:text-4xl font-normal text-white/90 mt-2">
              E é exatamente isso que torna o SealClub seguro, exclusivo e confiável.
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A proposta do SealClub não é vender em massa. É oferecer acesso controlado, com benefícios reais — por isso, nós levamos as regras a sério.
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-8 mb-6">
            <Checkbox 
              id="faq-checkbox" 
              defaultChecked 
              disabled
              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <Label 
              htmlFor="faq-checkbox" 
              className="text-base text-white font-medium cursor-pointer"
            >
              FAQ - Perguntas Frequentes
            </Label>
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg px-6 bg-white/5 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left text-white hover:text-white/80 py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQSection;