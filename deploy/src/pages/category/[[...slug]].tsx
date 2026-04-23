import router, {useRouter} from "next/router";
import { use } from "react";

const halamanCategory = () => {
    const Router = useRouter();
    console.log(Router);

    return (
        <div>
            <h1>Halaman Kategori</h1>
            <p>Parameter URL (Slug):</p>
            <ul>
                {/* Pastikan slug ada dan bertipe array sebelum di-map */}
                {Array.isArray(Router.query.slug) ? (
                    Router.query.slug.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                ) : (
                    <li>{Router.query.slug || "Tidak ada parameter"}</li>
                )}
            </ul>
            
            <hr />
            <p>Path saat ini: <strong>{Router.asPath}</strong></p>
        </div>
    );
};

export default halamanCategory;

