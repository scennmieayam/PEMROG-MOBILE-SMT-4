import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { loadProducts, saveProducts } from '../utils/storage';

export default function FormProdukScreen({ route, navigation }) {
  const { productToEdit } = route.params || {};

  const [namaBarang, setNamaBarang] = useState('');
  const [harga, setHarga] = useState('');
  const [sisaStok, setSisaStok] = useState('');
  // Untuk kesederhanaan, gambar di set default jika kosong
  const [gambar, setGambar] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80');

  useEffect(() => {
    if (productToEdit) {
      setNamaBarang(productToEdit.namaBarang);
      setHarga(productToEdit.harga.toString());
      setSisaStok(productToEdit.sisaStok.toString());
      setGambar(productToEdit.gambar);
    }
  }, [productToEdit]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      if (Platform.OS === 'web') {
        window.alert('Izin mengakses galeri ditolak!');
      } else {
        Alert.alert('Izin Ditolak', 'Aplikasi membutuhkan izin untuk mengakses galeri.');
      }
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setGambar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!namaBarang || !harga || !sisaStok) {
      Alert.alert('Form Belum Lengkap', 'Harap isi semua field.');
      return;
    }

    try {
      const currentProducts = await loadProducts();
      let updatedProducts = [];

      if (productToEdit) {
        // Mode Edit
        updatedProducts = currentProducts.map(item =>
          item.id === productToEdit.id
            ? {
              ...item,
              namaBarang,
              harga: parseInt(harga, 10),
              sisaStok: parseInt(sisaStok, 10),
              gambar
            }
            : item
        );
      } else {
        // Mode Tambah Baru
        const newProduct = {
          id: Date.now().toString(),
          namaBarang,
          harga: parseInt(harga, 10),
          sisaStok: parseInt(sisaStok, 10),
          gambar
        };
        updatedProducts = [...currentProducts, newProduct];
      }

      await saveProducts(updatedProducts);
      Alert.alert('Sukses', 'Data produk berhasil disimpan.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan produk.');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Hapus Barang",
      `Apakah Anda yakin ingin menghapus ${namaBarang}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const currentProducts = await loadProducts();
              const updatedProducts = currentProducts.filter(item => item.id !== productToEdit.id);
              await saveProducts(updatedProducts);
              Alert.alert('Sukses', 'Barang berhasil dihapus.', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } catch (error) {
              Alert.alert('Error', 'Gagal menghapus produk.');
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nama Barang</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Sabun Mandi"
          value={namaBarang}
          onChangeText={setNamaBarang}
        />

        <Text style={styles.label}>Harga (Rp)</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 5000"
          keyboardType="numeric"
          value={harga}
          onChangeText={setHarga}
        />

        <Text style={styles.label}>Sisa Stok</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 100"
          keyboardType="numeric"
          value={sisaStok}
          onChangeText={setSisaStok}
        />

        <Text style={styles.label}>Gambar Produk</Text>
        <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Pilih dari Galeri</Text>
        </TouchableOpacity>
        
        {gambar ? (
          <Image source={{ uri: gambar }} style={styles.previewImage} />
        ) : null}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Simpan Produk</Text>
        </TouchableOpacity>

        {productToEdit && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Hapus Produk</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 16,
  },
  imagePickerBtn: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#64B5F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: '#1E88E5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#F44336', // Merah
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  deleteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
