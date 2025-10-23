import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Gift, Download } from "lucide-react";

const chartData = [
  { month: 'Jan', value: 8 },
  { month: 'Fev', value: 5 },
  { month: 'Mar', value: 7 },
  { month: 'Abr', value: 4 },
  { month: 'Mai', value: 6 },
  { month: 'Jun', value: 5 },
];

export const AppleProductsSection = () => {
  const totalBenefits = 144;
  const usedBenefits = 28;
  const usagePercentage = Math.round((usedBenefits / totalBenefits) * 100);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl text-white">👤</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  Welcome back, sealstoree! <span>👋</span>
                </h2>
                <p className="text-muted-foreground">
                  Confira o resumo da sua conta SealClub
                </p>
              </div>
            </div>
            <Button variant="outline" className="glass glass-hover gap-2">
              <Calendar className="w-4 h-4" />
              Janeiro 2024 - Junho 2024
            </Button>
          </div>

          {/* Virtual Card Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Seu cartão virtual está aqui
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
              <Card className="glass p-12 flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-4xl font-bold text-white tracking-wider">SEALCLUB</h4>
                  <p className="text-2xl font-semibold text-white/80 tracking-wider">ULTRA</p>
                </div>
              </Card>
              <Card className="glass p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm">💎</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">Membro</p>
                    <p className="text-xl font-bold text-white">sealstoree</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">Membro</p>
                    <p className="text-lg font-mono text-white">#3551033889</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">Válido até</p>
                    <p className="text-lg font-semibold text-white">10/2026</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg rounded-2xl">
                Trocar de Plano
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Benefits Section */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Benefícios Utilizados</h3>
                <Button variant="outline" size="sm" className="glass glass-hover gap-2">
                  <Download className="w-4 h-4" />
                  Relatório
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="glass p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Este Mês</p>
                  <p className="text-4xl font-bold text-white mb-2">5</p>
                  <p className="text-sm text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5%
                  </p>
                </Card>

                <Card className="glass p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Total no Ano</p>
                  <p className="text-4xl font-bold text-white mb-2">28</p>
                  <p className="text-xs text-muted-foreground">de 144 disponíveis</p>
                </Card>

                <Card className="glass p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Média Mensal</p>
                  <p className="text-4xl font-bold text-white mb-2">4</p>
                  <p className="text-xs text-muted-foreground">benefícios/mês</p>
                </Card>

                <Card className="glass p-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Disponíveis</p>
                  <p className="text-4xl font-bold text-primary mb-2">116</p>
                  <p className="text-xs text-muted-foreground">restantes este ano</p>
                </Card>
              </div>

              {/* Chart */}
              <Card className="glass p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="rgba(255,255,255,0.5)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.5)"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Usage Status */}
              <Card className="glass p-8">
                <h3 className="text-xl font-bold text-white mb-6">Status de Utilização</h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <svg className="transform -rotate-90 w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 88}`}
                        strokeDashoffset={`${2 * Math.PI * 88 * (1 - usagePercentage / 100)}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-5xl font-bold text-white">{usedBenefits}</p>
                      <p className="text-sm text-muted-foreground">de {totalBenefits}</p>
                    </div>
                  </div>
                  <div className="text-center space-y-3 w-full">
                    <div>
                      <p className="text-3xl font-bold text-primary mb-1">{usagePercentage}%</p>
                      <p className="text-sm text-muted-foreground">Utilizado este ano</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm text-green-400 flex items-center justify-center gap-2">
                        <Gift className="w-4 h-4" />
                        Em dia com resgates
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Current Plan */}
              <Card className="glass p-6">
                <h3 className="text-xl font-bold text-white mb-4">Plano Atual</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-lg font-bold text-primary mb-1">SEALCLUB ULTRA</p>
                    <p className="text-sm text-muted-foreground">144 benefícios/ano</p>
                  </div>
                  <Button variant="outline" className="w-full glass-hover">
                    Ver Detalhes do Plano
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppleProductsSection;