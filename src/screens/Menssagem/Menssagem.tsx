import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";

import { styles } from "./MenssagemStyles";

import Usuario from "../../../assets/usuario.png";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";

import * as Font from "expo-font";
import { MenssagemBalao } from "../../components/MenssagemBalao/MenssagemBalao";
import { api } from "../../services/api";

export function Menssagem() {
  const navigation = useNavigation();
  const route = useRoute();

  const { userId, usuarioLogadoId } = route.params || {};

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const [mensagens, setMensagens] = useState([]);

  const [texto, setTexto] = useState("");

  async function carregarMensagens() {
    if (!usuarioLogadoId || !userId) return;

    try {
      const response = await api.get(`/mensagens/usuario/${usuarioLogadoId}`);
      const todasMensagensDoUsuario = response.data;

      const mensagensDesteChat = todasMensagensDoUsuario.filter(
        (msg) =>
          msg.usuarioMandou.id === userId || msg.usuarioRecebeu.id === userId
      );

      const historicoFormatado = mensagensDesteChat
        .sort((a, b) => a.id - b.id)
        .map((msg) => ({
          id: msg.id,
          texto: msg.mensagem,
          lado:
            msg.usuarioMandou.id === usuarioLogadoId ? "direita" : "esquerda",
        }));

      setMensagens(historicoFormatado);
    } catch (e) {
      console.log("Erro ao carregar mensagens:", e);
      setMensagens([]);
    }
  }

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

    if (userId && usuarioLogadoId) {
      carregarMensagens();
    }
  }, [userId, usuarioLogadoId]);

  async function enviarMensagem() {
    if (texto.trim() === "") return;

    const mensagemParaSalvar = texto;
    const novaMensagemOtimista = {
      id: Date.now(),
      texto: mensagemParaSalvar,
      lado: "direita",
    };

    setMensagens((prev) => [...prev, novaMensagemOtimista]);
    setTexto("");

    try {
      await api.post("/mensagens", {
        mensagem: mensagemParaSalvar,
        usuarioMandou: { id: usuarioLogadoId },
        usuarioRecebeu: { id: userId },
      });
      console.log("Mensagem salva no banco!");
      await carregarMensagens();
    } catch (error) {
      console.log("Erro ao salvar mensagem no banco:", error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#faf8d4" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <View style={{ flexDirection: "row", marginTop: -80 }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.icone}
              >
                <AntDesign name="arrowleft" size={30} style={styles.seta} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginLeft: -20,
              }}
            >
              <Image
                source={
                  user?.foto
                    ? { uri: `data:image/jpeg;base64,${user.foto}` }
                    : Usuario
                }
                style={styles.img}
              />
              <View style={{ justifyContent: "center", marginLeft: 70 }}>
                <Text style={styles.texto1}>{user?.nome ?? "Usuário"}</Text>
                
                {user?.tipoUsuario === "CUIDADOR" && (
                  <Text style={styles.texto2}>
                    {user?.profissao ?? "Profissão não informada"}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            {mensagens.map((msg) => (
              <MenssagemBalao
                key={msg.id}
                texto={msg.texto}
                isyou={msg.lado == "direita"}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "rgba(200, 154, 101,0.6)",
            padding: 10,
            borderRadius: 20,
            borderColor: "rgba(125, 82, 32,0.6)",
            borderWidth: 1,
            fontFamily: "Quicksand-Bold",
          }}
          placeholder="Digite sua mensagem..."
          value={texto}
          onChangeText={setTexto}
        />

        <TouchableOpacity
          onPress={enviarMensagem}
          style={{
            marginLeft: 10,
            backgroundColor: "rgba(127, 169, 199,0.6)",
            borderRadius: 50,
            borderColor: "rgba(6, 2, 82,0.6)",
            borderWidth: 2,
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="send" size={28} color="rgba(6, 2, 82,0.6)" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
