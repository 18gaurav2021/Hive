// //hive\pages\login.tsx
// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
// import { useRouter } from 'next/navigation';

// export default function LoginPageWrapper() {
//   const { login } = useOidc();
//   const oidcUser = useOidcUser();
//   const router = useRouter();
//   useEffect(() => {
//     if (oidcUser) {
//       let ob = router.push(
//         'http://4.224.76.123/Account/Login?ReturnUrl=%2FSecure'
//       );
//       if ({ ob }) {
//         router.push('/dashboard');
//       }
//       // login(); // Trigger login if the user is not authenticated
//     } else {
//       router.push('http://4.224.76.123/Account/Login?ReturnUrl=%2FSecure');
//       // login();
//     }
//   }, [oidcUser, login, router]);

//   return <div>Redirecting to dashboard...</div>;
// }
// login.tsx
'use client';
import React, { useEffect } from 'react';
import { useOidc, useOidcUser } from '@axa-fr/react-oidc';
import { useRouter } from 'next/navigation';

export default function LoginPageWrapper() {
  const { login } = useOidc();
  const oidcUser = useOidcUser();
  const router = useRouter();

  useEffect(() => {
    if (oidcUser) {
      router.push('http://20.192.10.19:3000/dashboard');
    } else {
      login();
    }
  }, [oidcUser, login, router]);

  return <div>Redirecting to login...</div>;
}
