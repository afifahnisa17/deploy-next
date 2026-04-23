import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const HalamanAdmin = () => {
    return(
        <div>
            <div className="admin">
                <h1>Halaman Admin</h1>
                <p>
                    Selamat datang di halaman admin! Anda memiliki akses penuh ke semua fitur dan data di aplikasi ini. Disini, Anda dapat mengelola pengguna, melihat laporan, dan melakukan tugas administratif lainnya. Pastikan untuk menggunakan hak akses Anda dengan bijak dan menjaga keamanan data pengguna.
                </p>
            </div>
        </div>
    )
};

export default HalamanAdmin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: any = await getSession(context);

  // LOGIKA PROTEKSI:
  // 1. Cek apakah sudah login
  // 2. Cek apakah rolenya 'editor'
  if (!session || session.user.role !== "editor") {
    return {
      redirect: {
        destination: "/", // Lempar ke homepage atau login jika bukan editor
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};