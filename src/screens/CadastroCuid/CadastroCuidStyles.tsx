import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor:'#faf8d4'
  },
  imagem:{
    width:300,
    height:100,
  },
  caixatexto:{
    alignItems:'baseline',
    marginTop:20,
  },
  texto:{
    color:'#5b3000',
    fontFamily:'Quicksand-Regular',
    fontSize:20,
    paddingBottom:5,
    paddingLeft:5,
  },
  texto2:{
    color:'#5b3000',
    fontFamily:'Quicksand-Regular',
    fontSize:20,
    paddingBottom:5,
    paddingLeft:5,
    marginTop: 10,
  },
  botao:{
    marginTop:40,
    marginBottom:10,
    alignItems:'center',
    justifyContent:'center'
  },
  logo:{
    width:10,
  },
  input:{
    backgroundColor:'rgba(142,196,110 / 0.6)',
    width:300,
    height:45,
    borderRadius:25,
    paddingLeft:15,
    alignItems:'center',
    borderColor:'rgba(40,55,32/ 0.6)',
    borderWidth:1,
    color:'#5b3000',
    fontFamily:'Quicksand-Regular',
  }
})