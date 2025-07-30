import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatFavoritosStyles';

import FontAwesome from '@expo/vector-icons/FontAwesome';


import Manoel from '../../../assets/manoel.png';

type Propriedades = {
  border:number,
  background:string,
  bordercolor:string,
  coracao:string,
  bordaimg:string,
};

export function ChatFavoritos(props: Propriedades) {
  return (
     <TouchableOpacity style={{borderRadius:props.border,
          backgroundColor:props.background, 
          borderColor:props.bordercolor,
          borderWidth:1.5,
          marginTop:17,
          }}>
        <View style={styles.perfil}>
            <Image 
            source={Manoel}
            style={{width:80,
                    height:80,
                    borderRadius:40,
                    borderColor:props.bordercolor,
                    borderWidth:2,
                    alignSelf:'center'}}
            />
            <View style={{marginLeft:20, marginTop:15}}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.texto1}>Manoel Gomes</Text>
                  <FontAwesome 
                  name="heart" 
                  size={20} 
                  style={{marginLeft:60, marginTop:-3, color:props.coracao}}/>
              </View>
              <Text style={styles.texto2}>Vamos marcar!!</Text>
            </View>
          </View>
      </TouchableOpacity>
  );
}