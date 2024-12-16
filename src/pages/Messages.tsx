import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Messages = () => {
  const messages = [
    {
      id: 1,
      sender: "Ahmet Yılmaz",
      message: "Merhaba, ilaçlar hakkında bilgi almak istiyorum.",
      time: "10:30",
      isRead: true,
    },
    {
      id: 2,
      sender: "Mehmet Demir",
      message: "Siparişim ne zaman teslim edilecek?",
      time: "11:45",
      isRead: false,
    },
    {
      id: 3,
      sender: "Ayşe Kaya",
      message: "Stokta başka renk seçeneği var mı?",
      time: "14:20",
      isRead: true,
    },
    {
      id: 4,
      sender: "Can Özdemir",
      message: "Fiyat konusunda indirim yapabilir misiniz?",
      time: "15:15",
      isRead: false,
    },
  ];

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
    </DashboardLayout>
  );
};

export default Messages;