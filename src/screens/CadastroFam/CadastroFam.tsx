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
            <Text style={styles.texto2}>Grau de parentesco</Text>
            <Input/>
            <Text style={styles.texto2}>Telefone</Text>
            <Input/>
            <Text style={styles.texto2}>Cidade</Text>
            <Input/>
            <Text style={styles.texto2}>Estado</Text>
            <Input/>
            <Text style={styles.texto2}>Email</Text>
            <Input/>
            <Text style={styles.texto2}>Senha</Text>
            <Input/>
        </View>
        <View style={styles.botao}>
              <Botao texto='Avançar' navegacao='Idoso'/>
        </View>
    </View>
    </ScrollView>
  );
}