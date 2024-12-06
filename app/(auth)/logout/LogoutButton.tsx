'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { logout } from './actions';

type LogoutButtonProps = {
  className?: string;
  username?: string | null;
};

export default function LogoutButton({
  className,
  username,
}: LogoutButtonProps) {
  const router = useRouter();

  return (
    <form>
      <button
        className={className}
        formAction={async () => {
          await logout();
          toast.success(`Goodbye, ${username || 'Guest'}!`, {
            icon: '👋🏼',
          });
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
