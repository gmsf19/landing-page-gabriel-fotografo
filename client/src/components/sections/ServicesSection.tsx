import { Heart, Users, Baby, Camera, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Heart,
    title: "Casamentos",
    description:
      "Registros completos do seu dia especial com emoção e autenticidade. Cada momento, cada olhar, cada lágrima de felicidade eternizados.",
  },
  {
    icon: Users,
    title: "Ensaios de Casal",
    description:
      "Momentos íntimos e românticos capturados com sensibilidade. Celebre o amor de vocês em imagens que contam a história única do casal.",
  },
  {
    icon: Baby,
    title: "Gestantes",
    description:
      "A doce espera capturada com delicadeza e afeto. Registre a beleza da maternidade e a expectativa do maior amor do mundo.",
  },
  {
    icon: Sparkles,
    title: "Família",
    description:
      "Memórias afetivas que atravessam gerações. Celebre os laços familiares em fotografias cheias de amor e conexão.",
  },
  {
    icon: Camera,
    title: "Eventos",
    description:
      "Celebrações registradas com profissionalismo e sensibilidade. Aniversários, formaturas e momentos especiais preservados para sempre.",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-20 md:py-10 bg-secondary/30">
      <div className="container">
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Serviços
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Especializado em capturar os momentos mais importantes da sua vida
            com arte, emoção e técnica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
