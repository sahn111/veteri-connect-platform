import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShoppingCart,
  MessageSquare,
  Package,
  Users,
  Search,
  Shield,
} from "lucide-react";

const Walkthrough = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          VetMedEx Nasıl Çalışır?
        </h1>

        <div className="grid gap-12">
          <Section
            title="1. Güvenli Kayıt"
            description="Veteriner hekimler için özel olarak tasarlanmış platformumuza lisans numaranızla kayıt olun."
            image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            icon={<Shield className="h-8 w-8" />}
          />

          <Section
            title="2. İlaç Takası ve Alışveriş"
            description="Elinizde bulunan ilaçları listeleyin veya ihtiyacınız olan ilaçları güvenle satın alın."
            image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88"
            icon={<ShoppingCart className="h-8 w-8" />}
            reverse
          />

          <Section
            title="3. Profesyonel İletişim"
            description="Diğer veteriner hekimlerle mesajlaşın, deneyimlerinizi paylaşın."
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
            icon={<MessageSquare className="h-8 w-8" />}
          />

          <Section
            title="4. Stok Yönetimi"
            description="İlaç envanterinizi kolayca takip edin ve yönetin."
            image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
            icon={<Package className="h-8 w-8" />}
            reverse
          />
        </div>

        <div className="text-center mt-16">
          <Link to="/register">
            <Button size="lg" className="group">
              Hemen Başlayın
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  description,
  image,
  icon,
  reverse = false,
}: {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  reverse?: boolean;
}) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className={reverse ? "md:order-2" : ""}>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4 text-primary">{icon}</div>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <img
          src={image}
          alt={title}
          className="rounded-lg shadow-lg w-full h-64 object-cover"
        />
      </div>
    </div>
  );
};

export default Walkthrough;