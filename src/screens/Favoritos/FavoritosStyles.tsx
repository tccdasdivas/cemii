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
    borderWidth:2.5, 
    borderRadius:10,
    height:170,
    flexDirection:'row',
    width:'100%',
  },
  texto:{ 
    fontFamily:'OpenSans-Bold',
    fontSize:35, 
    color:'#7d5220'
  },
  boxtexto:{
    justifyContent:'center',
    alignItems:'center',
    width:'75%'
  },

  box2:{
    width:'98%',
    marginLeft:5,
    marginTop:10
  },
  texto1: {
    color: "#5b3000",
    fontFamily: "Brixton-Regular",
    fontSize: 25,
  },
  texto2: {
    color: "#5b3000",
    fontFamily: "Brixton-Regular",
    fontSize: 19,
  },
  texto3: {
    color: "#7d5220",
    fontFamily: "Brixton-Regular",
    fontSize: 19,
    flexWrap: "wrap",
  },
});