import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: ImageLightboxProps) {
  // ============================================
  // ESTADOS PARA ANIMAÇÕES
  // ============================================
  const [isVisible, setIsVisible] = useState(false); // Controla fade-in geral
  const [imageLoaded, setImageLoaded] = useState(false); // Controla quando imagem carregou

  // Animação de entrada ao montar componente
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Reset do estado de carregamento ao trocar de imagem
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // ============================================
  // EVENT LISTENERS
  // ============================================

  // Fechar com ESC e navegar com setas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Prevenir scroll do body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // ============================================
  // FUNÇÃO DE FECHAMENTO COM ANIMAÇÃO
  // ============================================
  const handleClose = () => {
    setIsVisible(false); // Trigger animação de saída
    setTimeout(() => {
      onClose(); // Remover componente após animação
    }, 300);
  };

  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  // ============================================
  // HTML + CSS COM ANIMAÇÕES
  // ============================================

  return (
    // Container principal com fade-in/out
    <div
      className={` mt-[80px]
        fixed inset-0 z-50 bg-black/80 
        flex items-center justify-center 
        transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
      onClick={handleClose}
    >
      {/* ==========================================
          BOTÃO FECHAR - Desliza de cima
          ========================================== */}
      <Button
        variant="ghost"
        size="icon"
        className={`
          absolute top-4 right-4 z-10 
          text-white hover:bg-white/20 
          transition-all duration-300
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }
        `}
        onClick={handleClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* ==========================================
          BOTÃO ANTERIOR - Desliza da esquerda
          ========================================== */}
      {/* {hasMultipleImages && (
        <Button
          variant="ghost"
          size="icon"
          className={`
            absolute left-4 top-1/2 -translate-y-1/2 z-10 
            text-white hover:bg-white/20 
            transition-all duration-300
            ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }
          `}
          onClick={e => {
            e.stopPropagation();
            onPrevious();
          }}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )} */}

      {/* ==========================================
          CONTAINER DA IMAGEM - Zoom + Fade
          ========================================== */}
      <div
        className={`
          relative max-w-[90vw] max-h-[90vh] 
          flex items-center justify-center 
          transition-all duration-500
          ${
            isVisible && imageLoaded
              ? "opacity-100 scale-100" // Estado final: visível e tamanho normal
              : "opacity-0 scale-95" // Estado inicial: invisível e 95% do tamanho
          }
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* IMAGEM - Carrega e trigger animação */}
        <img
          src={currentImage}
          alt={`Imagem ${currentIndex + 1} de ${images.length}`}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          onLoad={() => setImageLoaded(true)} // ← Trigger animação quando carregar
        />

        {/* ==========================================
            CONTADOR - Desliza de baixo
            ========================================== */}
        {/* {hasMultipleImages && (
          <div
            className={`
              absolute bottom-4 left-1/2 -translate-x-1/2 
              bg-black/70 text-white px-4 py-2 rounded-full text-sm 
              transition-all duration-300
              ${
                isVisible && imageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            {currentIndex + 1} / {images.length}
          </div>
        )} */}
      </div>

      {/* ==========================================
          BOTÃO PRÓXIMO - Desliza da direita
          ========================================== */}
      {/* {hasMultipleImages && (
        <Button
          variant="ghost"
          size="icon"
          className={`
            absolute right-4 top-1/2 -translate-y-1/2 z-10 
            text-white hover:bg-white/20 
            transition-all duration-300
            ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }
          `}
          onClick={e => {
            e.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )} */}
    </div>
  );
}
