import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />

      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.info}>Date: {event.date}</Text>
      <Text style={styles.info}>Place: {event.place}</Text>
      <Text style={styles.info}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
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
});