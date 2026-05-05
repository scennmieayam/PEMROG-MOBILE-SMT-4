import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import NativeStackNavigator from './NativeStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import MaterialBottomTabNavigator from './MaterialBottomTabNavigator';
import MaterialTopTabNavigator from './MaterialTopTabNavigator';

const Drawer = createDrawerNavigator();

export default function RootDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Tugas1">
      <Drawer.Screen name="Tugas1" component={StackNavigator} options={{ title: 'Stack Navigation' }} />
      <Drawer.Screen name="Tugas2" component={NativeStackNavigator} options={{ title: 'Native Stack Navigation' }} />
      <Drawer.Screen name="Tugas3" component={BottomTabNavigator} options={{ title: 'Bottom Tabs Navigation' }} />
      <Drawer.Screen name="Tugas4" component={MaterialBottomTabNavigator} options={{ title: 'Material Bottom Tabs' }} />
      <Drawer.Screen name="Tugas5" component={MaterialTopTabNavigator} options={{ title: 'Material Top Tabs' }} />
    </Drawer.Navigator>
  );
}
