import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Total harga dan item dihitung otomatis dari cart (derived state)
  const totalHarga = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
  const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);

  // Tambah produk ke keranjang, atau increment jika sudah ada
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        if (existing.qty >= product.sisaStok) return prev; // Sudah maksimum stok
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Tambah qty di Checkout (dengan batas stok)
  const incrementInCart = (productId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === productId);
      if (!existing || existing.qty >= existing.sisaStok) return prev;
      return prev.map(i => i.id === productId ? { ...i, qty: i.qty + 1 } : i);
    });
  };

  // Kurangi qty; otomatis hapus jika qty = 1
  const decrementFromCart = (productId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === productId);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(i => i.id !== productId);
      return prev.map(i => i.id === productId ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  // Hapus langsung dari keranjang — total harga otomatis berkurang
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.id !== productId));
  };

  // Reset semua setelah transaksi selesai
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart,
      totalHarga,
      totalItem,
      addToCart,
      incrementInCart,
      decrementFromCart,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook shortcut agar mudah digunakan di setiap layar
export const useCart = () => useContext(CartContext);
