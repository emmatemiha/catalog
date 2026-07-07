import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function AppTabs() {
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
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="albums-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: () => (
            <Pressable style={styles.fab} onPress={() => router.push('/camera')}>
              <Ionicons name="camera" size={24} color="#FFFFFF" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="target" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFCF7',
    borderTopColor: '#F0E1D0',
    height: 64,
    paddingTop: 8,
  },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#C2694A',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -20,
    shadowColor: '#3D2B1F',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
});