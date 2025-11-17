import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import bgDesk1 from "@/assets/heroSectionDesktop/bg-desk-1.webp";
import bgDesk2 from "@/assets/heroSectionDesktop/bg-desk-2.webp";
import bgDesk3 from "@/assets/heroSectionDesktop/bg-desk-3.webp";
import bgDesk4 from "@/assets/heroSectionDesktop/bg-desk-4.webp";
import bgDesk5 from "@/assets/heroSectionDesktop/bg-desk-5.webp";

import bgMob1 from "@/assets/herosectionMobile/bg-mob-1.webp";
import bgMob2 from "@/assets/herosectionMobile/bg-mob-2.webp";
import bgMob3 from "@/assets/herosectionMobile/bg-mob-3.webp";
import bgMob4 from "@/assets/herosectionMobile/bg-mob-4.webp";
import bgMob5 from "@/assets/herosectionMobile/bg-mob-5.webp";

import logoWhite from "@/assets/logo-large-white.png";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageMobIndex, setCurrentImageMobIndex] = useState(0);

  const backgroundImages = [bgDesk1, bgDesk2, bgDesk3, bgDesk4, bgDesk5];

  const backgroundImagesMob = [bgMob1, bgMob2, bgMob3, bgMob4, bgMob5];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % backgroundImages.length
      );

      setCurrentImageMobIndex(prevIndex =>
        prevIndex === 4 ? 0 : prevIndex + 1
      );
    }, 5000); // Troca a cada 5 segundos
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden z-0"
    >
      {/* Background Images with Carousel Effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`hidden lg:block absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover lg:bg-center bg-no-repeat bg-position-[-58px]"
              style={{
                backgroundImage: `url('${image}')`,
              }}
            />
          </div>
        ))}
        {backgroundImagesMob.map((image, index) => (
          <div
            key={index}
            className={`lg:hidden absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageMobIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover lg:bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${image}')`,
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <img
          src={logoWhite}
          alt=""
          className="mx-auto mb-[-40px] animate-in fade-in slide-in-from-bottom-4 duration-1000 lg:h-[300px]"
        />
        {/* <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Gabriel Ferreira
        </h1> */}
        <p className="font-heading text-xl md:text-2xl lg:text-3xl mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          Fotógrafo em Curitiba e Região
        </p>
        <p className="font-body text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          Transformando o instante em arte e memória.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button
            size="lg"
            onClick={() => scrollToSection("portfolio")}
            className="font-heading bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Ver Portfólio
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contato")}
            className="font-heading border-white text-white hover:bg-white hover:text-foreground"
          >
            Entre em Contato
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("sobre")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
