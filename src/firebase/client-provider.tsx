'use client';

import React, { useEffect, useState } from 'react';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [firebase, setFirebase] = useState<{
    app: FirebaseApp;
    firestore: Firestore;
    auth: Auth;
  } | null>(null);

  useEffect(() => {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    setFirebase({ app, firestore, auth });
  }, []);

  if (!firebase) return null;

  return (
    <FirebaseProvider
      app={firebase.app}
      firestore={firebase.firestore}
      auth={firebase.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
