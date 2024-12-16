import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className="mb-6 hover:bg-transparent hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Geri Dön
    </Button>
  );
};