import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";

export const AdminUserList = () => {
  const users = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: "Satıcı",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Mehmet Demir",
      email: "mehmet@example.com",
      role: "Alıcı",
      status: "suspended",
      joinDate: "2024-02-01",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kullanıcı</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Kayıt Tarihi</TableHead>
            <TableHead>İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge
                  variant={user.status === "active" ? "default" : "destructive"}
                >
                  {user.status === "active" ? "Aktif" : "Askıya Alındı"}
                </Badge>
              </TableCell>
              <TableCell>{new Date(user.joinDate).toLocaleDateString('tr-TR')}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title={user.status === "active" ? "Askıya Al" : "Aktifleştir"}
                >
                  {user.status === "active" ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};