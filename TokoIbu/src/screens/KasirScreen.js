import React, { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import { loadProducts } from '../utils/storage';
import { useCart } from '../context/CartContext';

export default function KasirScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const isProcessing = useRef(false);

  // Ambil cart dan fungsi dari Context (shared state)
  const { cart, totalHarga, totalItem, addToCart } = useCart();

  const formatRupiah = (angka) => {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Reload produk setiap kali layar aktif
  useFocusEffect(
    useCallback(() => {
      const fetchProducts = async () => {
        const data = await loadProducts();
        setProducts(data);
      };
      fetchProducts();
    }, [])
  );

  const handleAddToCart = (product) => {
    // Debounce: cegah double-tap
    if (isProcessing.current) return;
    isProcessing.current = true;
    setTimeout(() => { isProcessing.current = false; }, 500);

    if (product.sisaStok <= 0) {
      Alert.alert('Stok Habis', `${product.namaBarang} sudah habis.`);
      return;
    }

    // Cek batas stok dari cart context sebelum menambah
    const existingInCart = cart.find(i => i.id === product.id);
    if (existingInCart && existingInCart.qty >= product.sisaStok) {
      Alert.alert('Maksimal Stok', `Hanya tersisa ${product.sisaStok} item.`);
      return;
    }

    addToCart(product);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Keranjang Kosong', 'Silakan pilih barang terlebih dahulu.');
      return;
    }
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Badge sinkron dengan context cart
          const cartItem = cart.find(c => c.id === item.id);
          return (
            <ProductCard
              namaBarang={item.namaBarang}
              harga={item.harga}
              sisaStok={item.sisaStok}
              gambar={item.gambar}
              onPress={() => handleAddToCart(item)}
              badge={cartItem ? cartItem.qty : 0}
            />
          );
        }}
        contentContainerStyle={styles.listContainer}
      />

      {/* Footer: Total & Tombol Bayar */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Harga:</Text>
          <Text style={styles.totalValue}>{formatRupiah(totalHarga)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>Bayar ({totalItem} item)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  listContainer: {
    paddingBottom: 90,
    paddingTop: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 13,
    color: '#666',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  checkoutBtn: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
