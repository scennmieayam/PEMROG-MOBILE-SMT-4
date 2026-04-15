import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

const Counter = () => {
  const [jumlah, setJumlah] = useState(0); //state (simpan data)

  return (
    <View style={{alignItems:'center', marginTop:30}}>

  <Text style={{marginBottom:10}}>
    Jumlah: {jumlah}
  </Text>

  <View style={{flexDirection:'row'}}>
    <View style={{marginRight:10}}>
      <Button title="TAMBAH" onPress={() => setJumlah(jumlah + 1)} />
    </View>

    <View style={{marginRight:10}}>
      <Button title="KURANG" onPress={() => setJumlah(jumlah - 1)} />
    </View>

    <View>
      <Button title="RESET" onPress={() => setJumlah(0)} />
    </View>
  </View>

</View>
  );
}

export {Counter};
