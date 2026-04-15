import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Kontak} from '../components/kontak';
import {styles} from '../assets/style';

export default function Tugas2Screen() {
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>Kontak Kink Youtube</Text>

      <Kontak 
        nama="Bigmo University"
        telp="08123456789"
        foto={require('../../assets/bigmo.jpg')}
      />

      <Kontak 
        nama="Slebew Gaming"
        telp="01238123123"
        foto={require('../../assets/mungkung.jpg')}
      />

      <Kontak 
        nama="Robby Pantjoro"
        telp="1203102313"
        foto={require('../../assets/robby.jpg')}
      />

      <Kontak 
        nama="Dea Afrizal"
        telp="0823912313"
        foto={require('../../assets/dea.jpg')}
      />

      <Kontak 
        nama="Web Programmer UNPAS"
        telp="08334567892"
        foto={require('../../assets/unpasweb.jpg')}
      />

      <Kontak 
        nama="Programmer Zaman Now"
        telp="12390213132"
        foto={require('../../assets/jamannow.jpg')}
      />

    </ScrollView>
  );
}
