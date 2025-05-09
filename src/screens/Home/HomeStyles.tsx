import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imagem:{
    width:450,
    height:300,
    position:'absolute'
  },
  icones:{
    flexDirection:'row',
    marginTop:60
  },
  icone1:{
    borderColor:'#c89a65',
    borderWidth:2,
    color:"#5b3000",
    borderRadius:20,
    marginLeft:20,
    backgroundColor:'#ece3b8',
    padding:3,
  },
  icone2:{
    flex:3,
    justifyContent:'flex-end',
    backgroundColor:'#5b3000',
    borderColor:'#c89a65'
  }
})