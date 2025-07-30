import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatListStyles';


import Manoel from '../../../assets/manoel.png';

import { useNavigation } from '@react-navigation/native';

type Propriedades = {
  border:number,
  background:string,
  bordercolor:string,
};

export function ChatList(props: Propriedades) {
    const navigation = useNavigation();

    const [fontsLoaded, setFontsLoaded] = useState(false);

  return (
    <View>
      <TouchableOpacity 
       onPress={()=> navigation.navigate('Menssagem')}
          style={{borderRadius:props.border,
          backgroundColor:props.background, 
          borderColor:props.bordercolor,
          borderWidth:1.5,
          marginTop:17,
          }}>
          <View style={styles.perfil}>
            <Image 
            source={Manoel}
            style={styles.img}/>
            <View style={{marginLeft:20, marginTop:15}}>
              <Text style={styles.texto1}>Manoel Gomes</Text>
              <Text style={styles.texto2}>Vamos marcar!!</Text>
            </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}