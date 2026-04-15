import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Tugas1Screen from '../screens/Tugas1Screen';
import Tugas2Screen from '../screens/Tugas2Screen';
import Tugas3Screen from '../screens/Tugas3Screen';
import Tugas4Screen from '../screens/Tugas4Screen';

const Tab = createBottomTabNavigator();

export default function MaterialBottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...navigation.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return <Icon name="application" size={24} color={color} />;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="MB_Tugas1"
        component={Tugas1Screen}
        options={{
          tabBarLabel: 'Flexbox',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="view-dashboard" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MB_Tugas2"
        component={Tugas2Screen}
        options={{
          tabBarLabel: 'Props',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-group" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MB_Tugas3"
        component={Tugas3Screen}
        options={{
          tabBarLabel: 'State',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calculator" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="MB_Tugas4"
        component={Tugas4Screen}
        options={{
          tabBarLabel: 'Event Handling',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
