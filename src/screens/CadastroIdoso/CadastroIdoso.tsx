import React, { useEffect, useState } from 'react';
import {
  View, Image, Text, ScrollView, TextInput, TouchableOpacity,
  ActivityIndicator, Alert, Platform
} from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker"

import Texto from '../../../assets/dadosIdoso.png';

import { styles } from './CadastroIdosoStyles';
import { Input } from '../../components/TextInput/Input';
import { Btn } from '../../components/Btn/Btn';
import { api } from '../../services/api';
import { MaskedTextInput } from 'react-native-mask-text';
import { Picker } from '@react-native-picker/picker';

export function CadastroIdoso({ navigation }: any) {
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    cidade: '',
    estado: '',
    necessidade: '',
    numero:'',
    logradouro:'',
    nascimento: new Date(),
    responsavel:'',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  // 📍 Carrega estados do backend
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await api.get('/ibge/estados');
        const ordenados = response.data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
        setEstados(ordenados);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os estados.');
      }
    };
    fetchEstados();
  }, []);

  // 📍 Carrega cidades ao selecionar estado
  useEffect(() => {
    if (form.estado) {
      const fetchCidades = async () => {
        setLoadingCidades(true);
        try {
          const response = await api.get(`/ibge/cidades/${form.estado}`);
          const ordenadas = response.data.sort((a: any, b: any) =>
            a.nome.localeCompare(b.nome)
          );
          setCidades(ordenadas);
        } catch (error) {
          console.error(error);
          Alert.alert('Erro', 'Não foi possível carregar as cidades.');
        } finally {
          setLoadingCidades(false);
        }
      };
      fetchCidades();
    } else {
      setCidades([]);
    }
  }, [form.estado]);

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // 🧩 Formata a data para exibição e envio
  const formatarDataDisplay = (data: Date) => {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarDataEnvio = (data: Date) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  // 🧱 Função principal de cadastro
  const handleSubmit = async () => {
    if (!form.nome || !form.estado || !form.cidade) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const estadoSelecionado = estados.find(e => e.id === form.estado);
      const cidadeSelecionada = cidades.find(c => c.id === form.cidade);

      if (!estadoSelecionado || !cidadeSelecionada) {
        Alert.alert('Erro', 'Selecione um estado e cidade válidos.');
        setLoading(false);
        return;
      }

      const payload = {
        name: form.nome,
        cpf: form.cpf.replace(/\D/g, ''), // remove máscara
        foto: 'https://placehold.co/100x100',
        nascimento: formatarDataEnvio(form.nascimento),
        cidade: {
          id: cidadeSelecionada.id,
          nome: cidadeSelecionada.nome,
          estado: {
            id: estadoSelecionado.id,
            nome: estadoSelecionado.nome,
            sigla: estadoSelecionado.sigla,
          },
        },
        responsavel: form.responsavel ? { id: form.responsavel } : null,
        necessidade: form.necessidade,
        numero: form.numero,
        logradouro: form.logradouro
      };

      console.log('📦 Enviando para /idosos', payload);

      await api.post('/idosos', payload);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('❌ Erro no cadastro:', error);
      const msg = error?.response?.data || 'Erro ao cadastrar.';
      Alert.alert('Erro', String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#faf8d4' }}>
      <View style={styles.container}>
        <Image
          source={Texto}
          style={styles.imagem} />
        <View style={styles.caixatexto}>
          <Text style={styles.texto}>Nome Completo</Text>
          <Input 
          value={form.nome} 
          onChangeText={v => handleChange('nome', v)} />

          <Text style={styles.texto2}>CPF</Text>
          <MaskedTextInput
            mask="999.999.999-99"
            keyboardType="numeric"
            value={form.cpf}
            onChangeText={v => handleChange('cpf', v)}
            style={{
              backgroundColor: 'rgba(142,196,110,0.6)',
              width: 300,
              height: 45,
              borderRadius: 25,
              paddingLeft: 15,
              borderColor: 'rgba(40,55,32,0.6)',
              borderWidth: 1,
              color: '#5b3000',
              fontFamily: 'Quicksand-Regular',
            }}
          />

          <Text style={styles.texto2}>Data de Nascimento</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(142,196,110,0.6)',
              width: 300,
              height: 45,
              borderRadius: 25,
              borderColor: 'rgba(40,55,32,0.6)',
              borderWidth: 1,
              justifyContent: 'center', // centraliza verticalmente
              // centraliza horizontalmente
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={{
                color: '#5b3000',
                fontFamily: 'Quicksand-Regular',
                marginHorizontal: 18, // pequena margem lateral

              }}
            >
              {formatarDataDisplay(form.nascimento)}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={form.nascimento}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) handleChange('nascimento', selectedDate);
              }}
            />
          )}
          <Text style={styles.texto2}>Estado</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.estado}
              onValueChange={itemValue => {
                handleChange('estado', itemValue);
                handleChange('cidade', '');
              }}
            >
              <Picker.Item label="Selecione o Estado" value="" />
              {estados.map(estado => (
                <Picker.Item key={estado.id} label={estado.nome} value={estado.id} />
              ))}
            </Picker>
          </View>

          <Text style={styles.texto2}>Cidade</Text>
          <View style={styles.pickerContainer}>
            {loadingCidades ? (
              <ActivityIndicator size="small" color="#333" />
            ) : (
              <Picker
                selectedValue={form.cidade}
                onValueChange={itemValue => handleChange('cidade', itemValue)}
                enabled={!!form.estado}
              >
                <Picker.Item label="Selecione a Cidade" value="" />
                {cidades.map(cidade => (
                  <Picker.Item key={cidade.id} label={cidade.nome} value={cidade.id} />
                ))}
              </Picker>
            )}
          </View>
          <Text style={styles.texto2}>Endereço</Text>
          <Input 
          value={form.logradouro} 
          onChangeText={v => handleChange('logradouro', v)} 
          placeholder="Ex: Rua Casa Idoso"
          />

          <Text style={styles.texto2}>Número</Text>
          <Input 
          value={form.numero} 
          onChangeText={v => handleChange('numero', v)} />

          <Text style={styles.texto2}>Necessidade Especial</Text>
          <Input 
          value={form.necessidade} 
          onChangeText={v => handleChange('necessidade', v)} 
          placeholder="Ex: Acamado"/>

        </View>
        <View style={styles.botao}>
          {loading ? (
            <ActivityIndicator size="large" color="#333" />
          ) : (
            <Btn texto="Cadastrar" onPress={handleSubmit} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}