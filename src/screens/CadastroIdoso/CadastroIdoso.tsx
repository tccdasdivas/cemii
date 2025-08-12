import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"
import { Formik } from 'formik';
import * as Yup from 'yup';

import Texto from '../../../assets/dadosIdoso.png';

import { styles } from './CadastroIdosoStyles';
import { Input } from '../../components/TextInput/Input';
import { Botao } from '../../components/Botao/Botao';

export function CadastroIdoso() {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  
  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    };
  
  const formattedDate = date ? date.toLocaleDateString('pt-BR'): '';

  const CadastroSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato inválido (use 000.000.000-00)')
    .required('CPF é obrigatório'),
    dataNascimento: Yup.date().nullable().required('Data de aniversário é obrigatória'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    necessidade: Yup.string().required('Necessidade especial é obrigatória')
  });

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
            <Text style={styles.texto2}>Endereço</Text>
            <Input/>
            <Text style={styles.texto2}>Número</Text>
            <Input/>
            <Text style={styles.texto2}>Cidade</Text>
            <Input/>
            <Text style={styles.texto2}>Necessidade Especial</Text>
            <Input/>
        </View>
        <View style={styles.botao}>
              <Botao texto='Avançar' navegacao='FamiliaEmail'/>
        </View>
    </View>
    </ScrollView>
  );
}