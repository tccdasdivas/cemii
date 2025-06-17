import React from 'react';
import { View, Text } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './PerfilStyles';

export function Perfil1() {
  return (
    <View style={styles.contperfil1}>
      <View style={styles.boxperfil1}>
        <View style={{width:'17%'}}>
          <Ionicons name="person" size={40} style={styles.perfil1}/>
        </View>
      </View>
    </View> 
  );
}