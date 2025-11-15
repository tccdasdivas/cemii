import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import Fundo from "../../../assets/fundoHome.png";
import { styles } from "./HomeStyles";
import { Pesquisar } from "../../components/TextInput/Pesquisar";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

import Oculos from "../../../assets/oculos.png";
import Menssagem from "../../../assets/mensagem.png";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";

import { api } from "../../services/api";

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

export function calcularIdade(dataNascimento: string | Date): number {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--; // ainda não fez aniversário este ano
  }

  return idade;
}

export function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    await api
      .get("/usuarios")
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


  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <ImageBackground source={Fundo} style={styles.imagem} />
        <View style={styles.icone}>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}>
            <Ionicons name="person" size={30} style={styles.perfil} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <Pesquisar />
        </View>
        <View style={styles.container2}>
          <View style={styles.box}>
            <View style={styles.menu}>
              <View style={styles.mensagem}>
                <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                  <Image source={Menssagem} style={styles.mensagemimg} />
                </TouchableOpacity>
              </View>
              <View style={styles.coracao}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Favoritos")}
                >
                  <FontAwesome name="heart" size={35} color="#e39694" />
                </TouchableOpacity>
              </View>
              <View style={styles.oculos}>
                <TouchableOpacity onPress={() => navigation.navigate("Sobre")}>
                  <Image source={Oculos} style={styles.oculosimg} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width: "81%" }}>
            <View style={styles.textos}>
              <Text style={styles.texto1}>Perfis Disponíveis</Text>
              <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={styles.texto2}>Filtrar</Text>
                <AntDesign name="right" size={15} color="#5b3000" />
              </TouchableOpacity>
            </View>

            {users.map((user, index) => {
                const backgroundColor = index % 2 === 0 ? "rgba(142, 196, 110/ 0.4)" : "rgba(127, 169, 199/ 0.4)7";
              return (
                <View style={[styles.contperfil1, {backgroundColor}]} key={user.id}>
                  <View style={styles.boxperfil1}>
                    <View style={{ flexDirection: "row"}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate(props.navegacao)}
                        style={{ width: "17%" }}
                      >
                        <Ionicons
                          name="person"
                          size={40}
                          style={[styles.perfil1,{borderColor: index % 2 === 0 ? "#7fa9c7" : "#8ec46e",}]}
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
                      <Text style={styles.texto3}>Disponibilidade: Seg a Sex manhã e tarde</Text>
                        <Text style={styles.texto3}>{user.profissao}</Text>
                        <Text style={styles.texto3}>Primeiros Socorros (Cruz Vermelha)</Text>
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