import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Tugas1Screen from '../screens/Tugas1Screen';
import Tugas2Screen from '../screens/Tugas2Screen';
import Tugas3Screen from '../screens/Tugas3Screen';
import Tugas4Screen from '../screens/Tugas4Screen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'BT_Tugas1') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'BT_Tugas2') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'BT_Tugas3') {
            iconName = focused ? 'calculator' : 'calculator-variant-outline';
          } else if (route.name === 'BT_Tugas4') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="BT_Tugas1" component={Tugas1Screen} options={{ title: 'Flexbox' }} />
      <Tab.Screen name="BT_Tugas2" component={Tugas2Screen} options={{ title: 'Props' }} />
      <Tab.Screen name="BT_Tugas3" component={Tugas3Screen} options={{ title: 'State & Props' }} />
      <Tab.Screen name="BT_Tugas4" component={Tugas4Screen} options={{ title: 'Event Handling' }} />
    </Tab.Navigator>
  );
}
