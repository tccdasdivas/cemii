import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './PerfilStyles';

import { useNavigation } from '@react-navigation/native';

type Propriedades = {
  navegacao: string;
};

export function Perfil2(props: Propriedades) {

  const navigation = useNavigation();

  return (
    <View style={styles.contperfil2}>
      <View style={styles.boxperfil2}>
      <TouchableOpacity 
        onPress={()=> navigation.navigate(props.navegacao)}
        style={{width:'17%'}}>
          <Ionicons name="person" size={40} style={styles.perfil2}/>
        </TouchableOpacity>
      </View>
    </View> 
  );
}