import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, Alert, ActivityIndicator,
  Platform, TouchableOpacity
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '../../services/api';
import { styles } from './CadastroFamStyles';
import { Input } from '../../components/TextInput/Input';
import Texto from '../../../assets/dados.png';
import { Btn } from '../../components/Btn/Btn';
import { MaskedTextInput } from 'react-native-mask-text';
import { Botao } from '../../components/Botao/Botao';

export function CadastroFam({ navigation }: any) {
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    cidade: '',
    estado: '',
    email: '',
    senha: '',
    parentesco: '',
    nascimento: new Date(),
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
    if (!form.nome || !form.email || !form.senha || !form.estado || !form.cidade) {
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
        email: form.email,
        password: form.senha,
        telefone: form.telefone.replace(/\D/g, ''), // remove máscara
        cpf: form.cpf.replace(/\D/g, ''), // remove máscara
        foto: 'https://placehold.co/100x100',
        nascimento: formatarDataEnvio(form.nascimento),
        parentesco: form.parentesco,
        cidade: {
          id: cidadeSelecionada.id,
          nome: cidadeSelecionada.nome,
          estado: {
            id: estadoSelecionado.id,
            nome: estadoSelecionado.nome,
            sigla: estadoSelecionado.sigla,
          },
        },
        tipo:'RESPONSAVEL',
      };

      console.log('📦 Enviando para /auth/register:', payload);

      const response = await api.post("/auth/register", payload);

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Idoso');
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
        <Image source={Texto} style={styles.imagem} />

        <View style={styles.caixatexto}>
          <Text style={styles.texto}>Nome Completo</Text>
          <Input value={form.nome} onChangeText={v => handleChange('nome', v)} />

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

          <Text style={styles.texto2}>Grau de Parentesco</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.parentesco}
              onValueChange={itemValue => handleChange('parentesco', itemValue)}
            >
              <Picker.Item label="Selecione" value="" />
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
          <MaskedTextInput
            mask="(99) 99999-9999"
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={v => handleChange('telefone', v)}
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

          <Text style={styles.texto2}>Email</Text>
          <Input value={form.email} onChangeText={v => handleChange('email', v)} />

          <Text style={styles.texto2}>Senha</Text>
          <Input
            secureTextEntry
            value={form.senha}
            onChangeText={v => handleChange('senha', v)}
          />
        </View>

        <View style={styles.botao}>
          {loading ? (
            <ActivityIndicator size="large" color="#333" />
          ) : (
            <Btn texto="Avançar" onPress={handleSubmit} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
