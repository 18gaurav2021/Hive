// hive/pages/authentication/callback.tsx
'use client';
// callback.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOidc } from '@axa-fr/react-oidc';

const AuthenticationCallback = () => {
  const router = useRouter();
  const oidcUser = useOidc();

  useEffect(() => {
    if (oidcUser) {
      router.push('http://20.192.10.19:3000/dashboard');
    }
  }, [oidcUser, router]);

  return <div>Processing login...</div>;
};

export default AuthenticationCallback;
