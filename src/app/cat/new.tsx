import { addCat } from '@/lib/catStorage';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewCatScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [personality, setPersonality] = useState('');
  const [status, setStatus] = useState<'outdoor' | 'indoor' | 'stray'>('outdoor');
  const [notes, setNotes] = useState('');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const existingCollections = ['Park regulars', 'Night owls']; // pull from real data later

  const handleSave = async () => {
    const newCat = {
      id: Date.now().toString(),
      name,
      breed,
      personality,
      status,
      notes,
      color: '#C2694A',
      photoUri,
      timesSpotted: 1,
      location: 'Unknown',
      collections: selectedCollections,
    };

    await addCat(newCat);
    router.replace({ pathname: '/cat/[id]', params: { id: newCat.id } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#3D2B1F" />
        </Pressable>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.photo} />
        ) : (
          <View style={[styles.photo, styles.photoPlaceholder]} />
        )}

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Nico"
          placeholderTextColor="#B8A392"
        />

        <Text style={styles.label}>Breed / Colour</Text>
        <TextInput
          style={styles.input}
          value={breed}
          onChangeText={setBreed}
          placeholder="e.g. orange tabby"
          placeholderTextColor="#B8A392"
        />

        <Text style={styles.label}>Personality</Text>
        <TextInput
          style={styles.input}
          value={personality}
          onChangeText={setPersonality}
          placeholder="e.g. friendly, curious"
          placeholderTextColor="#B8A392"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {(['outdoor', 'indoor'] as const).map((option) => (
            <Pressable
              key={option}
              style={[styles.statusChip, status === option && styles.statusChipActive]}
              onPress={() => setStatus(option)}
            >
              <Text style={[styles.statusChipText, status === option && styles.statusChipTextActive]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Add to collection (optional)</Text>
        <View style={styles.statusRow}>
          {existingCollections.map((col) => {
            const active = selectedCollections.includes(col);
            return (
              <Pressable
                key={col}
                style={[styles.statusChip, active && styles.statusChipActive]}
                onPress={() =>
                  setSelectedCollections((prev) =>
                    active ? prev.filter((c) => c !== col) : [...prev, col]
                  )
                }
              >
                <Text style={[styles.statusChipText, active && styles.statusChipTextActive]}>{col}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Anything worth remembering about this cat..."
          placeholderTextColor="#B8A392"
          multiline
        />

        <Pressable style={styles.saveButton} onPress={handleSave} disabled={!name}>
          <Text style={styles.saveButtonText}>Save Cat</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF3EA' },
  scrollContent: { padding: 20, gap: 4 },
  backButton: { marginBottom: 8 },
  photo: { width: '100%', height: 400, borderRadius: 20, marginBottom: 16, backgroundColor: '#E9C9A8' },
  photoPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 12, fontWeight: '500', color: '#3D2B1F', marginTop: 12, marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F0E1D0',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, color: '#3D2B1F',
  },
  notesInput: { minHeight: 80, textAlignVertical: 'top' },
  statusRow: { flexDirection: 'row', gap: 8 },
  statusChip: {
    borderWidth: 1, borderColor: '#F0E1D0', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 7, backgroundColor: '#FFFFFF',
  },
  statusChipActive: { backgroundColor: '#C2694A', borderColor: '#C2694A' },
  statusChipText: { fontSize: 12, color: '#5C4A3A' },
  statusChipTextActive: { color: '#FFFFFF' },
  saveButton: {
    backgroundColor: '#C2694A', borderRadius: 12, paddingVertical: 14,
    alignItems: 'center', marginTop: 24, marginBottom: 20,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
});