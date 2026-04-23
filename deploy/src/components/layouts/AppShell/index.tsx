import { useRouter } from 'next/router';
import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';

// 1. Terapkan Dynamic Import pada Navbar
const Navbar = dynamic(() => import("../navbar"), {
    ssr: true, // Tetap gunakan SSR agar SEO dan layout awal stabil
    loading: () => <div className="h-16 w-full animate-pulse bg-gray-100" /> // Skeleton loading
});

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

type AppShellProps = {
    children: React.ReactNode;
}

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap', // Mencegah Layout Shift (CLS)
});

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();

    return (
    /* 2. Gunakan roboto.className di sini agar font aktif secara global */
        <main className={roboto.className}>
            {/* 3. Logika conditional rendering tetap jalan, tapi sekarang lebih ringan */}
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    );
};

export default AppShell;