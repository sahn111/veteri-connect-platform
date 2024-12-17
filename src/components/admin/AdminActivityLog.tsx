import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AdminActivityLog = () => {
  const activities = [
    {
      id: 1,
      user: "Ahmet Yılmaz",
      action: "Yeni ürün ekledi",
      details: "Antibiyotik - 100ml",
      timestamp: "2024-03-10T10:30:00",
    },
    {
      id: 2,
      user: "Mehmet Demir",
      action: "Sipariş verdi",
      details: "Sipariş #123",
      timestamp: "2024-03-10T09:15:00",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kullanıcı</TableHead>
            <TableHead>İşlem</TableHead>
            <TableHead>Detay</TableHead>
            <TableHead>Tarih</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.action}</TableCell>
              <TableCell>{activity.details}</TableCell>
              <TableCell>
                {new Date(activity.timestamp).toLocaleString('tr-TR')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};