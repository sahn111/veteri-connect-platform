import { ClipboardList, HandshakeIcon, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "İlaçlarınızı Listeleyin",
    description: "Son kullanma tarihleri ve miktarlar dahil olmak üzere mevcut ilaçlarınızı kolayca listeleyin."
  },
  {
    icon: HandshakeIcon,
    title: "Bağlantı Kurun ve Takas Yapın",
    description: "Bölgenizdeki doğrulanmış veteriner hekimlerle bağlantı kurun ve güvenli ilaç takası düzenleyin."
  },
  {
    icon: ShieldCheck,
    title: "Güvenli İşlem",
    description: "Uyumluluk ve güvenliği sağlayan doğrulanmış platformumuzla işlemlerinizi güvenle tamamlayın."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nasıl Çalışır</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};