import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialProducts } from '../data/dummyData';

const PRODUCTS_KEY = '@tokoibu_products';

export const loadProducts = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(PRODUCTS_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    // Jika belum ada data, simpan data dummy dan kembalikan
    await saveProducts(initialProducts);
    return initialProducts;
  } catch (e) {
    console.error('Error loading products', e);
    return initialProducts;
  }
};

export const saveProducts = async (products) => {
  try {
    const jsonValue = JSON.stringify(products);
    await AsyncStorage.setItem(PRODUCTS_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving products', e);
  }
};
