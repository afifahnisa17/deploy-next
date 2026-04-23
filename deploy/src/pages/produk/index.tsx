import { useRouter } from "next/router";
import TampilanProduk from "../../views/produk"; 
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const Kategori = () => {
  const { push } = useRouter();
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  // Jika terjadi error pada API saat testing tanpa mock, ini yang akan muncul
  if (error) return <div>Gagal memuat data. Coba refresh kembali.</div>;

  return (
    <div>
      {/* Kirim data ke view. Jika loading, kirim array kosong */}
      <TampilanProduk products={isLoading ? [] : data?.data} />
    </div>
  );
};

export default Kategori;