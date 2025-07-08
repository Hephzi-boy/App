// app/_layout.tsx or app/layout.tsx
import { Session } from '@supabase/supabase-js';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import Account from '../components/Account';
import Auth from '../components/Auth';
import CustomsToast from '../components/CustomsToast';
import { supabase } from '../lib/supabase';

import '../app/globals.css';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe(); // cleanup listener
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
      <Stack screenOptions={{ headerShown: false }} />
      <Toast 
        config={{
          custom: (props) => (
            <CustomsToast {...props} />
          ),
        }}
      />
    </View>
  );
}
