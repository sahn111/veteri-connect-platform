import { Shield, RefreshCcw, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Exchange",
    description: "Verified platform ensuring safe and compliant medicine exchange between licensed veterinarians."
  },
  {
    icon: RefreshCcw,
    title: "Efficient Process",
    description: "Streamlined system for quick and easy medicine listing, discovery, and exchange."
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join a network of verified veterinary professionals committed to ethical practice."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose VetMedEx?</h2>
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