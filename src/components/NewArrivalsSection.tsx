import { ArrowRight, Smartphone, Watch, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewArrivalsSection = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 bg-white/10 text-white rounded-full font-medium mb-6">
            Novidades
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
            Últimos Lançamentos
            <span className="block bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Apple
            </span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            Descubra os produtos mais recentes da Apple com preços exclusivos para membros. 
            Tecnologia de ponta ao seu alcance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newArrivals.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-white text-black hover:bg-white/90 px-12 py-6 rounded-full text-xl font-semibold flex items-center gap-4 mx-auto">
            Ver Todos os Produtos
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  return (
    <div 
      className="group bg-gradient-to-br from-zinc-900/50 to-black/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md transform hover:-translate-y-4 transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="aspect-square overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
            Novo
          </span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
            {product.icon}
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
            {product.name}
          </h3>
        </div>
        
        <p className="text-white/70 leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>
        
        <Button className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black w-full py-3 rounded-xl transition-all duration-300">
          Saiba Mais
        </Button>
      </div>
    </div>
  );
};

const newArrivals = [
  {
    name: "iPhone 17 Pro Max 256GB",
    description: "O iPhone mais poderoso já criado. Com chip A17 Pro, sistema de câmeras profissional e design em titânio. Acesso exclusivo a preço de custo para membros.",
    image: "/lovable-uploads/iphone-17-pro-max.png",
    icon: <Smartphone className="w-5 h-5 text-white" />
  },
  {
    name: "Apple Watch Ultra 2",
    description: "O relógio mais robusto e capaz da Apple. Design resistente, bateria para aventuras extremas e funcionalidades avançadas de saúde e fitness.",
    image: "/lovable-uploads/apple-products-dashboard.jpg",
    icon: <Watch className="w-5 h-5 text-white" />
  },
  {
    name: "AirPods Pro (2ª geração)",
    description: "Cancelamento de ruído adaptativo, Áudio Espacial personalizado e até 6 horas de reprodução. A experiência sonora definitiva da Apple.",
    image: "/lovable-uploads/airpods-pro-2.jpg", 
    icon: <Headphones className="w-5 h-5 text-white" />
  },
  {
    name: "Drone DJI Mini 4 Pro Fly More Combo (Com tela)",
    description: "Performance extraordinária com chips M3 Pro ou M3 Max. Tela Liquid Retina XDR e até 22 horas de bateria. Para quem não aceita limitações.",
    image: "/lovable-uploads/macbook-air-m4.png",
    icon: <Smartphone className="w-5 h-5 text-white" />
  },
  {
    name: "iPad Pro 12.9\"",
    description: "O tablet mais avançado do mundo. Chip M2, tela Liquid Retina XDR e compatibilidade com Apple Pencil e Magic Keyboard. Poder ilimitado.",
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png",
    icon: <Smartphone className="w-5 h-5 text-white" />
  },
  {
    name: "AirTag Pack",
    description: "Nunca mais perca seus pertences. Tecnologia de localização precisa integrada ao app Buscar. Pack com 4 unidades para proteção completa.",
    image: "/lovable-uploads/b6436838-5c1a-419a-9cdc-1f9867df073d.png",
    icon: <Smartphone className="w-5 h-5 text-white" />
  }
];

export default NewArrivalsSection;
