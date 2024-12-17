import { User } from "lucide-react";

interface MessageItemProps {
  message: {
    text: string;
    sender: "user" | "other";
    time: string;
    isNew?: boolean;
  };
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        } ${message.isNew ? "animate-blink" : ""}`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.time}
        </span>
      </div>
    </div>
  );
};