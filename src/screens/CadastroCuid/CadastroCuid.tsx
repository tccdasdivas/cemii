import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"
import { Picker } from '@react-native-picker/picker';

import Texto from '../../../assets/dados.png';

import { styles } from './CadastroCuidStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';
import { StatusBar } from 'expo-status-bar';

export function CadastroCuid() {

  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedProfissao, setSelectedProfissao] = useState();

  
  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };
  
  const formattedDate = date ? date.toLocaleDateString('pt-BR'): '';
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
            <View style={styles.pickerContainer}> 
              <Picker
                selectedValue={selectedProfissao}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedProfissao(itemValue)}>
                <Picker.Item label="Selecione" value={null} />
                <Picker.Item label="Enfermeiro(a)" value="Enfermeiro(a)" />
                <Picker.Item label="Cuidador(a) de Idosos" value="Cuidador(a) de Idoso" />
              </Picker>
            </View>
            <Text style={styles.texto2}>Telefone</Text>
            <Input/>
            <Text style={styles.texto2}>Cidade</Text>
            <Input/>
            <View>
              <Text style={styles.texto2}>Data de aniversario</Text>
              <TouchableOpacity onPress={() => setShowPicker(true)}>
                <TextInput
                style={styles.input}
                value={formattedDate}
                editable={false} 
                />
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                mode="date"
                display="spinner"
                value={date ?? new Date()}
                onChange={handleChange}
                />
              )}
            </View>
        </View>
        <View style={styles.botao}>
              <Botao texto='Avançar' navegacao='CuidadorEmail'/>
        </View>
    </View>
    <StatusBar style="auto"/>
    </ScrollView>
  );
}