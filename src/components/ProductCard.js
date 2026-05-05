import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ namaBarang, harga, sisaStok, gambar, onPress, badge }) => {
  // Format harga ke Rupiah
  const formatRupiah = (angka) => {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <TouchableOpacity 
      style={[styles.card, badge > 0 && styles.cardActive]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View>
        <Image source={{ uri: gambar }} style={styles.image} />
        {badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{namaBarang}</Text>
        <Text style={styles.price}>{formatRupiah(harga)}</Text>
        <Text style={styles.stock}>Sisa Stok: {sisaStok}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4CAF50', // Hijau cerah
    marginBottom: 4,
  },
  stock: {
    fontSize: 13,
    color: '#888',
  },
  cardActive: {
    borderWidth: 1.5,
    borderColor: '#1E88E5',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#1E88E5',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default ProductCard;
