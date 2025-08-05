import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"

import Texto from '../../../assets/dados.png';

import { styles } from './CadastroCuidStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function CadastroCuid() {

  const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
  
     const handleChange = (event: any, selectedDate?: Date) => {
      setShowPicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };
  
    const formattedDate = date.toLocaleDateString('pt-BR');
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
                value={date}
                onChange={handleChange}
                />
              )}
            </View>
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