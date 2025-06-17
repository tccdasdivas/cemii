import React from 'react';
import { View, Text } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './PerfilStyles';

export function Perfil2() {
  return (
    <View style={styles.contperfil2}>
      <View style={styles.boxperfil2}>
        <View style={{width:'17%'}}>
          <Ionicons name="person" size={40} style={styles.perfil2}/>
        </View>
      </View>
    </View> 
  );
}