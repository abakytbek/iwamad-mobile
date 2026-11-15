import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useEvents } from '../../src/hooks/useEvents';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.message}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>

        <Pressable style={styles.retry} onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
  <SafeAreaView
    style={styles.container}
    edges={['top', 'bottom']}
  >
    <Stack.Screen options={{ title: 'Event Details' }} />

    <Text style={styles.title}>{event.title}</Text>
    <Text style={styles.info}>Date: {event.date}</Text>
    <Text style={styles.info}>Place: {event.place}</Text>
    <Text style={styles.info}>Seats: {event.seats}</Text>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  width: '100%',
  paddingHorizontal: 24,
  paddingBottom: 24,
  paddingTop: 60,
  backgroundColor: '#fff',
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  info: {
    fontSize: 18,
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  retry: {
    minHeight: 44,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});