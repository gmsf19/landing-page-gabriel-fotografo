import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchPortfolioImages,
  type Category,
  type PortfolioItem,
} from "@/lib/s3";
import { Loader2 } from "lucide-react";
import ImageLightbox from "../ui/image-lightbox";

const categories = [
  { value: "todos" as Category, label: "Todos" },
  { value: "casamentos" as Category, label: "Casamentos" },
  { value: "aniversario" as Category, label: "Aniversário" },
  { value: "eventos" as Category, label: "Eventos" },
  { value: "familia" as Category, label: "Família" },
  { value: "ensaios" as Category, label: "Ensaios" },
  { value: "gestantes" as Category, label: "Gestantes" },
  { value: "nascimento" as Category, label: "Nascimento" },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false); // Controla se está aberto
  const [lightboxIndex, setLightboxIndex] = useState(0); // Índice da imagem atual

  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isButtonFixed, setIsButtonFixed] = useState(false);

  // ✅ ADICIONAR ESTAS REFS:
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const galleryEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        // Chama a função que busca do portfolio.json
        const items = await fetchPortfolioImages();
        setPortfolioItems(items);
      } catch (err) {
        console.error("Erro ao carregar imagens:", err);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!categoriesRef.current || !galleryEndRef.current) return;

      const categoriesRect = categoriesRef.current.getBoundingClientRect();
      const galleryEndRect = galleryEndRef.current.getBoundingClientRect();

      // Verifica se passou da área de categorias
      const passedCategories = categoriesRect.bottom < 0;

      // Verifica se chegou perto do final da galeria
      const nearGalleryEnd = galleryEndRect.top < window.innerHeight;

      // Mostrar botão flutuante quando passou das categorias mas não chegou no fim
      setShowFloatingButton(passedCategories && !nearGalleryEnd);

      // Fixar botão quando chegou no final
      setIsButtonFixed(nearGalleryEnd);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar posição inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const filteredItems =
    activeCategory === "todos"
      ? (() => {
          // 1. Agrupar imagens por categoria
          const grouped = portfolioItems.reduce((acc: any, item) => {
            if (!acc[item.category]) {
              acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
          }, {});

          // 2. Pegar apenas 3 primeiros de cada categoria
          const result: any = [];
          Object.values(grouped).forEach((items: any) => {
            result.push(...items.slice(0, 3));
          });
          return result;
        })()
      : portfolioItems.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navegar para próxima imagem (com loop)
  const nextImage = () => {
    setLightboxIndex(prev => (prev + 1) % filteredItems.length);
  };

  // Navegar para imagem anterior (com loop)
  const previousImage = () => {
    setLightboxIndex(prev =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCategories = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 md:py-32 bg-background relative"
    >
      <div className="container">
        <div
          ref={categoriesRef}
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Portfólio
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Conheça alguns dos momentos especiais que tive o privilégio de
            registrar
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <Button
                key={category.value}
                variant={
                  activeCategory === category.value ? "default" : "outline"
                }
                onClick={() => setActiveCategory(category.value)}
                className="font-heading hover:text-white"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-accent" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="font-body text-muted-foreground">
                    Nenhuma imagem encontrada nesta categoria.
                  </p>
                </div>
              ) : (
                filteredItems.map((item: any, index: any) => (
                  <div
                    key={item.id}
                    className="group relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg cursor-pointer"
                    data-aos="zoom-in"
                    data-aos-duration="600"
                    data-aos-delay={index * 50}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Portfólio - ${item.category}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))
              )}
            </div>
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* ... imagens da galeria ... */}
                </div>

                {/* ✅ ADICIONAR ESTE MARCADOR: */}
                <div ref={galleryEndRef} className="h-1" />

                {/* ✅ ADICIONAR ESTE BOTÃO FIXO: */}
                {isButtonFixed && (
                  <div className="m-auto bottom-8 right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 w-[123px] mt-[50px]">
                    <Button
                      onClick={scrollToCategories}
                      size="lg"
                      className="font-heading shadow-2xl hover:scale-105 transition-transform"
                    >
                      Categorias
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      {lightboxOpen && (
        <ImageLightbox
          images={filteredItems.map((item: any) => item.imageUrl)} // Array de URLs
          currentIndex={lightboxIndex} // Índice atual
          onClose={closeLightbox} // Função fechar
          onNext={nextImage} // Função próxima
          onPrevious={previousImage} // Função anterior
        />
      )}
      {showFloatingButton && (
        <div className="fixed bottom-8 right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Button
            onClick={scrollToCategories}
            size="lg"
            className="font-heading shadow-2xl hover:scale-105 transition-transform"
          >
            Categorias
          </Button>
        </div>
      )}
    </section>
  );
}
