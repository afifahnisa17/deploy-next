import {useRouter} from "next/router";
import { use } from "react";

const halamanToko = () => {
    const Router = useRouter();
    console.log(Router);

    return (
        <div>
            <h1>Halaman Toko</h1>
            <p>Toko: {Router.query.slug && Router.query.slug[0] + " - " + Router.query.slug[1]}</p>
            {/* <p>Toko: {Array.isArray(Router.query.slug) ? Router.query.slug.join(" - ") : Router.query.slug}</p> */}
            <p>Kategori: {Router.query.slug ? Router.query.slug[0] : "Semua Kategori"}</p>
        </div>
    );
};

export default halamanToko;

