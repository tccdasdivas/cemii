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
import Usuario from "../../../assets/usuario.png";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";

import { api } from "../../services/api";

import { ModalFiltro } from "../../components/FiltroCuidador/ModalFiltro";
import { getFavoritos, toggleFavorito } from "../../utils/favoritos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarTelefone } from "../../utils/telefoneMask";
import { calcularIdade } from "../../utils/calcularIdade";

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

interface Responsavel {
  id: number;
  nome: string;
  telefone: string;
}

interface User {
  id: number;
  nome: string;
  telefone: number;
  nascimento: Date;
  cidade: Cidade;
  necessidade: string | null;
  responsavel?: Responsavel;
  foto: string;
}

//aqui mostra os idosos
export function HomeCuidador() {
  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [filtroNecessidade, setFiltroNecessidade] = useState<
    "sim" | "nao" | null
  >(null);

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

  const [favoritos, setFavoritos] = useState<number[]>([]);

  async function handleFavorito(id: number) {
      const updated = await toggleFavorito("@favoritos_cuidadores", id);
      setFavoritos(updated);
    }

  useFocusEffect(
    useCallback(() => {
      getUsers();
      getFavoritos("@favoritos_cuidadores").then(setFavoritos);
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
          <TouchableOpacity
            onPress={() => navigation.navigate("PerfilCuidador")}
          >
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
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-start" }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("InformacaoCuidador", { user })
                        }
                        style={{ marginRight: 5 }}
                      >
                        {user.foto ? (
                          <Image
                            source={
                              user?.foto
                                ? { uri: `data:image/jpeg;base64,${user.foto}` }
                                : Usuario
                            }
                            style={[
                              styles.perfil1,
                              {
                                borderColor:
                                  index % 2 === 0 ? "#7fa9c7" : "#8ec46e",
                              },
                            ]}
                          />
                        ) : (
                          <Ionicons
                            name="person"
                            size={45}
                            color="#c89a65"
                            style={{
                              borderColor:
                                index % 2 === 0 ? "#7fa9c7" : "#8ec46e",
                              borderWidth: 1,
                              borderRadius: 15,
                              padding: 7,
                            }}
                          />
                        )}
                      </TouchableOpacity>

                      <View style={{  flex: 1, marginLeft: 5 }}>
                          <Text style={[styles.texto1, { flexWrap: "wrap" }]}>
                            {user.nome} | {calcularIdade(user.nascimento)} anos
                          </Text>

                          <Text style={[styles.texto3, { flexWrap: "wrap" }]}>
                            Localização: {user.cidade?.nome} -{" "}
                            {user.cidade?.estado?.sigla}
                          </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.texto3}>
                        Nome do responsável:{" "}
                        {user.responsavel?.nome || "Não informado"}
                      </Text>
                      <Text style={styles.texto3}>{user.necessidade}</Text>
                      <Text style={styles.texto3}>Telefone do Responsavel: {formatarTelefone( user.responsavel.telefone)}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={async () => {
                          try {
                            const idLogado = await AsyncStorage.getItem(
                              "idUsuario"
                            );
                            if (!idLogado) {
                              Alert.alert(
                                "Erro",
                                "Não foi possível identificar o usuário logado."
                              );
                              return;
                            }

                            navigation.navigate("Menssagem", {
                              userId: user.responsavel.id,
                              usuarioLogadoId: Number(idLogado),
                              conversaId: user.conversaId || null,
                            });
                          } catch (error) {
                            console.log("Erro ao abrir chat:", error);
                            Alert.alert(
                              "Erro",
                              "Não foi possível abrir o chat."
                            );
                          }
                        }}
                        style={[
                          styles.botao,
                          {
                            backgroundColor:
                              index % 2 === 0
                                ? "rgba(142, 196, 110, 0.4)"
                                : "rgba(127, 169, 199, 0.4)",
                            borderColor:
                              index % 2 === 0 ? "#8ec46e" : "#7fa9c7",
                          },
                        ]}
                      >
                        <Text style={styles.texto}>Mandar mensagem</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => handleFavorito(user.id)}>
                        <FontAwesome
                          name={
                            favoritos.includes(user.id) ? "heart" : "heart-o"
                          }
                          size={25}
                          color={index % 2 === 0 ? "#8ec46e" : "#7fa9c7"}
                          style={{ marginTop: 18, marginLeft: 10 }}
                        />
                      </TouchableOpacity>
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
