import React from 'react';
import { View, Text } from 'react-native';

export default function Tugas1Screen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
      <Text
        style={{
          marginTop: 50,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Latihan Flexbox
      </Text>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 50, height: 50, backgroundColor: 'black' }} />
        <View style={{ width: 35, height: 35, borderRadius: 50, backgroundColor: 'green' }} />
        <View style={{ width: 35, height: 35, borderRadius: 50, backgroundColor: 'red' }} />
        <View style={{ width: 35, height: 35, borderRadius: 50, backgroundColor: 'blue' }} />
      </View>

      <View style={{ flex: 2, backgroundColor: 'yellow' }}>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start', // Diubah dari 'top' karena 'top' tidak valid di React Native, harus menggunakan 'flex-start'
          }}
        >
          <View style={{ width: 70, height: 70, backgroundColor: 'red' }} />
          <View style={{ width: 70, height: 70, backgroundColor: 'blue' }} />
          <View style={{ width: 70, height: 70, backgroundColor: 'green' }} />
        </View>

        <View style={{ flex: 3, backgroundColor: 'green' }}>
          <View
            style={{
              flexDirection: 'column',
            }}
          >
            <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
            <View style={{ width: 100, height: 100, backgroundColor: 'yellow' }} />
            <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
          </View>
        </View>
      </View>
    </View>
  );
}
