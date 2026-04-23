import { useEffect, useState } from 'react';
// 1. Perbaikan Import SCSS: Gunakan alias 'styles' agar class bisa dipanggil
import styles from '../../styles/kategori.module.scss'; 

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
}

const Kategori = () => {
  // 2. Tambahkan Type Safety pada useState agar TypeScript tidak bingung
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  // 3. Fungsi Fetch Terpisah (Sesuai Tugas 3: Supaya bisa dipanggil ulang tanpa reload)
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/produk');
      const data = await res.json();
      // Pastikan struktur data.data dari API lo memang array
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Mounting: Panggil loadData saat halaman pertama kali dibuka
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Daftar Produk</h1>
        
        {/* TUGAS 3: Tombol Refresh Data */}
        <button 
          onClick={loadData} 
          disabled={loading}
          className={styles.refreshBtn}
        >
          {loading ? 'Sabar, lagi loading...' : 'Refresh Data'}
        </button>
      </div>

      <div className={styles.grid}>
        {/* 5. Rendering: Gunakan nama variabel yang unik di dalam map (p) 
           agar tidak bentrok dengan state 'products' */}
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className={styles.card}>
              <span className={styles.categoryBadge}>
                {/* Tugas 2: Pastikan field category tampil */}
                {p.category || 'No Category'}
              </span>
              <h2>{p.name}</h2>
              <p>Harga: Rp {p.price.toLocaleString('id-ID')}</p>
              <p>Ukuran: {p.size}</p>
            </div>
          ))
        ) : (
          !loading && <p>Data belum ada di Firebase.</p>
        )}
      </div>
    </div>
  );
};

export default Kategori;