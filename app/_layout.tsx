import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}