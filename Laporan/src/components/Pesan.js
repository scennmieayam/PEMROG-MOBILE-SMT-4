import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';

const Pesan = () => {
  const [tampil, setTampil] = useState(false);
  const [pesan, setPesan] = useState('');

  useEffect(() => {
    if (tampil) {
      setPesan("Selamat Datang Mahasigma STIKOM");
      
    } else {
      setPesan(' ');
    }
  }, [tampil]);

  return (
    <View style={{alignItems:'center', marginTop:10}}>

      <Text style={{marginBottom:10}}>
        {pesan}
      </Text>

      <Button title="TEKAN" onPress={() => setTampil(!tampil)}/>

</View>
  );
}

export {Pesan};
