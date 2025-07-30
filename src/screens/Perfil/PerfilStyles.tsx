import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imagem:{
    width:'100%',
    height:400,
    position:'absolute'
  },
  seta:{
    color:'#5b3000',
    borderColor:'#c89a65',
    borderWidth:3,
    borderRadius:50
  },
  icone:{ 
    width:'12%', 
    alignItems:'center', 
    marginLeft:15
  },
  img:{
    borderRadius:90,
    borderColor:'#c89a65',
    borderWidth:2,
    width:170,
    height:170,
  },
   box:{
    backgroundColor:'#faf8d4',
    borderRadius:50,
    marginTop:100,
    height:600,
    width:'100%',
    alignItems:'center',
    borderColor:'#c89a65',
    borderWidth:2,
  },
  box2:{
    backgroundColor:'#e7d5ab',
    borderRadius:50,
    marginTop:100,
    height:300,
    width:'80%',
    alignItems:'center',
    justifyContent:'center'
  },
  box3:{
    backgroundColor:'#faf8d4',
    borderRadius:50,
    height:280,
    width:'94%',
    justifyContent: 'center',
  },
  texto:{
    color:'#725431',
    fontFamily:'Quicksand-Regular',
    fontSize:25,
    marginTop:40,
    marginLeft:10
  }
});