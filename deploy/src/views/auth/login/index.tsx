import Link from 'next/link';
import styles from './login.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {push, query} = useRouter();

  const callbackUrl: any = query.callbackUrl || '/';
  const [error, setError] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Reset error setiap kali klik tombol

    try {
        const res = await signIn("credentials", {
            redirect: false,
            email: event.target.email.value,
            password: event.target.password.value,
            callbackUrl,
        });

        setIsLoading(false);

        if (!res) {
            setError("Terjadi kesalahan. Coba lagi.");
            return;
        }

        if (res.error) {
            // mapping error dari NextAuth
            if (res.error === "CredentialsSignin") {
                setError("Email atau password salah");
            } else {
                setError("Gagal login. Silakan coba lagi.");
            }
            return;
        }

        // sukses login
        push(callbackUrl);

    } catch (err) {
        setIsLoading(false);
        setError("Terjadi kesalahan pada sistem");
    }
  };
  return (
    <div className={styles.login}>
      {error ? <p className={styles.login__error}>{error}</p> : null}
      <h1 className={styles.login__title}>Halaman Login</h1>
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__item}>
            <label htmlFor="email" className={styles.login__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.login__input}
            />
          </div>

          <div className={styles.login__item}>
            <label htmlFor="password" className={styles.login__label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={styles.login__input}
            />
          </div>

          <button
            type="submit"
            className={styles.login__button}
            disabled={isLoading}
          >
            {isLoading ? 'Login...' : 'Login'}
          </button>
          <br /><br />
          <button
            onClick={() => signIn("google", {callbackUrl})}
            className={styles.login__button}
            disabled={isLoading}>
            {isLoading ? 'Login dengan Google...' : 'Sign in With Google'}
          </button>
          <br /><br />
          <button
            onClick={() => signIn("github", {callbackUrl})}
            className={styles.login__button}
            disabled={isLoading}>
            {isLoading ? 'Login dengan Github...' : 'Sign in With Github'}
          </button>
        </form>
        <p className={styles.login__text}>
          Tidak punya {"'"} akun? <Link href="/auth/register">Ke halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanLogin;