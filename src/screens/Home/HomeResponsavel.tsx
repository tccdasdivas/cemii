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
import * as Font from "expo-font";

import { api } from "../../services/api";
import { getFavoritos, toggleFavorito } from "../../utils/favoritos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalFiltro } from "../../components/FiltroResponsavel/ModalFiltro";
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

interface User {
  id: number;
  nome: string;
  telefone: number;
  profissao: string;
  nascimento: Date;
  cidade: Cidade;
  tipo: string;
  diasHorarios: string;
  experiencia: string;
  foto: string;
}

export function HomeResponsavel() {
  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [filtroProfissao, setFiltroProfissao] = useState<string | null>(null);
  const [filtroExperiencia, setFiltroExperiencia] = useState<boolean | null>(
    null
  );
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [tipoUsuarioLogado, setTipoUsuarioLogado] = useState<string | null>(
    null
  );
  const [favoritos, setFavoritos] = useState<number[]>([]);

  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Brixton-Regular": require("../../../assets/fonts/Brixton/Brixton-Regular.otf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  const carregarTipoUsuario = async () => {
    const tipo = await AsyncStorage.getItem("tipoUsuario");
    setTipoUsuarioLogado(tipo);
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/usuarios");
      let usersArray: User[] = [];
      if (Array.isArray(response.data)) {
        usersArray = response.data;
      } else if (Array.isArray(response.data.usuarios)) {
        usersArray = response.data.usuarios;
      } else {
        console.warn("Resposta inesperada da API:", response.data);
      }
      setUsers(usersArray);
    } catch (err: any) {
      Alert.alert("Ops", err.response?.data?.erros ?? "Tente novamente!");
      setUsers([]);
    }
  };

   async function handleFavorito(id: number) {
    const updated = await toggleFavorito("@favoritos_cuidadores", id);
    setFavoritos(updated);
  }

  useFocusEffect(
    useCallback(() => {
      carregarTipoUsuario();
      getUsers();
      getFavoritos("@favoritos_cuidadores").then(setFavoritos);
    }, [])
  );

 

  const usuariosFiltrados: User[] = Array.isArray(users)
    ? users.filter((user) => {
        const tipoLogado = tipoUsuarioLogado?.toLowerCase();
        const tipoUser = user.tipo?.toLowerCase() ?? "";
        if (tipoLogado === "cuidador") return tipoUser === "responsavel";
        if (tipoLogado === "responsavel") return tipoUser === "cuidador";
        return false;
      })
    : [];

  const usuariosFiltradosPorPesquisa: User[] = usuariosFiltrados
    .filter((user) =>
      user.nome?.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((user) => {
      if (!filtroProfissao) return true;
      const profissaoLower = user.profissao?.toLowerCase() || "";
      const filtroLower = filtroProfissao.toLowerCase();
      if (filtroLower === "outros") {
        return (
          profissaoLower.includes("cuidador") &&
          profissaoLower.includes("enfermeiro")
        );
      }
      return profissaoLower.includes(filtroLower);
    })
    .filter((user) =>
      filtroExperiencia === null
        ? true
        : filtroExperiencia
        ? !!user.experiencia
        : !user.experiencia
    );

  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <ImageBackground source={Fundo} style={styles.imagem} />
        <View style={styles.icone}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PerfilResponsavel")}
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
                  onPress={() => navigation.navigate("ChatResponsavel")}
                >
                  <Image source={Menssagem} style={styles.mensagemimg} />
                </TouchableOpacity>
              </View>
              <View style={styles.coracao}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("FavoritosResponsavel")}
                >
                  <FontAwesome name="heart" size={35} color="#e39694" />
                </TouchableOpacity>
              </View>
              <View style={styles.oculos}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SobreResponsavel")}
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
                filtroProfissao={filtroProfissao}
                setFiltroProfissao={setFiltroProfissao}
                filtroExperiencia={filtroExperiencia}
                setFiltroExperiencia={setFiltroExperiencia}
              />
            </View>

            {usuariosFiltradosPorPesquisa.map((user, index) => {
              const backgroundColor =
                index % 2 === 0
                  ? "rgba(142, 196, 110, 0.4)"
                  : "rgba(127, 169, 199, 0.4)";

              let diasHorariosArray: { dia: string; periodo: string }[] = [];
              if (user.diasHorarios) {
                try {
                  const parsed = JSON.parse(user.diasHorarios);
                  if (Array.isArray(parsed)) diasHorariosArray = parsed;
                } catch (error) {
                  console.log("Erro ao parsear dias_horarios:", error);
                }
              }

              const diasMap: Record<string, string> = {
                seg: "Segunda",
                ter: "Terça",
                qua: "Quarta",
                qui: "Quinta",
                sex: "Sexta",
                sab: "Sábado",
                dom: "Domingo",
              };

              const disponibilidadePorDia: Record<string, string[]> = {};
              diasHorariosArray.forEach(({ dia, periodo }) => {
                const nomeDia = diasMap[dia] || dia;
                if (!disponibilidadePorDia[nomeDia])
                  disponibilidadePorDia[nomeDia] = [];
                disponibilidadePorDia[nomeDia].push(periodo);
              });

              const diasHorariosTexto = Object.entries(disponibilidadePorDia)
                .map(([dia, periodos]) => `${dia} (${periodos.join(", ")})`)
                .join(", ");

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
                          navigation.navigate("InformacaoResponsavel", { user })
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

                      <View style={{ flex: 1, marginLeft: 5 }}>
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
                        Disponibilidade: {diasHorariosTexto || "Não informado"}
                      </Text>
                      <Text style={styles.texto3}>{user.profissao}</Text>
                      <Text style={styles.texto3}>
                        {user.experiencia || "Sem experiência na área"}
                      </Text>
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
                              userId: user.id,
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
