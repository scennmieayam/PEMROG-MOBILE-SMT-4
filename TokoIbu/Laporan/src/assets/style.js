import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:'#f2f2f2'
  },
  header:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical: 20 // Changed from marginTop: 50 for better layout in Stack
  }
});

export {styles};
