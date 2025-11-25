import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  Platform,
} from "react-native";
import * as Font from "expo-font";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./PerfilStyles";
import Fundo from "../../../assets/fundoHome.png";
import Bidu from "../../../assets/Bidu.png";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import { api } from "../../services/api";
import { MaskedTextInput } from "react-native-mask-text";

export function PerfilResponsavel() {
  const [user, setUser] = useState<any>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cidadeId, setCidadeId] = useState<number | null>(null);
  const [estadoId, setEstadoId] = useState<number | null>(null);

  const [cidades, setCidades] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);

  const [salvando, setSalvando] = useState(false);
  const navigation = useNavigation();

  // Funções para formatar CPF e telefone
  const formatarCPF = (cpf: string) => {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatarTelefone = (tel: string) => {
    if (!tel) return "";
    return tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  // Carregar estados e cidades
  const carregarEstados = async () => {
    try {
      const response = await api.get("/estados");
      setEstados(response.data);
    } catch (error) {
      console.log("Erro ao carregar estados:", error);
    }
  };

  const carregarCidades = async (estadoId: number) => {
    try {
      const response = await api.get(`/estados/${estadoId}/cidades`);
      setCidades(response.data);
    } catch (error) {
      console.log("Erro ao carregar cidades:", error);
    }
  };

  const carregarUsuario = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userSaved = await AsyncStorage.getItem("user");
      if (!token || !userSaved) return;

      const parsed = JSON.parse(userSaved);
      const response = await api.get(`/usuarios/${parsed.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const u = response.data;
      setUser(u);

      // Preenche inputs
      setNome(u.nome);
      setEmail(u.email);
      setTelefone(u.telefone);
      setCpf(u.cpf);
      setCidadeId(u.cidade?.id);
      setEstadoId(u.cidade?.estado?.id);

      if (u.cidade?.estado?.id) {
        carregarCidades(u.cidade.estado.id);
      }

      await AsyncStorage.setItem("user", JSON.stringify(u));
    } catch (error: any) {
      console.log(
        "❌ ERRO AO CARREGAR USUARIO:",
        error.response?.data || error
      );
      Alert.alert("Erro", "Não foi possível carregar o usuário.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarEstados();
      carregarUsuario();
    }, [])
  );

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

  const salvarEdicao = async () => {
    try {
      setSalvando(true);
      const token = await AsyncStorage.getItem("token");
      if (!token) return Alert.alert("Erro", "Token não encontrado.");
      if (!user) return Alert.alert("Erro", "Usuário não carregado.");

      const body = {
        nome,
        email,
        telefone,
        cpf,
        nascimento: user.nascimento,
        tipo: user.tipo,
        cidade: { id: cidadeId }
      };

      const response = await api.put(`/usuarios/${user.id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setEditando(false);
      Alert.alert("Sucesso", "Dados atualizados!");
    } catch (err: any) {
      console.log("ERRO AO SALVAR:", err?.response?.data || err.message);
      Alert.alert("Erro", "Não foi possível salvar. Veja o console.");
    } finally {
      setSalvando(false);
    }
  };

  const sair = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    navigation.navigate("Inicial");
  };

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <ImageBackground source={Fundo} style={styles.imagem} />

      <TouchableOpacity
        onPress={async () => {
          const tipo = await AsyncStorage.getItem("tipoUsuario");
          if (tipo === "RESPONSAVEL") navigation.navigate("HomeResponsavel");
          else if (tipo === "CUIDADOR") navigation.navigate("HomeCuidador");
          else navigation.navigate("Inicial");
        }}
        style={styles.icone}
      >
        <AntDesign name="arrowleft" size={35} style={styles.seta} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image source={Bidu} style={styles.imgbidu} />
        <TouchableOpacity
          style={styles.pencil}
          onPress={() => setEditando(!editando)}
        >
          <FontAwesome
            name={editando ? "close" : "pencil"}
            size={24}
            color="#5b3000"
          />
        </TouchableOpacity>

        <Text style={styles.texto}>{user?.nome || "Perfil"}</Text>

        <View style={styles.box}>
          <View style={styles.box2}>
            <View style={styles.box3}>
              {/* NOME */}
              {editando ? (
                <TextInput
                  style={styles.inputEdit}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Nome"
                />
              ) : (
                <Text style={styles.texto1}>Nome: {user?.nome}</Text>
              )}

              {/* EMAIL */}
              {editando ? (
                <TextInput
                  style={styles.inputEdit}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                />
              ) : (
                <Text style={styles.texto2}>Email: {user?.email}</Text>
              )}

              {/* TELEFONE */}
              {editando ? (
                <MaskedTextInput
                  mask="(99) 99999-9999"
                  value={telefone}
                  onChangeText={setTelefone}
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                  style={styles.inputEdit}
                />
              ) : (
                <Text style={styles.texto2}>Telefone: {user?.telefone}</Text>
              )}

              {/* CPF */}
              {editando ? (
                <MaskedTextInput
                  mask="999.999.999-99"
                  value={cpf}
                  onChangeText={setCpf}
                  placeholder="CPF"
                  keyboardType="number-pad"
                  style={styles.inputEdit}
                />
              ) : (
                <Text style={styles.texto2}>CPF: {user?.cpf}</Text>
              )}
            </View>
          </View>

          {/* Botões */}
          {editando && (
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <TouchableOpacity style={styles.btnSalvar} onPress={salvarEdicao}>
                {salvando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnSalvarTxt}>Salvar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnCancelar}
                onPress={() => setEditando(false)}
              >
                <Text style={styles.btnSalvarTxt}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Logout */}
          <TouchableOpacity style={{ flexDirection: "row" }} onPress={sair}>
            <Text style={styles.texto}>Sair</Text>
            <Entypo
              name="log-out"
              size={24}
              color="#725431"
              style={{ marginTop: 20, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
