import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import './global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}