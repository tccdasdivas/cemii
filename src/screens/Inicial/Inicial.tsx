import React from 'react';
import { View , Image, Text, ScrollView } from 'react-native';
import { Logo } from '../../components/Logo/Logo';


import { styles } from './InicialStyles';
import { Botao } from '../../components/Botao/Botao';

export function Inicial() {
  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
    <View style={styles.container}>
      <Logo/>
        <View style={{marginTop:80, alignItems:'center'}}>
          <Botao texto='Cadastrar-se' navegacao='Escolha'/>
          <Text style={styles.texto}>ou</Text>
          <Botao texto='Entrar' navegacao='Entrar'/>
        </View>
    </View>
    </ScrollView>
  );
}