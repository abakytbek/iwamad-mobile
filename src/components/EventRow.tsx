import { StyleSheet, Text, Pressable } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn, 
} from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  saved: boolean;
};

export default function EventRow({
  event,
  onPress,
  onToggleSaved,
  saved,
}: EventRowProps) {
  return (
  <Animated.View
  entering={FadeIn}
  exiting={FadeOut}
  layout={LinearTransition}
  >
    <Swipeable
      friction={2}
      rightThreshold={60}
      renderRightActions={(_progress, _translation, swipeable) => (
        <Pressable
          onPress={() => {
            onToggleSaved();
            swipeable.close();
          }}
          style={styles.action}
        >
          <Text style={styles.actionText}>
            {saved ? 'Unsave' : 'Save'}
          </Text>
        </Pressable>
      )}
    >
      <Pressable
        onPress={onPress}
        onLongPress={onToggleSaved}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.title}>{event.title}</Text>
        
        {saved && (
          <Animated.Text entering={ZoomIn} style={styles.saved}>
            ★ Saved
            </Animated.Text>
          )}
        <Text style={styles.info}>{event.date}</Text>
        <Text style={styles.info}>{event.place}</Text>
      </Pressable>
    </Swipeable>
  </Animated.View>
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
  action: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});