import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./FavoritosStyles";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fundo from "../../../assets/fundoHome.png";
import { getFavoritos } from "../../utils/favoritos";
import { api } from "../../services/api";
import { calcularIdade } from "../../utils/calcularIdade";

import Usuario from "../../../assets/usuario.png";
import { Ionicons } from "@expo/vector-icons";

export function FavoritosResponsavel() {
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [favoritosIds, setFavoritosIds] = useState<number[]>([]);
  const [usuariosFavoritos, setUsuariosFavoritos] = useState<any[]>([]);
  const FAV_CUIDADORES = "@favoritos_cuidadores";

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
    getFavoritos(FAV_CUIDADORES).then(setFavoritosIds);
  }, []);

  useEffect(() => {
    async function carregarUsuariosFavoritos() {
      try {
        const response = await api.get("/usuarios");
        let allUsers = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.usuarios)
          ? response.data.usuarios
          : [];
        const favoritos = allUsers.filter((u) => favoritosIds.includes(u.id));
        setUsuariosFavoritos(favoritos);
      } catch (error) {
        console.log("Erro ao carregar usuários favoritos:", error);
      }
    }
    if (favoritosIds.length > 0) {
      carregarUsuariosFavoritos();
    } else {
      setUsuariosFavoritos([]);
    }
  }, [favoritosIds]);

  const coresFundo = [
    "rgba(127, 169, 199,0.2)",
    "rgba(200,154,101,0.2)",
    "rgba(142,196,110,0.2)",
  ];

  const coresBorda = [
    "rgba(6,2,82/ 0.2)",
    "rgba(91,48,0/ 0.2)",
    "rgba(40,55,32/ 0.2)",
  ];

  const coresBordaImg = [
    "rgb(127, 169, 199)",
    "rgb(200,154,101)",
    "rgb(142,196,110)",
  ];
  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <View style={styles.box1}>
          <ImageBackground source={Fundo} style={styles.fundo} />
          <View style={{ flexDirection: "row", paddingTop: 50 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeResponsavel")}
              style={styles.icone}
            >
              <AntDesign name="arrowleft" size={35} style={styles.seta} />
            </TouchableOpacity>
            <View style={styles.boxtexto}>
              <Text
                style={[
                  styles.texto,
                  fontsLoaded && { fontFamily: "OpenSans-Bold" },
                ]}
              >
                Favoritos
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.box2}>
          {usuariosFavoritos.length === 0 ? (
            <Text
              style={{
                fontFamily: "OpenSans-Bold",
                fontSize: 25,
                color: "#7d5220",
                textAlign: "center",
              }}
            >
              Nenhum favorito ainda.
            </Text>
          ) : (
            usuariosFavoritos.map((user, index) => (
              <View
                key={user.id}
                style={{
                  backgroundColor: coresFundo[index % 3],
                  borderColor: coresBorda[index % 3],
                  borderWidth: 2,
                  borderRadius: 20,
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Informacao", { userId: user.id })
                  }
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {user.foto ? (
                    <Image
                      source={
                        user?.foto
                          ? { uri: `data:image/jpeg;base64,${user.foto}` }
                          : Usuario
                      }
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        marginRight: 10,
                        borderColor: coresBordaImg[index % 3],
                        borderWidth: 2,
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

                  <View style={{width: "80%"}}>
                    <Text style={[styles.texto1,  { flexShrink: 1 }]}>
                      {user.nome} | {calcularIdade(user.nascimento)} anos
                    </Text>
                    <Text style={styles.texto3}>
                      Localização: {user.cidade?.nome} -{" "}
                      {user.cidade?.estado?.sigla}
                    </Text>
                    <Text style={styles.texto3}>
                      Profissão: {user.profissao}
                    </Text>
                    <Text style={styles.texto3}>
                      {user.experiencia || "Sem experiência na área"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
