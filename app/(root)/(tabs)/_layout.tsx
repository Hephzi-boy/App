import { Tabs } from 'expo-router'
import { Image, useColorScheme, View } from 'react-native'

// Import your home.png image
import home from './assets/home.png'; // Adjust the path if needed

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
        },
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={home}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? '#60a5fa' : '#fff', // light blue when focused, white otherwise
              }}
              resizeMode="contain"
            />
          </View>
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Tabs>
  )
}