import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
    flex:1,
  },
  seta:{
    color:'#5b3000',
  },
  icone:{ 
    alignItems:'center', 
    marginLeft:15
  },
  box1:{
    backgroundColor:'#e7d5ab',
    borderColor:'#c89a65',
    borderWidth:2.5, 
    borderRadius:10,
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    paddingTop:30,
    paddingBottom:20,
  },
  texto1:{ 
    fontFamily:'Quicksand-Bold',
    fontSize:20, 
    color:'#5b3000'
  },
  texto2:{
    fontFamily:'Quicksand-Bold',
    fontSize:15, 
    color:'#c89a65'
  },
  img:{
    width:70,
    height:70,
    borderRadius:40,
    borderColor:'#7d5220',
    borderWidth:2.5,
    alignSelf:'center',
  },
});