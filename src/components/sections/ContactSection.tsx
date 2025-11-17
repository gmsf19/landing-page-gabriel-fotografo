import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Phone, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se os campos obrigatórios estão preenchidos
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const whatsappMessage =
      `*Nova mensagem do site*\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*E-mail:* ${formData.email}\n` +
      `*Telefone:* ${formData.phone || "Não informado"}\n\n` +
      `*Mensagem:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappNumber = "5534984375630";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    toast.success("Redirecionando para o WhatsApp! Complete o envio por lá.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(34) 98437-5630",
      href: "tel:+5534984375630",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@gabrielmateus.photo",
      href: "https://www.instagram.com/gabrielmateus.photo/",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Curitiba - PR",
      href: null,
    },
  ];

  return (
    <section id="contato" className="py-20 md:py-25 bg-secondary/30">
      <div className="container">
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Entre em Contato
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Vamos conversar sobre como posso eternizar os seus momentos
            especiais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div data-aos="fade-right" data-aos-duration="1000">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="font-body"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="font-body"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="font-body"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Conte-me sobre o seu evento ou ensaio..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="font-body resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full font-heading bg-accent hover:bg-accent/90"
              >
                Enviar via WhatsApp
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className="space-y-6"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-6 text-foreground">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <Card className="border-border/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-heading text-sm font-medium text-muted-foreground">
                            {info.label}
                          </p>
                          <p className="font-body text-foreground">
                            {info.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );

                  return info.href ? (
                    <a
                      key={index}
                      href={info.href}
                      target={
                        info.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        info.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-6">
                <h4 className="font-heading text-lg font-semibold mb-2 text-foreground">
                  Horário de Atendimento
                </h4>
                <p className="font-body text-muted-foreground">
                  Segunda a Sexta: 9h às 18h
                  <br />
                  Sábado: 9h às 14h
                  <br />
                  Domingo: Sob agendamento
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
