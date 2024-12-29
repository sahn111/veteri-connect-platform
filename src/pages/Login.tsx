import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handles form submission for login or password reset
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isResetMode
      ? "http://127.0.0.1:8000/api/reset-password/"
      : "http://127.0.0.1:8000/api/token/";

    const payload = isResetMode
      ? { username: credentials.username }
      : credentials;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // Send cookies along with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      const data = await response.json();

      if (isResetMode) {
        toast({
          title: "Password Reset",
          description: "A password reset link has been sent to your email.",
        });
        setIsResetMode(false);
      } else {
        console.log
        // Access and refresh tokens
        const { access, refresh } = data;

        // Save tokens in localStorage (or HttpOnly cookies from backend)
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        toast({
          title: "Login Successful",
          description: "Redirecting to the dashboard...",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  // Handles input value changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="text-primary font-bold text-xl mb-4 block">
            VetMedEx
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {isResetMode ? "Reset Your Password" : "Welcome Back"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isResetMode
              ? "Enter your email to reset your password"
              : "Sign in to your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="username"
                type="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Password Field (only for login mode) */}
            {!isResetMode && (
              <div>
                <Label htmlFor="password">Password</Label>
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

          {/* Toggle Between Login and Reset Mode */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              {isResetMode ? "Back to Login" : "Forgot Password?"}
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg">
            <LogIn className="mr-2" />
            {isResetMode ? "Send Reset Link" : "Sign In"}
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account? {" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
