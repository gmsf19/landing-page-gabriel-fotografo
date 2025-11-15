import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && isMobileMenuOpen === false) {
        setIsScrolled(false);
        return;
      }
      setIsScrolled(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Início", id: "hero" },
    { label: "Sobre", id: "sobre" },
    { label: "Serviços", id: "servicos" },
    { label: "Portfólio", id: "portfolio" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <header
      // data-aos="fade-down"
      // data-aos-duration="800"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className={`font-display text-2xl font-semibold text-foreground hover:text-accent transition-colors ${isScrolled ? "text-black" : "text-white"}`}
          >
            Gabriel Ferreira
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-heading text-sm font-medium ${!isScrolled ? "text-white" : "text-black"} hover:text-accent transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              if (!isMobileMenuOpen) {
                setIsScrolled(true);
              }

              if (isMobileMenuOpen && window.scrollY === 0) {
                setIsScrolled(false);
              }
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            {isMobileMenuOpen ? (
              <X
                className={`h-6 w-6 ${!isScrolled ? "text-white" : "text-black"}`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${!isScrolled ? "text-white" : "text-black"}`}
              />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left font-heading text-base font-medium text-foreground/80 hover:text-accent transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
