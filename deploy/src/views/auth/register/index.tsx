import Link from 'next/link';
import styles from './register.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {push} = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(''); // Reset error setiap kali klik tombol

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    // Mengambil data dari form
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullname = formData.get('fullname') as string;

    // --- 1. VALIDASI FRONTEND (LOKAL) ---
    if (!email) {
      setIsLoading(false);
      return setError('Email is required');
    }
    if (password.length < 6) {
      setIsLoading(false);
      return setError('Password must be at least 6 characters');
    }

    setIsLoading(true);
    setError('');
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, fullname}),
    });
    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      push('/auth/login');
    } else {
      setIsLoading(false);
      let message = 'An error occured';

      try {
        const result = await response.json();
        message = result?.name ?? message;
      } catch {
        message = response.status === 400 ? 'Email already exists' : "An error occured";
      }

      setError(message);
    }
  };
  return (
    <div className={styles.register}>
      {error ? <p className={styles.register__error}>{error}</p> : null}
      <h1 className={styles.register__title}>Halaman Register</h1>
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__item}>
            <label htmlFor="email" className={styles.register__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.register__input}
            />
          </div>

          <div className={styles.register__item}>
            <label htmlFor="fullname" className={styles.register__label}>
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              className={styles.register__input}
            />
          </div>

          <div className={styles.register__item}>
            <label htmlFor="password" className={styles.register__label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.register__input}
            />
          </div>

          <button
            type="submit"
            className={styles.register__button}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className={styles.register__text}>
          Sudah punya akun? <Link href="/auth/login">Ke halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;