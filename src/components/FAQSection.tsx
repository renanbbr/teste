import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o SealClub?",
    answer: "O SealClub é um clube de membros que te dá acesso a produtos Apple e tecnologia de ponta a preço de custo. Você paga uma mensalidade e pode resgatar produtos pagando apenas o custo real, sem as margens abusivas do varejo tradicional."
  },
  {
    question: "Quais produtos estão disponíveis?",
    answer: "Oferecemos a linha completa da Apple (iPhone, MacBook, iPad, Apple Watch, AirPods) e produtos de marcas premium como JBL, DJI, Garmin, Polar, Motorola e muito mais. Nosso catálogo está em constante atualização com os últimos lançamentos."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas de cancelamento. Oferecemos total flexibilidade para nossos membros."
  },
  {
    question: "Como funciona o programa de trade-in?",
    answer: "Aceitamos seu aparelho usado como parte do pagamento na compra de um novo dispositivo. Avaliamos o valor do seu aparelho de forma justa e você pode usar esse crédito para fazer upgrade de tecnologia de forma mais acessível."
  },
  {
    question: "Quanto tempo demora a entrega?",
    answer: "Trabalhamos com frete grátis para todo o Brasil. O prazo de entrega varia de acordo com sua região, mas geralmente fica entre 7 a 15 dias úteis. Você receberá o código de rastreamento assim que o produto for despachado."
  },
  {
    question: "Há garantia dos produtos?",
    answer: "Sim! Todos os produtos possuem garantia completa do fabricante. Além disso, oferecemos suporte vitalício e aparelho reserva em caso de problemas, para que você nunca fique na mão."
  },
  {
    question: "Qual a diferença entre os planos?",
    answer: "O plano Basic oferece acesso aos produtos a preço de custo. O Premium adiciona descontos em acessórios e prioridade nas novidades. O Elite inclui todos os benefícios anteriores mais kit anual de acessórios premium e acesso antecipado aos lançamentos."
  },
  {
    question: "Como faço para me tornar membro?",
    answer: "É simples! Escolha o plano que melhor se encaixa no seu perfil, faça seu cadastro e comece a aproveitar todos os benefícios imediatamente. Você terá acesso ao catálogo completo assim que sua assinatura for confirmada."
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-400">
            Encontre respostas para as principais dúvidas sobre o SealClub
          </p>
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