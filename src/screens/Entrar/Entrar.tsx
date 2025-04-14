import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import BemVindo from '../../../assets/Bemvindo.png';

import { styles } from './EntrarStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function Entrar() {
  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
    <View style={styles.container}>
        <Image
        source={BemVindo}
        style={styles.imagem}/>
        <View style={styles.caixatexto}>
          <Text style={styles.texto}>Email</Text>
          <Input/>
          <View style={{marginTop:20}}>
            <Text style={styles.texto}>Senha</Text>
            <Input/>
          </View>
        </View>
        <View style={{marginTop:60}}>
          <Botao texto='Entrar' navegacao='Home'/>
        </View>
    </View>
    </ScrollView>
  );
}