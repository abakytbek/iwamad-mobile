import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { useEvents } from '../../src/hooks/useEvents';
import EventRow from '../../src/components/EventRow';

export default function EventsScreen() {
  const router = useRouter();

  const { data, isPending, isError, error, refetch, isRefetching } =
    useEvents();

  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  function toggleSaved(id: number) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  if (isPending) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ActivityIndicator />
        <Text style={styles.message}>Loading events</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <Text style={styles.message}>Could not load events</Text>
        <Text style={styles.message}>{error.message}</Text>

        <Pressable style={styles.retry} onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const filteredEvents = data.filter((event) =>
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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
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
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
  retry: {
    minHeight: 44,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});