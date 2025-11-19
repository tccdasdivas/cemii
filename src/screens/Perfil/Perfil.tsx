import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View, Image, ScrollView, Text, Alert } from 'react-native';

import * as Font from "expo-font";

import { styles } from './PerfilStyles';

import Fundo from '../../../assets/fundoHome.png';
import Bidu from '../../../assets/Bidu.png'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { api } from "../../services/api";

import AsyncStorage from '@react-native-async-storage/async-storage';

async function login() {
  const response = await api.post("/auth/register", {
    email,
    senha,
  });

  // Salva token
  await AsyncStorage.setItem("token", response.data.token);

  // Salva o usuário inteiro
  await AsyncStorage.setItem("user", JSON.stringify(response.data));
}

interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

interface Cidade {
  id: number;
  nome: string;
  estado: Estado;
}

interface User {
  id: number;
  nome: string;
  telefone: number;
  profissao: string;
  nascimento: Date;
  cidade: Cidade;
}

export function Perfil() {
  const [users, setUsers] = useState<User | null>(null);

  const carregarUsuario = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem("user");
  
      if (usuarioSalvo) {
        setUsers(JSON.parse(usuarioSalvo));
      } else {
        Alert.alert("Erro", "Usuário não encontrado.");
      }
  
    } catch (err) {
      Alert.alert("Erro", "Não foi possível carregar o usuário.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
    }, [])
  );

  const sair = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate('Inicial'); 
  };

  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Quicksand-Regular": require("../../../assets/fonts/Quicksand/Quicksand-Regular.ttf"),
        "Quicksand-Bold": require("../../../assets/fonts/Quicksand/Quicksand-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: '#faf8d4' }}>
      <ImageBackground
        source={Fundo}
        style={styles.imagem} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.icone}>
        <AntDesign name="arrowleft" size={35} style={styles.seta} />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={Bidu}
          style={styles.imgbidu} />
        <TouchableOpacity style={styles.pencil}>
          <FontAwesome name="pencil" size={24} color="#5b3000" />
        </TouchableOpacity>
        <Text style={styles.texto}>Bidu</Text>
        <View style={styles.box}>
          <View style={styles.box2}>
            <View style={styles.box3}>
              <Text style={styles.texto1}>{users?.nome}</Text>
              <Text style={styles.texto2}>Email</Text>
              <Text style={styles.texto2}>Senha</Text>
            </View>
          </View>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={sair}>
            <Text style={styles.texto}>Sair</Text>
            <Entypo name="log-out" size={24} color="#725431" style={{ marginTop: 20, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}