import React from 'react';
import { TextInput, View } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

import { styles } from './PesquisarStyles';

export function Pesquisar() {

  const [text, onChangeText] = React.useState('Pesquise...');

  return (
    <View style={styles.input}>
      <EvilIcons name="search" size={24} color="#5b3000" />
      <TextInput
        style={styles.input2}
        onChangeText={onChangeText}
        value={text}
        />
    </View>
  );
}