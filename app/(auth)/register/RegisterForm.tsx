'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getSafeReturnToPath } from '../../../util/validation';
import styles from '../../styles/RegisterForm.module.scss';
import type { RegisterResponseBody } from '../api/register/route';

type Props = {
  returnTo?: string | string[];
  closeModal: () => void;
};

export default function RegisterForm(props: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('api/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data: RegisterResponseBody = await response.json();

    if ('errors' in data) {
      data.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    toast.success(`Welcome to FocusFlow, ${username}!`);

    // After successful registration, close the modal and redirect
    props.closeModal(); // Close the modal
    router.push(getSafeReturnToPath(props.returnTo) || '/');

    router.refresh();
  }

  return (
    <>
      <div className={styles.inputFields}>
        <form onSubmit={async (event) => await handleRegister(event)}>
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>

          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>

          <button className={styles.submitButton}>Register</button>
        </form>
      </div>
      <div className={styles.animationContainer}>
        <DotLottieReact
          src="/animations/stretch/Cobra-Pose.lottie"
          loop
          autoplay
        />
      </div>
    </>
  );
}
