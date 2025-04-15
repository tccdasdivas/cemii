import React from 'react';
import { TextInput } from 'react-native';

import { styles } from './PesquisarStyles';

export function Pesquisar() {

  const [text, onChangeText] = React.useState('Pesquise...');

  return (
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
  );
}