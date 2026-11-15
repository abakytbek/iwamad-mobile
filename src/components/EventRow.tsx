import { StyleSheet, Text, Pressable } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  saved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onLongPress,
  saved,
}: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.title}>{event.title}</Text>

      {saved && <Text style={styles.saved}>★ Saved</Text>}

      <Text style={styles.info}>{event.date}</Text>
      <Text style={styles.info}>{event.place}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    minHeight: 44,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  cardPressed: {
    opacity: 0.6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  saved: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
  },
});