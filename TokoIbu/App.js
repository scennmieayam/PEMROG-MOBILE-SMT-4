import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from './src/context/CartContext';

// Screens
import KasirScreen from './src/screens/KasirScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import StokScreen from './src/screens/StokScreen';
import FormProdukScreen from './src/screens/FormProdukScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack untuk Tab Kasir
function KasirStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1E88E5' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="KasirMain" component={KasirScreen} options={{ title: 'Kasir TokoIbu' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Pembayaran' }} />
    </Stack.Navigator>
  );
}

// Stack untuk Tab Stok
function StokStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1E88E5' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="StokMain" component={StokScreen} options={{ title: 'Stok Barang' }} />
      <Stack.Screen name="FormProduk" component={FormProdukScreen} options={{ title: 'Kelola Produk' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Kasir') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Stok Barang') {
              iconName = focused ? 'cube' : 'cube-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1E88E5',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 20, // Dinaikkan agar tidak tertutup tombol sistem HP
            paddingTop: 5,
            height: 100, // Disesuaikan tingginya
          }
        })}
      >
        <Tab.Screen name="Kasir" component={KasirStack} />
        <Tab.Screen name="Stok Barang" component={StokStack} />
      </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
