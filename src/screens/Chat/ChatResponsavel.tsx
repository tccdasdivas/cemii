import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";

import { styles } from "./ChatStyles";
import * as Font from "expo-font";

import { useNavigation } from "@react-navigation/native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { EvilIcons, Ionicons } from "@expo/vector-icons";

import Fundo from "../../../assets/fundoHome.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";

export function ChatResponsavel() {
  const [conversas, setConversas] = useState([]);
  const [usuarioLogadoId, setUsuarioLogadoId] = useState(null);

  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  const coresFundo = [
    "rgba(127, 169, 199,0.2)",
    "rgba(200,154,101,0.2)",
    "rgba(142,196,110,0.2)",
  ];

  const coresBorda = [
    "rgba(6,2,82,0.2)",
    "rgba(91,48,0,0.2)",
    "rgba(40,55,32,0.2)",
  ];

  const coresBordaImg = [
    "rgb(127,169,199)",
    "rgb(200,154,101)",
    "rgb(142,196,110)",
  ];

  useEffect(() => {
    async function loadUsuario() {
      try {
        const id = await AsyncStorage.getItem("idUsuario");
        if (id) setUsuarioLogadoId(Number(id));
      } catch (error) {
        console.log("Erro ao pegar usuário logado:", error);
      }
    }

    loadUsuario();
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "OpenSans-Bold": require("../../../assets/fonts/Open Sans/OpenSans-Bold.ttf"),
        "Quicksand-Bold": require("../../../assets/fonts/Quicksand/Quicksand-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    async function loadConversas() {
      if (!usuarioLogadoId) return;

      try {
        const response = await api.get(`/mensagens/usuario/${usuarioLogadoId}`);
        const mensagens = response.data;

        const conversasMap = {};

        mensagens.forEach((msg) => {
          const outroUsuario =
            msg.usuarioMandou.id === usuarioLogadoId
              ? msg.usuarioRecebeu
              : msg.usuarioMandou;

          if (!conversasMap[outroUsuario.id]) {
            conversasMap[outroUsuario.id] = {
              idOutroUsuario: outroUsuario.id,
              nomeUsuario: outroUsuario.nome,
              fotoUsuario: outroUsuario.foto,
              ultimaMensagem: msg.mensagem,
              horarioEnvio: msg.horarioEnvio,
            };
          } else {
            conversasMap[outroUsuario.id].ultimaMensagem = msg.mensagem;
          }
        });

        const conversasArray = Object.values(conversasMap);
        setConversas(conversasArray);
      } catch (error) {
        console.log("Erro ao carregar conversas:", error);
      }
    }

    loadConversas();
  }, [usuarioLogadoId]);

  const conversasFiltradas = conversas.filter((conversa) =>
    conversa.nomeUsuario.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <View style={styles.box1}>
          <ImageBackground source={Fundo} style={styles.fundo} />
          <View style={{ flexDirection: "row", paddingTop: 30 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeResponsavel")}
              style={styles.icone}
            >
              <AntDesign name="arrowleft" size={30} style={styles.seta} />
            </TouchableOpacity>
            <View style={styles.boxinput}>
              <View style={styles.input}>
                <EvilIcons name="search" size={24} color="#5b3000" />
                <TextInput
                  style={styles.input2}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Pesquisar..."
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxtexto}>
          {conversasFiltradas.map((conversa, index) => (
            <TouchableOpacity
              key={conversa.idOutroUsuario}
              onPress={() =>
                navigation.navigate("Menssagem", {
                  userId: conversa.idOutroUsuario,
                  usuarioLogadoId: usuarioLogadoId,
                })
              }
              style={{
                backgroundColor: coresFundo[index % 3],
                borderColor: coresBorda[index % 3],
                borderWidth: 1.5,
                marginTop: 17,
                padding: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 5 }}>
                  {conversa.fotoUsuario ? (
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${conversa.fotoUsuario}`,
                      }}
                      style={{
                        borderColor: coresBordaImg[index % 3],
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        borderWidth: 1,
                        marginLeft: 10,
                      }}
                    />
                  ) : (
                    <Ionicons
                      name="person"
                      size={45}
                      style={{
                        marginLeft: 10,
                        borderColor: coresBordaImg[index % 3],
                        borderWidth: 1,
                        borderRadius: 50,
                        padding: 10,
                        color: coresBordaImg[index % 3],
                      }}
                    />
                  )}
                </View>

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.texto1}>{conversa.nomeUsuario}</Text>
                  <Text style={styles.texto2}>{conversa.ultimaMensagem}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
