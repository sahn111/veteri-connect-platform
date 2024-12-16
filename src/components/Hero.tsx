import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline">
                  Daha Fazla Bilgi
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>VetPazar Hakkında</DialogTitle>
                  <DialogDescription>
                    VetPazar, veteriner hekimler arasında güvenli ve etkin ilaç takasını sağlayan profesyonel bir platformdur.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Neden VetPazar?</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Güvenli ve kontrollü ilaç takası</li>
                      <li>Profesyonel veteriner hekim ağı</li>
                      <li>Stok yönetimi ve takip sistemi</li>
                      <li>Anlık mesajlaşma ve iletişim imkanı</li>
                      <li>Detaylı ilaç bilgi sistemi</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Nasıl Çalışır?</h4>
                    <p className="text-gray-600">
                      Platformumuza kayıt olduktan sonra, elinizde bulunan ilaçları listeleyebilir veya
                      ihtiyacınız olan ilaçları arayabilirsiniz. Güvenli ödeme sistemi ve profesyonel
                      lojistik ağımız ile ilaç takası güvenle gerçekleştirilir.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};