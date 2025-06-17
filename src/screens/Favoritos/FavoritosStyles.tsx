import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
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
  fundo:{
    width:'100%',
    height:'100%',
    position:'absolute',
    opacity:0.3
  },
  box1:{
    backgroundColor:'#e7d5ab',
    borderColor:'#c89a65',
    borderWidth:1.5, 
    borderRadius:10,
    height:170,
    flexDirection:'row',
    width:'100%',
  },
  texto:{ 
    fontFamily:'OpenSans-Bold',
    fontSize:40, 
    color:'#7d5220'
  },
  boxtexto:{
    justifyContent:'center',
    alignItems:'center',
    width:'75%'
  }
});