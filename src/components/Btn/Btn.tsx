import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './BtnStyles';

interface BotaoProps {
  texto: string;
  onPress: () => void;
}

export function Btn({ texto, onPress }: BotaoProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{texto}</Text>
    </TouchableOpacity>
  );
}