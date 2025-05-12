import React from 'react';
import { TextInput, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { styles } from './PesquisarStyles';

export function Pesquisar() {

  const [text, onChangeText] = React.useState('Pesquise...');

  return (
    <View style={styles.input}>
      <AntDesign name="search1" size={22} color="#5b3000" />
      <TextInput
        style={styles.input2}
        onChangeText={onChangeText}
        value={text}
        />
    </View>
  );
}