import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "İlaç adı en az 2 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Geçerli bir fiyat giriniz",
  }),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Geçerli bir miktar giriniz",
  }),
  unit: z.string().min(1, "Birim seçiniz"),
  expiryDate: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Geçerli bir son kullanma tarihi giriniz",
  }),
});

const AddMedicine = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      unit: "tablet",
      expiryDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Burada API çağrısı yapılacak
    console.log(values);
    toast.success("İlaç başarıyla eklendi");
    navigate("/dashboard/marketplace");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Yeni İlaç Ekle</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İlaç Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: Amoksisilin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="İlaç hakkında detaylı bilgi giriniz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fiyat (₺)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miktar</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birim</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: tablet, doz, ml" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Son Kullanma Tarihi</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/marketplace")}
              >
                İptal
              </Button>
              <Button type="submit">İlaç Ekle</Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default AddMedicine;