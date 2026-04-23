import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduct from "../../views/DetailProduct";
import { ProductType } from "../../types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {

  // /* ===================== CSR ===================== */
  // const { query } = useRouter();
  // const { data, error, isLoading } = useSWR(
  //   query.produk ? `/api/produk/${query.produk}` : null,
  //   fetcher
  // );

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error...</div>;

  // const finalProduct = data?.data || product;

  return (
    <div>
      <DetailProduct products={product} />
    </div>
  );
};

export default HalamanProduk;


/* ===================== SSR ===================== */
export async function getServerSideProps({
  params,
}: {
  params: { produk: string };
}) {
  const res = await fetch(
    `http://localhost:3000/api/produk/${params.produk}`
  );
  const respone = await res.json();

  return {
    props: {
      product: respone.data,
    },
  };
}


/* ===================== SSG ===================== */
// export async function getStaticPaths() {
//   const res = await fetch(`http://localhost:3000/api/produk`);
//   const respone = await res.json();

//   const paths = respone.data.map((item: ProductType) => ({
//     params: { produk: item.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({
//   params,
// }: {
//   params: { produk: string };
// }) {
//   const res = await fetch(
//     `http://localhost:3000/api/produk/${params.produk}`
//   );
//   const respone = await res.json();

//   return {
//     props: {
//       product: respone.data,
//     },
//   };
// }
