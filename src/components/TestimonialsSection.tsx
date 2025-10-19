"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Alex P.",
    role: "Membro Prime desde 2023",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop&q=80",
    content: "Mudar para o SealClub foi a melhor decisão financeira que fiz relacionada à tecnologia. A economia é real, e o acesso aos lançamentos é surreal. Indico de olhos fechados!"
  },
  {
    name: "Bruna S.",
    role: "Membro Ultra desde 2022",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=100&h=100&fit=crop&q=80",
    content: "O atendimento é outro nível! Tive uma dúvida sobre meu MacBook e o consultor resolveu na hora. Fora a economia, claro!"
  },
  {
    name: "Carlos M.",
    role: "Membro Start desde 2024",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop&q=80",
    content: "Finalmente consegui ter o iPhone do ano sem vender um rim! O SealClub é revolucionário."
  },
  {
    name: "Fernanda L.",
    role: "Membro Prime desde 2023",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop&q=80",
    content: "Já indiquei pra todos os meus amigos. Acesso a produtos de ponta com preço justo e ainda com benefícios exclusivos. Não tem como ser melhor."
  },
  {
    name: "Ricardo G.",
    role: "Membro Ultra desde 2022",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&q=80",
    content: "Como fotógrafo, preciso estar sempre com os melhores equipamentos. O SealClub facilitou demais minha vida e meu bolso!"
  },
  {
    name: "Juliana A.",
    role: "Membro Start desde 2023",
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=100&h=100&fit=crop&q=80",
    content: "Achei que era bom demais pra ser verdade, mas é real! Já estou no meu segundo ano e super satisfeita."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden bg-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">O que nossos membros dizem</h2>
          <p className="text-muted-foreground text-lg">
            Milhares de brasileiros já estão economizando com o SealClub
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-black/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-white/90">{testimonial.name}</h4>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;