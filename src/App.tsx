import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import AOS from "aos";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import PortfolioSection from "./components/sections/PortfolioSection";
import ContactSection from "./components/sections/ContactSection";
import { ToastContainer } from "react-toastify";

import "aos/dist/aos.css";
import Aos from "aos";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <ErrorBoundary>
      <ToastContainer />
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            {/* Hero Section com posição fixa */}
            <HeroSection />
            {/* Conteúdo que desliza por cima */}
            <div className="relative z-10 bg-background mt-[100vh] overflow-x-hidden overflow-y-hidden">
              <AboutSection />
              <ServicesSection />
              <PortfolioSection />
              <ContactSection />
              <Footer />
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
