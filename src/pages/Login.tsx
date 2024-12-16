import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetMode) {
      // Password reset logic will be implemented with Supabase
      toast({
        title: "Şifre sıfırlama bağlantısı gönderildi",
        description: "Lütfen e-posta kutunuzu kontrol edin.",
      });
      setIsResetMode(false);
    } else {
      // Login logic will be implemented with Supabase
      console.log("Login attempted:", credentials);
      navigate("/dashboard");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <Link to="/" className="text-primary font-bold text-xl mb-4 block">
            VetMedEx
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {isResetMode ? "Şifre Sıfırlama" : "Hoş Geldiniz"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isResetMode
              ? "E-posta adresinizi girin"
              : "Hesabınıza giriş yapın"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">E-posta adresi</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {!isResetMode && (
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              {isResetMode ? "Giriş yap" : "Şifremi unuttum"}
            </button>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <LogIn className="mr-2" />
            {isResetMode ? "Şifre sıfırlama bağlantısı gönder" : "Giriş yap"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Hesabınız yok mu?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/80"
            >
              Hemen kaydolun
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;