import { Smartphone, Plane, Headphones, Laptop, Bike, Speaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonHard2 } from "@/components/ui/button-hard2";
const NewArrivalsSection = () => {
  return <section className="py-12 md:py-20 lg:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex justify-center mb-6">
            <ButtonHard2 className="text-sm px-4 py-2 bg-transparent">
              O que você paga hoje VS o que pagaria como membro do SealClub
            </ButtonHard2>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-8 tracking-tight leading-tight">
            A diferença é tão absurda que parece mentira.
            
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Com o mesmo produto, da mesma marca, com a mesma garantia…
            <span className="block mt-1.5">você pode economizar centenas ou milhares de reais.</span>
            <span className="block font-semibold text-white/90 mt-1.5">Todos os anos.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newArrivals.map((product, index) => <ProductCard key={index} product={product} index={index} />)}
        </div>

        <p className="text-center text-xs text-white/50 mt-8 max-w-2xl mx-auto">
          Valores sujeitos a alteração. Consulte sempre o preço atualizado antes do resgate.
        </p>

      </div>
    </section>;
};
const ProductCard = ({
  product,
  index
}: {
  product: any;
  index: number;
}) => {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <div className="group bg-gradient-to-br from-zinc-900/50 to-black/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md transform hover:-translate-y-4 transition-all duration-500 hover:border-white/20 hover:shadow-2xl" style={{
    animationDelay: `${index * 0.1}s`
  }}>
      <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
        {product.isNew && <div className="absolute top-4 left-4 z-20">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-sm font-medium rounded-full border border-white/20">
              Novo
            </span>
          </div>}
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
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Varejo</span>
            <span className="text-base font-semibold text-white">
              {product.retailPrice}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">SealClub</span>
            <span className="text-base font-bold text-blue-400">
              {product.sealClubPrice}
            </span>
          </div>
          
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">Economia</span>
              <span className="text-base font-bold text-green-400">
                {product.savings}
              </span>
            </div>
          </div>
        </div>
        
        <Button onClick={scrollToPricing} className="bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black w-full py-3 rounded-xl transition-all duration-300">
          Quero Aproveitar
        </Button>
      </div>
    </div>;
};
const newArrivals = [{
  name: "iPhone 17 Pro Max 256GB",
  retailPrice: "R$ 11.249",
  sealClubPrice: "R$ 9.498",
  savings: "R$ 1.751",
  image: "/lovable-uploads/iphone-17-pro-max.png",
  icon: <Smartphone className="w-5 h-5 text-white" />,
  isNew: true
}, {
  name: "Drone DJI Mini 5 Pro Fly More Combo (Com tela)",
  retailPrice: "R$ 12.390",
  sealClubPrice: "R$ 9.321",
  savings: "R$ 3.069",
  image: "/lovable-uploads/dji-mini-4-pro.png",
  icon: <Plane className="w-5 h-5 text-white" />,
  isNew: true
}, {
  name: "AirPods Pro (2ª geração)",
  retailPrice: "R$ 2.599",
  sealClubPrice: "R$ 2.189,15",
  savings: "R$ 409,85",
  image: "/lovable-uploads/airpods-pro-2.png",
  icon: <Headphones className="w-5 h-5 text-white" />
}, {
  name: "MacBook Air M4 16GB 256SDD",
  retailPrice: "R$ 9.498",
  sealClubPrice: "R$ 6.598",
  savings: "R$ 2.900",
  image: "/lovable-uploads/macbook-air-m4.png",
  icon: <Laptop className="w-5 h-5 text-white" />
}, {
  name: "Bike Elétrica V9 Plus",
  retailPrice: "R$ 9.800",
  sealClubPrice: "R$ 7.563",
  savings: "R$ 2.237",
  image: "/lovable-uploads/bike-v9-plus.png",
  icon: <Bike className="w-5 h-5 text-white" />
}, {
  name: "Boombox 3 Wi-fi",
  retailPrice: "R$ 2.469",
  sealClubPrice: "R$ 1.992",
  savings: "R$ 477",
  image: "/lovable-uploads/jbl-boombox-3.png",
  icon: <Speaker className="w-5 h-5 text-white" />
}];
export default NewArrivalsSection;