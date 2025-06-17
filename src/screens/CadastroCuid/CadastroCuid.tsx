import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Texto from '../../../assets/dados.png';


import { styles } from './CadastroCuidStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function CadastroCuid() {
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
            <Text style={styles.texto2}>Qual a sua profissão</Text>
            <Input/>
            <Text style={styles.texto2}>Telefone</Text>
            <Input/>
            <Text style={styles.texto2}>Cidade</Text>
            <Input/>
            <Text style={styles.texto2}>Data de nascimento</Text>
            <Input/>
            <Text style={styles.texto2}>Email</Text>
            <Input/>
            <Text style={styles.texto2}>Senha</Text>
            <Input/>
        </View>
        <View style={styles.botao}>
              <Botao texto='Cadastrar' navegacao='Home'/>
        </View>
    </View>
    </ScrollView>
  );
}