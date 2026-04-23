import TampilanProduk from "../../views/produk";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props:{products:ProductType[]}) => {
    const {products} = props;
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk products={products} />
        </div>
    );
};

export default halamanProdukStatic;

export async function getStaticProps() {
    try {
        const res = await fetch('http://127.0.0.1:3000/api/produk');
        const response: {status: boolean, data: ProductType[]}  = await res.json();

        return {
            props: {
                products: response.data || []
            },
            revalidate: 10
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: {
                products: []
            },
            revalidate: 10
        }
    }
}