import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Tugas1Screen from '../screens/Tugas1Screen';
import Tugas2Screen from '../screens/Tugas2Screen';
import Tugas3Screen from '../screens/Tugas3Screen';
import Tugas4Screen from '../screens/Tugas4Screen';

const TopTab = createMaterialTopTabNavigator();

export default function MaterialTopTabNavigator() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="MT_Tugas1" component={Tugas1Screen} options={{ title: 'Flexbox' }} />
      <TopTab.Screen name="MT_Tugas2" component={Tugas2Screen} options={{ title: 'Props' }} />
      <TopTab.Screen name="MT_Tugas3" component={Tugas3Screen} options={{ title: 'State & Props' }} />
      <TopTab.Screen name="MT_Tugas4" component={Tugas4Screen} options={{ title: 'Event Handling' }} />
    </TopTab.Navigator>
  );
}
