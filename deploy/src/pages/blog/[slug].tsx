import Router, { useRouter } from "next/router";
import HalamanProduk from "../produk/[produk]";

const HalamanBlog = () => {
    // const router = useRouter();
    // console.log(Router);
    const {query} = useRouter();
    return (
        <div>
            <h1>Halaman Blog</h1>
            <p>Slug: {query.slug}</p>
        </div>
    );
}

export default HalamanBlog;