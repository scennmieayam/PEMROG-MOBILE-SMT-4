import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default function Tugas4Screen() {

  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  // tambah item
  const tambahItem = () => {
    if (input !== '') {
      setList([...list, input]);
      setInput('');
    }
  }

  // hapus item
  const hapusItem = (index) => {
    const dataBaru = list.filter((item, i) => i !== index);
    setList(dataBaru);
  }

  return (
    <View style={{flex:1, padding:45}}>

      {/* judul */}
      <Text style={{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10
      }}>
        Daftar Belanja
      </Text>

      {/* input + tombol */}
      <View style={{flexDirection:'row', marginBottom:10}}>

        <TextInput
          placeholder="Masukkan barang"
          value={input}
          onChangeText={(text) => setInput(text)}
          style={{
            borderWidth:1,
            flex:1,
            marginRight:10,
            padding:5
          }}
        />

        <Button title="Tambah" onPress={tambahItem} />

      </View>

      {/* list */}
      {list.map((item, index) => (
        <View key={index} style={{
          flexDirection:'row',
          justifyContent:'space-between',
          marginBottom:10,
          padding:10,
          backgroundColor:'#eee'
        }}>

          <Text>{index + 1}. {item}</Text>

          <Button 
            title="Hapus"
            color="red"
            onPress={() => hapusItem(index)}
          />

        </View>
      ))}

    </View>
  );
}
