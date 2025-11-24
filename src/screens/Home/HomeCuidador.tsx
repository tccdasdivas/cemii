import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import Fundo from "../../../assets/fundoHome.png";
import { styles } from "./HomeStyles";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";

import Oculos from "../../../assets/oculos.png";
import Menssagem from "../../../assets/mensagem.png";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";

import { api } from "../../services/api";

import { ModalFiltro } from "../../components/FiltroCuidador/ModalFiltro";

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
  nascimento: Date;
  cidade: Cidade;
  necessidade: string | null;
}

export function calcularIdade(dataNascimento: string | Date): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
}

//Aqui é a tela dos perfis dos responsaveis
export function HomeCuidador() {
  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [filtroNecessidade, setFiltroNecessidade] = useState<"sim" | "nao" | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");

  const getUsers = async () => {
    await api
      .get("/idosos")
      .then((response) => {
        console.log(response.data);

        setUsers(response.data);
      })
      .catch((err: any) => {
        Alert.alert("Ops", err.response?.data?.erros ?? "Tente novamente!");
      });
  };

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, [])
  );

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Brixton-Regular": require("../../../assets/fonts/Brixton/Brixton-Regular.otf"),
  });

  if (!fontsLoaded) return null;

  const usuariosFiltradosPorPesquisa = users
  .filter((user) =>
    user.nome.toLowerCase().includes(searchText.toLowerCase())
  )
  .filter((user) => {
    if (filtroNecessidade === null) return true;

    if (filtroNecessidade === "sim") {
      return user.necessidade !== null && user.necessidade !== "";
    }

    if (filtroNecessidade === "nao") {
      return user.necessidade === null || user.necessidade === "";
    }

    return true;
  });

  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <ImageBackground source={Fundo} style={styles.imagem} />
        <View style={styles.icone}>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Ionicons name="person" size={30} style={styles.perfil} />
          </TouchableOpacity>
        </View>
        <View style={styles.input}>
          <EvilIcons name="search" size={24} color="#5b3000" />
          <TextInput
            style={styles.input2}
            placeholder="Pesquisar..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.container2}>
          <View style={styles.box}>
            <View style={styles.menu}>
              <View style={styles.mensagem}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ChatCuidador")}
                >
                  <Image source={Menssagem} style={styles.mensagemimg} />
                </TouchableOpacity>
              </View>
              <View style={styles.coracao}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("FavoritosCuidador")}
                >
                  <FontAwesome name="heart" size={35} color="#e39694" />
                </TouchableOpacity>
              </View>
              <View style={styles.oculos}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SobreCuidador")}
                >
                  <Image source={Oculos} style={styles.oculosimg} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width: "81%" }}>
            <View style={styles.textos}>
              <Text style={styles.texto1}>Perfis Disponíveis</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 10 }}
                onPress={() => setModalFiltroVisivel(true)}
              >
                <Text style={styles.texto2}>Filtrar</Text>
                <AntDesign name="right" size={15} color="#5b3000" />
              </TouchableOpacity>
              <ModalFiltro
                visible={modalFiltroVisivel}
                fechar={() => setModalFiltroVisivel(false)}
                filtroNecessidade={filtroNecessidade}
                setFiltroNecessidade={setFiltroNecessidade}
              />
            </View>
            {usuariosFiltradosPorPesquisa.map((user, index) => {
              const backgroundColor =
                index % 2 === 0
                  ? "rgba(142, 196, 110, 0.4)"
                  : "rgba(127, 169, 199, 0.4)";

              return (
                <View
                  style={[styles.contperfil1, { backgroundColor }]}
                  key={user.id}
                >
                  <View style={styles.boxperfil1}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Informacao", { userId: user.id })
                        }
                        style={{ width: "17%" }}
                      >
                        <Ionicons
                          name="person"
                          size={40}
                          style={[
                            styles.perfil1,
                            {
                              borderColor:
                                index % 2 === 0 ? "#7fa9c7" : "#8ec46e",
                            },
                          ]}
                        />
                      </TouchableOpacity>
                      <View style={{ marginLeft: 5 }}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.texto1}>{user.nome} |</Text>
                          <Text style={styles.texto1}>
                            {" "}
                            {calcularIdade(user.nascimento)} anos
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text style={styles.texto3}>
                            Localização: {user.cidade?.nome} -{" "}
                            {user.cidade?.estado?.sigla}{" "}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.texto3}>Idoso</Text>
                      <Text style={styles.texto3}>{user.necessidade}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
