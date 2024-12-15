import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-muted to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-up">
            Streamline Your Veterinary Medicine Exchange
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-up">
            A secure platform for veterinarians to exchange medicines efficiently and safely.
            Join our trusted community of professionals today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};