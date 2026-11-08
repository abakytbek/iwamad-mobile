import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { events } from '../../src/data/events';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const router = useRouter();

  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  function toggleSaved(id: number) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={query}
        onChangeText={setQuery}
      />

      <Text style={styles.instruction}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={(event) => String(event.id)}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
            saved={savedIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No events match</Text>
        }
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  search: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 60,
    fontSize: 16,
  },
  instruction: {
    fontSize: 14,
    margin: 16,
  },
  list: {
    padding: 16,
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});