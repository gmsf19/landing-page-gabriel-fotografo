import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import logoFooter from "@/assets/logo-footer-black.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-secondary/50 border-t border-border"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div data-aos="fade-up" data-aos-delay="100">
            <img src={logoFooter} alt="" className="mb-[-10px]" />
            {/* <h3 className="font-display text-2xl font-semibold mb-4">
              Gabriel Mateus
            </h3> */}
            <p className="font-body text-muted-foreground text-sm">
              Fotógrafo profissional em Curitiba, especializado em capturar
              momentos únicos e emocionantes desde 2016.
            </p>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {["Sobre", "Serviços", "Portfólio", "Contato"].map(item => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="font-body text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-heading text-sm font-semibold mb-4 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-accent" />
                <span className="font-body">(34) 98437-5630</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-body">Curitiba - PR</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Instagram className="h-4 w-4 text-accent" />
                <a
                  href="https://www.instagram.com/gabrielmateus.photo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-muted-foreground hover:text-accent transition-colors"
                >
                  @gabrielmateus.photo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gabriel Mateus Fotografia. Todos os
            direitos reservados.
          </p>
          <p className="text-[8px] mb-[-40px] mt-[20px] opacity-[0.5]">
            Desenvolvido por: DCG Solutions Software
          </p>
        </div>
      </div>
    </footer>
  );
}
