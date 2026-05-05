import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import { loadProducts } from '../utils/storage';

export default function StokScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        const data = await loadProducts();
        setProducts(data);
      };
      fetchProducts();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            namaBarang={item.namaBarang}
            harga={item.harga}
            sisaStok={item.sisaStok}
            gambar={item.gambar}
            onPress={() => {
              // Jika ingin fitur edit, bisa arahkan ke form dengan membawa data item
              navigation.navigate('FormProduk', { productToEdit: item });
            }}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* FAB (Floating Action Button) untuk tambah produk */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('FormProduk')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  listContainer: {
    paddingBottom: 80,
    paddingTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
