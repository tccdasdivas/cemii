import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Texto from '../../../assets/dados.png';

import { styles } from './CadastroFamStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function CadastroFam() {
  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
    <View style={styles.container}>
        <Image
        source={Texto}
        style={styles.imagem}/>
        <View style={styles.caixatexto}>
            <Text style={styles.texto}>Nome Completo</Text>
            <Input/>
            <Text style={styles.texto2}>CPF</Text>
            <Input/>
        </View>
    </View>
    </ScrollView>
  );
}