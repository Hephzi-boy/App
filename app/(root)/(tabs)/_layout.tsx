import { Tabs } from 'expo-router';
import { Image, useColorScheme, View } from 'react-native';

import house from '@/assets/images/house.png'; // Adjust the path as necessary

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
              source={house}
              style={{
                width: 65,
                height: 50,
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
          headerShown: false,
        }}
      />
    </Tabs>
  )
}