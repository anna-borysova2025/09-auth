'use client';

import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const user = await checkSession();
      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
      setIsLoading(false);
    };
    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;