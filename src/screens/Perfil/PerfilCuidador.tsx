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
import Usuario from "../../../assets/usuario.png";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import { api } from "../../services/api";
import { MaskedTextInput } from "react-native-mask-text";
import { formatarTelefone } from "../../utils/telefoneMask";
import { formatarCPF } from "../../utils/cpfMask";
import { Ionicons } from "@expo/vector-icons";

export function PerfilCuidador() {
  const [user, setUser] = useState<any>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [profissao, setProfissao] = useState("");
  const [cidadeId, setCidadeId] = useState<number | null>(null);
  const [estadoId, setEstadoId] = useState<number | null>(null);
  const [foto, setFoto] = useState("");

  const [cidades, setCidades] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);

  const [salvando, setSalvando] = useState(false);
  const navigation = useNavigation();

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
      setProfissao(u.profissao);
      setCidadeId(u.cidade?.id);
      setEstadoId(u.cidade?.estado?.id);
      setFoto(u.foto);

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
        profissao,
        nascimento: user.nascimento,
        tipo: user.tipo,
        cidade: { id: cidadeId },
        foto,
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
          navigation.navigate("HomeCuidador");
        }}
        style={styles.icone}
      >
        <AntDesign name="arrowleft" size={35} style={styles.seta} />
      </TouchableOpacity>

      <View style={styles.container}>
        {user?.foto ? (
          <Image
            source={
              user?.foto
                ? { uri: `data:image/jpeg;base64,${user.foto}` }
                : Usuario
            }
            style={[
              styles.imgbidu,
              {
                
              },
            ]}
          />
        ) : (
          <Ionicons
            name="person"
            size={125}
            color="#c89a65"
            style={{
              marginRight: 10,
              borderColor: "#c89a65",
              borderWidth: 2,
              borderRadius: 200,
              padding: 25,
              backgroundColor: '#faf8d4', 
              position: "absolute",
               marginTop: 30,
            }}
          />
        )}
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
                <Text style={styles.texto2}>Telefone: {formatarTelefone(user?.telefone)}</Text>
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
                <Text style={styles.texto2}>CPF: {formatarCPF(user?.cpf)}</Text>
              )}

              {/* PROFISSÃO */}
              {editando ? (
                <TextInput
                  style={styles.inputEdit}
                  value={profissao}
                  onChangeText={setProfissao}
                  placeholder="Profissão"
                />
              ) : (
                <Text style={styles.texto2}>Profissão: {user?.profissao}</Text>
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
