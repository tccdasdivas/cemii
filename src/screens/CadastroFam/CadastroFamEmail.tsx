import React from 'react';
import { View, Image, Text, StatusBar } from 'react-native';

import FotoLogo from '../../../assets/logo.png';

import { styles } from './CadastroFamStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function CadastroFamEmail() {
  return (
    <View style={styles.container}>
        <View style={styles.caixatexto}>
            <Text style={styles.texto2}>Email</Text>
            <Input/>
            <Text style={styles.texto2}>Senha</Text>
            <Input/>
        </View>
        <View style={styles.botao}>
              <Botao texto='Cadastrar' navegacao='Idoso'/>
        </View>
        <Image 
        source={FotoLogo}
        style={styles.img}/>
    </View>
  );
}