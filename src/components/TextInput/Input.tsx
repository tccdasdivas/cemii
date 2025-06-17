import React from 'react';
import { TextInput } from 'react-native';

import { styles } from './InputStyles';

export function Input() {

  const [text, onChangeText] = React.useState('');

  return (
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
  );
}