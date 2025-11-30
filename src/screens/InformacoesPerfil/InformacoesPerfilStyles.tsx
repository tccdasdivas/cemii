import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#faf8d4'
  },
  seta:{
    color:'#5b3000',
    borderColor:'#c89a65',
    borderWidth:3,
    borderRadius:50
  },
  img:{
    width:200,
    height:200,
    marginTop:20,
    borderRadius:100,
    borderColor:'#7d5220',
    borderWidth:2
  },
  texto:{
    color:'#725431',
    fontFamily:'Quicksand-Bold',
    fontSize:25,
    marginLeft:10,
    marginTop:10,
  },
  texto1:{
    color:'#725431',
    fontFamily:'Quicksand-Regular',
    fontSize:22,
    marginLeft:10,
    marginTop:10,
   
  },
  icone:{
    marginTop:50, 
    width:'12%', 
    alignItems:'center', 
    marginLeft:15
  },
  fundo:{
    width:'100%',
    height:'100%',
    position:'absolute',
  },
  box:{
    width:'95%',
    backgroundColor:'#faf8d4',
    borderRadius:50,
    height:"70%",
    padding:13,
    marginTop:25,
    alignItems:'center'
  },
});