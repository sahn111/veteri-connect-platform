import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

const Messages = () => {
  const [selectedMessage, setSelectedMessage] = useState<null | {
    sender: string;
    messages: Array<{ text: string; sender: "user" | "other"; time: string }>;
  }>(null);

  const messages = [
    {
      id: 1,
      sender: "Ahmet Yılmaz",
      message: "Merhaba, ilaçlar hakkında bilgi almak istiyorum.",
      time: "10:30",
      isRead: true,
      conversation: [
        { text: "Merhaba, ilaçlar hakkında bilgi almak istiyorum.", sender: "other", time: "10:30" },
        { text: "Merhaba, size nasıl yardımcı olabilirim?", sender: "user", time: "10:31" },
        { text: "Aspirin stokta var mı?", sender: "other", time: "10:32" },
        { text: "Evet, hem 20'lik hem de 40'lık paketlerimiz mevcut.", sender: "user", time: "10:33" },
      ]
    },
    {
      id: 2,
      sender: "Mehmet Demir",
      message: "Siparişim ne zaman teslim edilecek?",
      time: "11:45",
      isRead: false,
      conversation: [
        { text: "Siparişim ne zaman teslim edilecek?", sender: "other", time: "11:45" },
        { text: "Sipariş numaranızı paylaşabilir misiniz?", sender: "user", time: "11:46" },
        { text: "Sipariş numaram: #12345", sender: "other", time: "11:47" },
        { text: "Yarın öğleden önce teslim edilecek.", sender: "user", time: "11:48" },
      ]
    },
    {
      id: 3,
      sender: "Ayşe Kaya",
      message: "Stokta başka renk seçeneği var mı?",
      time: "14:20",
      isRead: true,
      conversation: [
        { text: "Stokta başka renk seçeneği var mı?", sender: "other", time: "14:20" },
        { text: "Hangi ürün için soruyorsunuz?", sender: "user", time: "14:21" },
        { text: "Tansiyon aleti için", sender: "other", time: "14:22" },
        { text: "Siyah ve beyaz renk seçeneklerimiz mevcut.", sender: "user", time: "14:23" },
      ]
    },
    {
      id: 4,
      sender: "Can Özdemir",
      message: "Fiyat konusunda indirim yapabilir misiniz?",
      time: "15:15",
      isRead: false,
      conversation: [
        { text: "Fiyat konusunda indirim yapabilir misiniz?", sender: "other", time: "15:15" },
        { text: "Hangi ürünler için indirim istiyorsunuz?", sender: "user", time: "15:16" },
        { text: "Vitamin takviyeleri için", sender: "other", time: "15:17" },
        { text: "Toplu alımlarda %10 indirim yapabiliriz.", sender: "user", time: "15:18" },
      ]
    },
  ];

  const handleMessageClick = (message: typeof messages[0]) => {
    setSelectedMessage({
      sender: message.sender,
      messages: message.conversation
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Mesajlar</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Mesajlarınız
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      !message.isRead ? "border-primary" : ""
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{message.sender}</h3>
                            <span className="text-sm text-muted-foreground">
                              {message.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={selectedMessage !== null} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.sender} ile Mesajlaşma</DialogTitle>
            <DialogDescription>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {selectedMessage?.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Messages;