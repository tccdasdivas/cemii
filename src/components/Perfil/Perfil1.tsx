import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './PerfilStyles';

import { useNavigation } from '@react-navigation/native';

type Propriedades = {
  navegacao: string;
};

export function Perfil1(props: Propriedades) {

  const navigation = useNavigation();

  return (
    <View style={styles.contperfil1}>
      <View style={styles.boxperfil1}>
        <TouchableOpacity 
        onPress={()=> navigation.navigate(props.navegacao)}
        style={{width:'17%'}}>
          <Ionicons name="person" size={40} style={styles.perfil1}/>
        </TouchableOpacity>
      </View>
    </View> 
  );
}