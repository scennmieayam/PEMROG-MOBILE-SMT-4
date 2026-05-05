import React from 'react';
import {View, Text} from 'react-native';
import {Counter} from '../components/Counter';
import {Pesan} from '../components/Pesan';

export default function Tugas3Screen() {
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    }}>

      <Text style={{
        fontWeight:'bold',
        marginBottom:20,
        fontSize: 18
      }}>
        Belajar Props dan State
      </Text>

      <Pesan />

      <Counter />

    </View>
  );
}
