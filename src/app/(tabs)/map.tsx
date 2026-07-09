import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlaceholderScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.text}>Coming soon</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#3D2B1F' },
});