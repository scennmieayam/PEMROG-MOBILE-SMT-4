import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackHomeScreen from '../screens/StackHomeScreen';
import Tugas1Screen from '../screens/Tugas1Screen';
import Tugas2Screen from '../screens/Tugas2Screen';
import Tugas3Screen from '../screens/Tugas3Screen';
import Tugas4Screen from '../screens/Tugas4Screen';

const NativeStack = createNativeStackNavigator();

export default function NativeStackNavigator() {
  return (
    <NativeStack.Navigator initialRouteName="NativeStackHome">
      <NativeStack.Screen 
        name="NativeStackHome" 
        component={StackHomeScreen} 
        options={{ title: 'Daftar Tugas (Native)' }}
        initialParams={{ prefix: 'NS' }}
      />
      <NativeStack.Screen 
        name="NS_Tugas1" 
        component={Tugas1Screen} 
        options={{ title: 'Tugas 1 - Flexbox' }} 
      />
      <NativeStack.Screen 
        name="NS_Tugas2" 
        component={Tugas2Screen} 
        options={{ title: 'Tugas 2 - Props' }} 
      />
      <NativeStack.Screen 
        name="NS_Tugas3" 
        component={Tugas3Screen} 
        options={{ title: 'Tugas 3 - State & Props' }} 
      />
      <NativeStack.Screen 
        name="NS_Tugas4" 
        component={Tugas4Screen} 
        options={{ title: 'Tugas 4 - Event Handling' }} 
      />
    </NativeStack.Navigator>
  );
}
