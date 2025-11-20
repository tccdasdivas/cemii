import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import BemVindo from "../../../assets/Bemvindo.png";
import { styles } from "./EntrarStyles";
import { Input } from "../../components/TextInput/Input";
import { Botao } from "../../components/Botao/Botao";
import { api } from "../../services/api";
import { Btn } from "../../components/Btn/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Entrar({ navigation }: any) {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.senha) {
      Alert.alert("Atenção", "Preencha o email e a senha.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        senha: form.senha,
      };

      console.log("🔑 Enviando para /auth/login:", payload);

      const response = await api.post("/auth/login", payload);

      // Se o backend retorna token e usuário:
      console.log("✅ Login bem-sucedido:", response.data);

      // Você pode salvar o token se quiser (ex: AsyncStorage)
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("tipoUsuario", response.data.tipo);
      await AsyncStorage.setItem("idUsuario", String(response.data.id));

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      if (response.data.tipo === "CUIDADOR") {
        navigation.navigate("HomeCuidador");
      } else if (response.data.tipo === "RESPONSAVEL") {
        navigation.navigate("HomeResponsavel");
      }
    } catch (error: any) {
      console.error("❌ Erro no login:", error.response?.data || error);
      const msg = error?.response?.data || "Erro ao realizar login.";
      Alert.alert("Erro", String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <Image source={BemVindo} style={styles.imagem} />

        <View style={styles.caixatexto}>
          <Text style={styles.texto}>Email</Text>
          <Input
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.texto}>Senha</Text>
            <Input
              value={form.senha}
              onChangeText={(v) => handleChange("senha", v)}
              placeholder="Digite sua senha"
              secureTextEntry
            />
          </View>
        </View>

        <View style={{ marginTop: 60 }}>
          {loading ? (
            <ActivityIndicator size="large" color="#333" />
          ) : (
            <Btn texto="Entrar" onPress={handleLogin} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
