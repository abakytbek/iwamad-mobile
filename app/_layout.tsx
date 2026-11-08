import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="events/index"
        options={{ title: 'Events' }}
      />
      <Stack.Screen
        name="events/[id]"
        options={{ title: 'Event Details' }}
      />
    </Stack>
  );
}