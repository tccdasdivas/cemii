import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native';

import { styles } from './MenssagemStyles';

import Usuario from '../../../assets/usuario.png';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as Font from "expo-font";
import { MenssagemBalao } from '../../components/MenssagemBalao/MenssagemBalao';
import { api } from "../../services/api";

export function Menssagem() {

  const navigation = useNavigation();
  const route = useRoute();
  
  const { userId, usuarioLogadoId } = route.params || {};

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const [mensagens, setMensagens] = useState([
    { id: 1, texto: 'Olá! Como posso ajudar?', lado: 'esquerda' }
  ]);

  const [texto, setTexto] = useState("");

  const respostasManoel = [
    "Ô meu amigo, calma aí!",
    "Isso aí tá bom demais!",
    "Eu não sei, mas vou descobrir.",
    "Rapaz... que conversa boa!",
    "Diz aí de novo, não entendi não.",
    "Oxe, pois tá certo então!",
    "Eu gosto é assim!",
    "Cê tá falando sério?",
    "Vixe Maria!",
    "Kkkkkk tu é engraçado demais!"
  ];

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Quicksand-Bold": require("../../../assets/fonts/Quicksand/Quicksand-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);


  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get(`/usuarios/${userId}`);
        setUser(response.data);
      } catch (e) {
        console.log("Erro ao carregar usuário:", e);
      }
    }

    if (userId) loadUser();
  }, [userId]);

  async function enviarMensagem() {
  if (texto.trim() === "") return;

  const novaMensagem = {
    id: Date.now(),
    texto: texto,
    lado: "direita"
  };

  setMensagens([...mensagens, novaMensagem]);
  setTexto("");

  try {
    await api.post("/mensagens", {
      mensagem: texto,
      usuarioMandou: {id: usuarioLogadoId}, 
      usuarioRecebeu: {id: userId}       
    });
    console.log("Mensagem salva no banco!");
  } catch (error) {
    console.log("Erro ao salvar mensagem no banco:", error);
  }

  responderAutomaticamente();
}

  function responderAutomaticamente() {
    const delay = Math.floor(Math.random() * 1500) + 800;

    setTimeout(() => {
      const resposta = respostasManoel[Math.floor(Math.random() * respostasManoel.length)];

      const novaResposta = {
        id: Date.now() + Math.random(),
        texto: resposta,
        lado: "esquerda"
      };

      setMensagens(prev => [...prev, novaResposta]);
    }, delay);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#faf8d4' }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <View style={{ flexDirection: 'row', marginTop: -80 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.icone}>
                <AntDesign name="arrowleft" size={30} style={styles.seta} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: -20 }}>
              <Image
                source={user?.foto ? { uri: `data:image/jpeg;base64,${user.foto}` }
                : Usuario}
                style={styles.img}
              />
              <View style={{ alignItems: 'center', marginLeft: 15 }}>
                <Text style={styles.texto1}>
                  {user?.nome ?? "Usuário"}
                </Text>
                <Text style={styles.texto2}>
                  {user?.profissao ?? "Profissão não informada"}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            {mensagens.map(msg => (
              <MenssagemBalao
                key={msg.id}
                texto={msg.texto}
                isyou={msg.lado == 'direita'}
              />
            ))}
          </View>

        </View>
      </ScrollView>

      <View style={{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
      }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: 'rgba(200, 154, 101,0.6)',
            padding: 10,
            borderRadius: 20,
            borderColor: 'rgba(125, 82, 32,0.6)',
            borderWidth: 1,
            fontFamily: 'Quicksand-Bold'
          }}
          placeholder="Digite sua mensagem..."
          value={texto}
          onChangeText={setTexto}
        />

        <TouchableOpacity onPress={enviarMensagem} style={{
          marginLeft: 10,
          backgroundColor: 'rgba(127, 169, 199,0.6)',
          borderRadius: 50,
          borderColor: "rgba(6, 2, 82,0.6)",
          borderWidth: 2,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Feather name="send" size={28} color="rgba(6, 2, 82,0.6)" />
        </TouchableOpacity>
      </View>

    </View>
  );
}
