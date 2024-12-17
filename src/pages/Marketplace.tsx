import { DashboardLayout } from "@/components/DashboardLayout";
import { SearchBar } from "@/components/SearchBar";
import { MedicineCard } from "@/components/MedicineCard";
import { CartProvider } from "@/components/cart/CartProvider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Medicine } from "@/components/medicine/types";

const Marketplace = () => {
  const { data: medicines, isLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('medicines')
        .select(`
          id,
          name,
          description,
          price,
          quantity,
          unit,
          expiry_date,
          seller:profiles(
            full_name,
            email
          )
        `);

      if (error) {
        console.error('Error fetching medicines:', error);
        throw error;
      }

      return data as (Medicine & {
        seller: {
          full_name: string | null;
          email: string | null;
        }
      })[];
    },
  });

  const helpContent = `
    Pazaryeri sayfasında:
    1. Üst kısımdaki arama çubuğunu kullanarak ilaç arayabilirsiniz
    2. Her ilaç kartında detaylı bilgi ve satın alma seçenekleri bulunur
    3. Sağ alttaki sepet butonu ile siparişlerinizi yönetebilirsiniz
    4. İlaç kartlarındaki "Detaylar" butonu ile ürün hakkında daha fazla bilgi alabilirsiniz
  `;

  return (
    <CartProvider>
      <DashboardLayout helpContent={helpContent}>
        <div className="min-h-screen bg-muted/30 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary">
                Veteriner İlaç Pazarı
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Veteriner hekimlerin paylaştığı ilaçları keşfedin
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <SearchBar />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch justify-items-center">
              {isLoading ? (
                <p className="text-center col-span-full">Yükleniyor...</p>
              ) : medicines?.map((medicine) => (
                <MedicineCard 
                  key={medicine.id} 
                  medicine={medicine}
                />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </CartProvider>
  );
};

export default Marketplace;