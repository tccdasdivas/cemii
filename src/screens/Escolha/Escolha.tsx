import React from 'react';
import { View , Image, Text, ScrollView } from 'react-native';
import  EscolhaImg  from '../../../assets/escolha.png';

import { styles } from './EscolhaStyles';
import { Botao } from '../../components/Botao/Botao';

export function Escolha() {
  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
      <View style={styles.container}>
        <Image
          source={EscolhaImg}
          style={styles.imagem}/>

        <View style={{marginTop:100, alignItems:'center'}}>
          <Botao texto='Cuidador/Enfermeiro' navegacao='Cuidador'/>
          <Text style={styles.texto}>ou</Text>
          <Botao texto='Familia/Idoso' navegacao='Familia'/>
        </View>
      </View>
    </ScrollView>
  );
}