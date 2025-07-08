// app/_layout.tsx or app/layout.tsx
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import CustomsToast from '../components/CustomsToast';

import '../app/globals.css';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast 
        config={{
          custom: (props) => (
            <CustomsToast {...props} />
          ),
        }}
      />
    </>
  );
}
