import React from 'react';
import { View , Image } from 'react-native';
import FotoLogo from '../../../assets/logo.png';

import { styles } from './LogoStyles';

export function Logo() {
  return (
    <View>
      <Image 
      source={FotoLogo}
      style={styles.imagem}/>
    </View>
  );
}