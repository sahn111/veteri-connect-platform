import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-muted to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-up">
            Veteriner İlaç Takasını Kolaylaştırın
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-up">
            Veteriner hekimler için güvenli ve verimli ilaç takası platformu.
            Güvenilir profesyonel topluluğumuza bugün katılın.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up">
            <Link to="/walkthrough">
              <Button size="lg" className="group">
                Başlayın
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/walkthrough">
              <Button size="lg" variant="outline">
                Daha Fazla Bilgi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};