import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loadProducts, saveProducts } from '../utils/storage';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  // Semua data cart dari Context — sudah sinkron dengan KasirScreen
  const { cart, totalHarga, totalItem, incrementInCart, decrementFromCart, removeFromCart, clearCart } = useCart();

  const [uangBayar, setUangBayar] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [kembalian, setKembalian] = useState(0);

  const formatRupiah = (angka) => {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      Alert.alert('Keranjang Kosong', 'Tidak ada item untuk dibayar.');
      return;
    }

    const uang = parseInt(uangBayar.replace(/\D/g, ''), 10) || 0;

    if (uang < totalHarga) {
      Alert.alert('Uang Kurang', 'Nominal uang yang dimasukkan kurang dari total belanja.');
      return;
    }

    const hitungKembalian = uang - totalHarga;
    setKembalian(hitungKembalian);

    try {
      const currentProducts = await loadProducts();
      // Kurangi stok barang berdasarkan cart yang sudah final
      const updatedProducts = currentProducts.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          return { ...product, sisaStok: product.sisaStok - cartItem.qty };
        }
        return product;
      });

      await saveProducts(updatedProducts);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'Gagal memproses pembayaran');
    }
  };

  const handleSelesai = () => {
    setModalVisible(false);
    clearCart(); // Bersihkan cart di Context
    navigation.popToTop(); // Kembali ke halaman utama Kasir
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Daftar item keranjang dari Context — real-time sync */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Rincian Pesanan ({totalItem} item)</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Keranjang kosong</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>{item.namaBarang}</Text>
              <Text style={styles.itemPrice}>{formatRupiah(item.harga)} / item</Text>
              <Text style={styles.itemSubTotal}>{formatRupiah(item.qty * item.harga)}</Text>
            </View>
            {/* Kontrol qty dan hapus — memanggil fungsi Context */}
            <View style={styles.qtyControls}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementFromCart(item.id)}>
                <Ionicons name="remove" size={18} color="#1E88E5" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => incrementInCart(item.id)}>
                <Ionicons name="add" size={18} color="#1E88E5" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-outline" size={18} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Panel Pembayaran */}
      <View style={styles.paymentSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total Tagihan:</Text>
          <Text style={styles.totalValue}>{formatRupiah(totalHarga)}</Text>
        </View>

        <Text style={styles.label}>Uang yang Diterima (Rp)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Contoh: 50000"
          value={uangBayar}
          onChangeText={setUangBayar}
        />

        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
          <Text style={styles.payBtnText}>Konfirmasi Pembayaran</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Sukses */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={64} color="#4CAF50" style={styles.modalSuccessIcon} />
            <Text style={styles.modalTitle}>Pembayaran Berhasil!</Text>
            <Text style={styles.modalSubtitle}>Kembalian</Text>
            <Text style={styles.modalKembalian}>{formatRupiah(kembalian)}</Text>

            <TouchableOpacity style={styles.doneBtn} onPress={handleSelesai}>
              <Text style={styles.doneBtnText}>Selesai & Kembali</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingBottom: 8,
  },
  cartItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  itemSubTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 26,
    textAlign: 'center',
  },
  deleteBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8,
  },
  paymentSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  payBtn: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 28,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5,
  },
  modalSuccessIcon: {
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
  },
  modalKembalian: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 6,
  },
  doneBtn: {
    backgroundColor: '#1E88E5',
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
