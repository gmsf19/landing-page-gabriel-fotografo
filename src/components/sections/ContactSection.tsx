import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Phone, MapPin, Mail } from "lucide-react";
import { toast } from "react-toastify";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const formatPhone = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara conforme o tamanho
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formatar mensagem estruturada para WhatsApp
    const eventTypes: Record<string, string> = {
      casamento: "Casamento",
      aniversario: "Aniversário",
      ensaio: "Ensaio",
      corporativo: "Corporativo",
      outro: "Outro",
    };

    let message = `*Novo Pedido de Orçamento*\n\n`;
    message += `*Nome:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Telefone:* ${formData.phone}\n`;

    if (formData.eventType) {
      message += `*Tipo de Evento:* ${
        eventTypes[formData.eventType] || formData.eventType
      }\n`;
    }

    if (formData.eventDate) {
      const date = new Date(formData.eventDate + "T00:00:00");
      const formattedDate = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      message += `*Data do Evento:* ${formattedDate}\n`;
    }

    if (formData.message) {
      message += `\n*Mensagem:*\n${formData.message}`;
    }

    // Número do WhatsApp (remover espaços e caracteres especiais)
    const whatsappNumber = "5534984375630";

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Abrir WhatsApp Web
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    // toast.s({
    //   title: "Abrindo WhatsApp...",
    //   description: "Você será redirecionado para enviar sua mensagem.",
    // });

    toast.success(
      <p>
        Abrindo Whatsapp...
        <br />
        Você será redirecionado para enviar sua mensagem.
      </p>,
      { position: "bottom-right" }
    );

    // Limpar formulário
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      message: "",
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
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Seu nome"
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="seu@email.com"
                    className="bg-background"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefone *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Data do Evento
                  </label>
                  <Input
                    type="date"
                    value={formData.eventDate}
                    onChange={e =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    className="bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Evento *
                </label>
                <Select
                  value={formData.eventType}
                  onValueChange={value =>
                    setFormData({ ...formData, eventType: value })
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Selecione o tipo de evento" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="casamento">Casamento</SelectItem>
                    <SelectItem value="aniversario">Aniversário</SelectItem>
                    <SelectItem value="ensaio">Ensaio</SelectItem>
                    <SelectItem value="corporativo">Corporativo</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem
                </label>
                <Textarea
                  value={formData.message}
                  onChange={e =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Conte-nos mais sobre seu evento e suas necessidades..."
                  className="bg-background min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="m-auto right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300"
              >
                Enviar Pedido de Orçamento
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
