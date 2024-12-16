import { Shield, RefreshCcw, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Güvenli Takas",
    description: "Lisanslı veteriner hekimler arasında güvenli ve uyumlu ilaç takası sağlayan doğrulanmış platform."
  },
  {
    icon: RefreshCcw,
    title: "Verimli Süreç",
    description: "Hızlı ve kolay ilaç listeleme, keşfetme ve takas için optimize edilmiş sistem."
  },
  {
    icon: Users,
    title: "Güvenilir Topluluk",
    description: "Etik uygulamaya bağlı doğrulanmış veteriner profesyonelleri ağına katılın."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Neden VetMedEx?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};