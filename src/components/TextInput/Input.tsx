import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './InputStyles';

// Aqui o componente herda TODAS as props do TextInput nativo
export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={styles.input} {...rest} />;
}