import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { BackButton } from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon } from "lucide-react";
import { ensureToken } from "../utils/auth";

const Settings = () => {
  const [settings, setSettings] = useState({
    email_notification: false,
    sms_notification: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Ayarları almak için GET isteği
  const fetchSettings = async () => {
    const tokenReady = await ensureToken();

    if (!tokenReady) {
      return; // Token geçersizse işlemi durdur
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-setting/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        console.error("Ayarlar yüklenirken hata oluştu:", response.statusText);
      }
    } catch (error) {
      console.error("Ayarlar yüklenirken hata oluştu:", error);
    }
  };

  // Ayarları güncellemek için PUT isteği
  const handleToggle = async (field) => {
    const tokenReady = await ensureToken();

    if (!tokenReady) {
      return; // Token geçersizse işlemi durdur
    }

    const updatedSettings = {
      ...settings,
      [field]: !settings[field],
    };

    setSettings(updatedSettings); // Geçici olarak kullanıcı arayüzünü güncelle
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user-setting/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(updatedSettings),
      });

      if (!response.ok) {
        console.error("Ayarlar güncellenirken hata oluştu:", response.statusText);
      }
    } catch (error) {
      console.error("Ayarlar güncellenirken hata oluştu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklendiğinde mevcut ayarları almak
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButton />
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Ayarlar</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Tercihler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email_notification">E-posta Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Yeni mesajlar ve siparişler hakkında e-posta bildirimleri alın
                  </p>
                </div>
                <Switch
                  id="email_notification"
                  checked={settings.email_notification}
                  onCheckedChange={() => handleToggle("email_notification")}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms_notification">Pazarlama İletişimi</Label>
                  <p className="text-sm text-muted-foreground">
                    Yeni özellikler ve kampanyalar hakkında güncellemeler alın
                  </p>
                </div>
                <Switch
                  id="sms_notification"
                  checked={settings.sms_notification}
                  onCheckedChange={() => handleToggle("sms_notification")}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;