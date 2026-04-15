import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackHomeScreen from '../screens/StackHomeScreen';
import Tugas1Screen from '../screens/Tugas1Screen';
import Tugas2Screen from '../screens/Tugas2Screen';
import Tugas3Screen from '../screens/Tugas3Screen';
import Tugas4Screen from '../screens/Tugas4Screen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="StackHome">
      <Stack.Screen 
        name="StackHome" 
        component={StackHomeScreen} 
        options={{ title: 'Daftar Tugas' }}
        initialParams={{ prefix: 'S' }}
      />
      <Stack.Screen 
        name="S_Tugas1" 
        component={Tugas1Screen} 
        options={{ title: 'Tugas 1 - Flexbox' }} 
      />
      <Stack.Screen 
        name="S_Tugas2" 
        component={Tugas2Screen} 
        options={{ title: 'Tugas 2 - Props' }} 
      />
      <Stack.Screen 
        name="S_Tugas3" 
        component={Tugas3Screen} 
        options={{ title: 'Tugas 3 - State & Props' }} 
      />
      <Stack.Screen 
        name="S_Tugas4" 
        component={Tugas4Screen} 
        options={{ title: 'Tugas 4 - Event Handling' }} 
      />
    </Stack.Navigator>
  );
}
