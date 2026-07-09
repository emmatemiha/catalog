import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C2694A',
        tabBarInactiveTintColor: '#8C7361',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="collections"
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={27} color={color} /> }}
      />
      <Tabs.Screen
        name="add"
        options={{
            tabBarButton: () => (
                <View style={styles.fabContainer}>
                    <Pressable style={styles.fab} onPress={() => router.push('/camera')}>
                        <Ionicons name="camera" size={20} color="#FFFFFF" />
                    </Pressable>
                </View>
            ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{ tabBarIcon: ({ color }) => <Ionicons name="map" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="quests"
        options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bullseye-arrow" size={24} color={color} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
    tabBar: { backgroundColor: '#FFFCF7', borderTopColor: '#F0E1D0', height: 64, paddingTop: 8 },
    fabContainer: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 8 },
    fab: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: '#C2694A',
        alignItems: 'center', justifyContent: 'center',
        shadowColor: '#3D2B1F', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8, elevation: 4,
    },
});