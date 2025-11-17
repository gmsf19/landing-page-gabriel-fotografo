import Aos from "aos";
import { useEffect } from "react";

export default function AboutSection() {
  return (
    <section id="sobre" className="pt-[100px] pb-20 md:pb-32 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className="order-2 lg:order-1"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl h-[587px] max-w-full lg:w-[727px]">
              <img
                src="https://ae9245dd-025a-4622-813e-f60500e3e004.s3.us-east-2.amazonaws.com/gabriel-perfil-2.jpg"
                alt="Gabriel Mateus"
                className="w-full h-full object-cover hover:scale-[1.1] transition-all duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div
            className="order-1 lg:order-2"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Sobre Mim
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                A fotografia trouxe luz à minha vida, presenteando-me com uma
                nova ótica sobre o universo.
                <br />
                Em 2016, sentado em um parque, admirando a natureza, fui atraído
                pela forma como os raios de sol atravessavam as folhas de uma
                árvore — e resolvi registrar aquele instante.
                <br />
                <br />
                A partir daquele dia, tudo começou a mudar.
                <br />
                Minha percepção dos detalhes se intensificou, e passei a
                enxergar beleza nas pequenas coisas do cotidiano: nas ruas, nos
                lugares por onde eu andava, nos gestos simples.
                <br />
                Aos poucos, o amor por fotografar pessoas e capturar seus
                sentimentos floresceu dentro de mim.
                <br />
                <br />
                Posso dizer que a fotografia corre nas minhas veias.
                <br />
                Após 21 anos separado do meu irmão gêmeo, descobri que ele
                também havia desenvolvido o mesmo olhar e talento pela arte de
                fotografar.
                <br />
                Hoje, tenho certeza: a fotografia está no meu DNA.
                <br />
                <br />
                Atuo em Curitiba e região, unindo o olhar artístico e sensível à
                precisão de quem entende o valor de cada detalhe: da luz certa
                ao tempo exato do clique.
                <br />
                <br />
                <b>
                  Porque toda história merece ser contada com verdade, técnica e
                  alma.
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
