import React from 'react';
import {View, Text, Image} from 'react-native';

const Kontak = ({nama, telp, foto}) => {
  return (
    <View style={{
      flexDirection:'row',
      padding:10,
      borderBottomWidth:1,
      backgroundColor:'lightgrey'
    }}>

      <Image 
        source={foto}
        style={{width:50, height:50, borderRadius:25}}
      />

      <View style={{marginLeft:10}}>
        <Text style={{fontWeight:'bold'}}>{nama}</Text>
        <Text style={{color:'blue'}}>{telp}</Text>
      </View>

    </View>
  );
}

export {Kontak};
