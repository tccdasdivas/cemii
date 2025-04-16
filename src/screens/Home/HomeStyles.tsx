import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imagem:{
    width:400,
    height:300,
    position:'absolute'
  },
  icones:{
    flexDirection:'row',
    marginTop:40
  },
  icone1:{
    flex:3,
    paddingLeft:20,
    backgroundColor:'#ece3b8',
    borderColor:'#c89a65'
  },
  icone2:{
    flex:3,
    justifyContent:'flex-end',
    backgroundColor:'#5b3000',
    borderColor:'#c89a65'
  }
})