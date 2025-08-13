import React, { useState } from 'react';
import { View, Image, Text, ScrollView, StatusBar } from 'react-native';
import Texto from '../../../assets/dados.png';
import { Picker } from '@react-native-picker/picker';

import { styles } from './CadastroFamStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function CadastroFam() {
  const [selectedProfissao, setSelectedProfissao] = useState();

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
            <View style={styles.pickerContainer}> 
            <Picker
                selectedValue={selectedProfissao}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedProfissao(itemValue)}>
                <Picker.Item label="Selecione" value={null} />
                <Picker.Item label="Mãe" value="Mãe" />
                <Picker.Item label="Pai" value="Pai" />
                <Picker.Item label="Filho(a)" value="Filho(a)" />
                <Picker.Item label="Neto(a)" value="Neto(a)" />
                <Picker.Item label="Irmã(o)" value="Irmã(o)" />
                <Picker.Item label="Nora" value="Nora" />
                <Picker.Item label="Genro" value="Genro" />
              </Picker>
            </View>
            <Text style={styles.texto2}>Telefone</Text>
            <Input/>
            <Text style={styles.texto2}>Cidade</Text>
            <Input/>
            <Text style={styles.texto2}>Estado</Text>
            <Input/>
        </View>
        <View style={styles.botao}>
              <Botao texto='Avançar' navegacao='Idoso'/>
        </View>
    </View>
    </ScrollView>
  );
}