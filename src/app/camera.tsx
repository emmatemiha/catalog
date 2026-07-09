import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraScreen() {
  const pickFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      router.push({ pathname: '/cat/new', params: { photoUri: result.assets[0].uri } });
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.canceled) {
      router.push({ pathname: '/cat/new', params: { photoUri: result.assets[0].uri } });
    }
  };

    const handleClose = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/');
        }
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable onPress={handleClose} style={styles.closeButton}>
        <Ionicons name="close" size={22} color="#3D2B1F" />
      </Pressable>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="camera" size={32} color="#C2694A" />
        </View>
        <Text style={styles.title}>Spotted a cat?</Text>
        <Text style={styles.subtitle}>Take a photo or choose one from your library</Text>

        <Pressable style={styles.primaryButton} onPress={takePhoto}>
          <Text style={styles.primaryButtonText}>Take Photo</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={pickFromLibrary}>
          <Text style={styles.secondaryButtonText}>Choose from Library</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA' },
  closeButton: { padding: 20 },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, gap: 6, marginTop: -60 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#F4E2D3', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: '600', color: '#3D2B1F' },
  subtitle: { fontSize: 13, color: '#8C7361', textAlign: 'center', marginBottom: 24 },
  primaryButton: { backgroundColor: '#C2694A', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 40, marginBottom: 12, width: '100%', alignItems: 'center' },
  primaryButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  secondaryButton: { borderWidth: 1, borderColor: '#C2694A', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 40, width: '100%', alignItems: 'center' },
  secondaryButtonText: { color: '#C2694A', fontSize: 14, fontWeight: '600' },
});