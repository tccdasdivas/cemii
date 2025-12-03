import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaskedTextInput } from "react-native-mask-text";
import { api } from "../../services/api";
import { styles } from "./CadastroCuidStyles";
import { Input } from "../../components/TextInput/Input";
import Texto from "../../../assets/dados.png";
import { Btn } from "../../components/Btn/Btn";

import { FotoPicker } from "../../components/FotoPicker/FotoPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { calcularIdade } from "../../utils/calcularIdade";

export function CadastroCuid({ navigation }: any) {
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [loading, setLoading] = useState(false);

  const [imagem, setImagem] = useState<String | null>(null);

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    cidade: "",
    estado: "",
    profissao: "",
    nascimento: new Date(),
    coren: "",
    diasHorarios: "",
    experiencia: "",
  });

  const [profissaoLivre, setProfissaoLivre] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState<any[]>([]);
  const [modalDias, setModalDias] = useState(false);
  const [temExperiencia, setTemExperiencia] = useState<boolean | null>(null);

  const idadeMinima = 18;
  const dataMaximaPermitida = new Date();
  dataMaximaPermitida.setFullYear(
    dataMaximaPermitida.getFullYear() - idadeMinima
  );

  const diasSemana = [
    { key: "seg", label: "Segunda" },
    { key: "ter", label: "Terça" },
    { key: "qua", label: "Quarta" },
    { key: "qui", label: "Quinta" },
    { key: "sex", label: "Sexta" },
    { key: "sab", label: "Sábado" },
    { key: "dom", label: "Domingo" },
  ];

  const periodos = ["Manhã", "Tarde", "Noite"];

  // 🔹 Buscar estados
  useEffect(() => {
    const carregarEstados = async () => {
      try {
        const response = await api.get("/ibge/estados");
        const ordenados = response.data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
        setEstados(ordenados);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os estados.");
      }
    };
    carregarEstados();
  }, []);

  // 🔹 Buscar cidades
  useEffect(() => {
    if (form.estado) {
      const carregarCidades = async () => {
        setLoadingCidades(true);
        try {
          const response = await api.get(`/ibge/cidades/${form.estado}`);
          const ordenadas = response.data.sort((a: any, b: any) =>
            a.nome.localeCompare(b.nome)
          );
          setCidades(ordenadas);
        } catch (error) {
          Alert.alert("Erro", "Não foi possível carregar as cidades.");
        } finally {
          setLoadingCidades(false);
        }
      };
      carregarCidades();
    } else {
      setCidades([]);
    }
  }, [form.estado]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const formatarDataDisplay = (data: Date) => {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const formatarDataEnvio = (data: Date) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const handleSubmit = async () => {
    const idade = calcularIdade(form.nascimento);
  if (idade < 18) {
    Alert.alert("Atenção", "Você precisa ter 18 anos ou mais para se cadastrar.");
    return;
  }
    if (
      !form.nome ||
      !form.email ||
      !form.senha ||
      !form.estado ||
      !form.cidade
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    const profissaoFinal =
      form.profissao === "Outra"
        ? profissaoLivre.trim() || "Outra"
        : form.profissao || "Não informado";

    const inserirCoren =
      form.profissao === "Enfermeiro(a)"
        ? profissaoLivre.trim() || "Enfermeiro(a)"
        : form.profissao || "Não informado";

    setLoading(true);
    try {
      const estadoSelecionado = estados.find((e) => e.id === form.estado);
      const cidadeSelecionada = cidades.find((c) => c.id === form.cidade);

      if (!estadoSelecionado || !cidadeSelecionada) {
        Alert.alert("Erro", "Selecione um estado e cidade válidos.");
        setLoading(false);
        return;
      }

      const payload = {
        name: form.nome,
        email: form.email,
        password: form.senha,
        telefone: form.telefone.replace(/\D/g, ""), // remove máscara
        cpf: form.cpf.replace(/\D/g, ""), // remove máscara
        foto: imagem,
        nascimento: formatarDataEnvio(form.nascimento),
        parentesco: "",
        profissao: profissaoFinal,
        cidade: {
          id: cidadeSelecionada.id,
          nome: cidadeSelecionada.nome,
          estado: {
            id: estadoSelecionado.id,
            nome: estadoSelecionado.nome,
            sigla: estadoSelecionado.sigla,
          },
        },
        coren: form.coren,
        tipo: "CUIDADOR",
        diasHorarios: JSON.stringify(diasSelecionados),
        experiencia: form.experiencia,
      };

      console.log("📦 Enviando para /auth/register:", payload);

      const response = await api.post("/auth/register", payload);
      const usuarioCadastrado = response.data;

      await AsyncStorage.setItem("token", usuarioCadastrado.token);
      await AsyncStorage.setItem("user", JSON.stringify(usuarioCadastrado));
      await AsyncStorage.setItem("tipoUsuario", "CUIDADOR");

      await AsyncStorage.setItem("userId", String(response.data.id));

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("HomeCuidador");
    } catch (error: any) {
      console.error("❌ Erro no cadastro:", error);
      const msg = error?.response?.data || "Erro ao cadastrar.";
      Alert.alert("Erro", String(msg));
    } finally {
      setLoading(false);
    }
  };

  const toggleDiaHorario = (diaKey: string, periodo: string) => {
    const existe = diasSelecionados.some(
      (item) => item.dia === diaKey && item.periodo === periodo
    );

    if (existe) {
      setDiasSelecionados((prev) =>
        prev.filter(
          (item) => !(item.dia === diaKey && item.periodo === periodo)
        )
      );
    } else {
      setDiasSelecionados((prev) => [...prev, { dia: diaKey, periodo }]);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#faf8d4" }}>
      <View style={styles.container}>
        <Image source={Texto} style={styles.imagem} />

        <View style={styles.caixatexto}>
          <Text style={styles.texto}>Nome Completo</Text>
          <Input
            value={form.nome}
            onChangeText={(v) => handleChange("nome", v)}
          />

          <Text style={styles.texto2}>CPF</Text>
          <MaskedTextInput
            mask="999.999.999-99"
            keyboardType="numeric"
            value={form.cpf}
            onChangeText={(v) => handleChange("cpf", v)}
            style={{
              backgroundColor: "rgba(142,196,110,0.6)",
              width: 300,
              height: 45,
              borderRadius: 25,
              paddingLeft: 15,
              borderColor: "rgba(40,55,32,0.6)",
              borderWidth: 1,
              color: "#5b3000",
              fontFamily: "Quicksand-Regular",
            }}
          />

          <Text style={styles.texto2}>Profissão</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.profissao}
              onValueChange={(itemValue) =>
                handleChange("profissao", itemValue)
              }
            >
              <Picker.Item label="Selecione" value="" />
              <Picker.Item label="Enfermeiro(a)" value="Enfermeiro(a)" />
              <Picker.Item
                label="Cuidador(a) de Idosos"
                value="Cuidador(a) de Idosos"
              />
              <Picker.Item label="Outra" value="Outra" />
            </Picker>
          </View>

          {form.profissao === "Outra" && (
            <>
              <Text style={styles.texto2}>Digite sua profissão</Text>
              <Input
                value={profissaoLivre}
                onChangeText={setProfissaoLivre}
                placeholder="Ex: Terapeuta ocupacional"
              />
            </>
          )}

          {form.profissao === "Enfermeiro(a)" && (
            <>
              <Text style={styles.texto2}>Digite seu COREN</Text>
              <Input
                value={form.coren}
                onChangeText={(v) => handleChange("coren", v)}
                placeholder="Ex: COREN-SP-12345"
              />
            </>
          )}

          <Text style={styles.texto2}>Telefone</Text>
          <MaskedTextInput
            mask="(99) 99999-9999"
            keyboardType="phone-pad"
            value={form.telefone}
            onChangeText={(v) => handleChange("telefone", v)}
            style={{
              backgroundColor: "rgba(142,196,110,0.6)",
              width: 300,
              height: 45,
              borderRadius: 25,
              paddingLeft: 15,
              borderColor: "rgba(40,55,32,0.6)",
              borderWidth: 1,
              color: "#5b3000",
              fontFamily: "Quicksand-Regular",
            }}
          />

          <Text style={styles.texto2}>Data de Nascimento</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(142,196,110,0.6)",
              width: 300,
              height: 45,
              borderRadius: 25,
              borderColor: "rgba(40,55,32,0.6)",
              borderWidth: 1,
              justifyContent: "center",
            }}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={{
                color: "#5b3000",
                fontFamily: "Quicksand-Regular",
                textAlign: "center",
              }}
            >
              {formatarDataDisplay(form.nascimento)}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={form.nascimento}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={dataMaximaPermitida}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) handleChange("nascimento", selectedDate);
              }}
            />
          )}

          <Text style={styles.texto2}>Dias e horários disponíveis </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(142,196,110,0.6)",
              width: 300,
              minHeight: 45,
              borderRadius: 25,
              justifyContent: "center",
              paddingHorizontal: 15,
              borderWidth: 1,
              borderColor: "rgba(40,55,32,0.6)",
            }}
            onPress={() => setModalDias(true)}
          >
            <Text
              style={{
                color: "#5b3000",
                fontFamily: "Quicksand-Regular",
                textAlign: "center",
              }}
            >
              {diasSelecionados.length === 0
                ? "Selecionar dias e horários"
                : diasSelecionados
                    .map(
                      (item) =>
                        `${
                          diasSemana.find((d) => d.key === item.dia)?.label
                        } – ${item.periodo}`
                    )
                    .join(", ")}
            </Text>
          </TouchableOpacity>

          <Modal visible={modalDias} transparent animationType="slide">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  padding: 20,
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Quicksand-Bold",
                    color: "#5b3000",
                    marginBottom: 10,
                  }}
                >
                  Escolher dias e horários
                </Text>

                <ScrollView style={{ maxHeight: 400 }}>
                  {diasSemana.map((dia) => (
                    <View key={dia.key} style={{ marginBottom: 15 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Quicksand-Bold",
                          color: "#5b3000",
                        }}
                      >
                        {dia.label}
                      </Text>

                      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {periodos.map((periodo) => {
                          const marcado = diasSelecionados.some(
                            (d) => d.dia === dia.key && d.periodo === periodo
                          );

                          return (
                            <TouchableOpacity
                              key={periodo}
                              onPress={() => toggleDiaHorario(dia.key, periodo)}
                              style={{
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: "#8ec46e",
                                backgroundColor: marcado
                                  ? "rgba(142,196,110,0.6)"
                                  : "#fff",
                                marginRight: 10,
                                marginTop: 8,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#5b3000",
                                  fontFamily: "Quicksand-Regular",
                                }}
                              >
                                {periodo}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  onPress={() => setModalDias(false)}
                  style={{
                    backgroundColor: "#8ec46e",
                    padding: 12,
                    borderRadius: 25,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#5b3000",
                      fontFamily: "Quicksand-Bold",
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.texto2}>Possui experiência na área?</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {/* Checkbox Sim */}
            <TouchableOpacity
              onPress={() => setTemExperiencia(true)}
              style={{
                width: 22,
                height: 22,
                borderWidth: 2,
                borderColor: "#5b3000",
                borderRadius: 5,
                marginRight: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  temExperiencia === true ? "#8ec46e" : "transparent",
              }}
            >
              {temExperiencia === true && (
                <View
                  style={{ width: 12, height: 12, backgroundColor: "#5b3000" }}
                />
              )}
            </TouchableOpacity>
            <Text
              style={{
                color: "#5b3000",
                fontFamily: "Quicksand-Regular",
                marginRight: 15,
              }}
            >
              Sim
            </Text>

            {/* Checkbox Não */}
            <TouchableOpacity
              onPress={() => {
                setTemExperiencia(false);
                handleChange("experiencia", "");
              }}
              style={{
                width: 22,
                height: 22,
                borderWidth: 2,
                borderColor: "#5b3000",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  temExperiencia === false ? "#8ec46e" : "transparent",
                marginRight: 8,
              }}
            >
              {temExperiencia === false && (
                <View
                  style={{ width: 12, height: 12, backgroundColor: "#5b3000" }}
                />
              )}
            </TouchableOpacity>
            <Text style={{ color: "#5b3000", fontFamily: "Quicksand-Regular" }}>
              Não
            </Text>
          </View>

          {temExperiencia === true && (
            <>
              <Text style={styles.texto2}>Descreva sua experiência</Text>
              <Input
                value={form.experiencia}
                onChangeText={(v) => handleChange("experiencia", v)}
                placeholder="Ex: 2 anos cuidando de idosos acamados..."
              />
            </>
          )}

          <Text style={styles.texto2}>Estado</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={form.estado}
              onValueChange={(itemValue) => {
                handleChange("estado", itemValue);
                handleChange("cidade", "");
              }}
            >
              <Picker.Item label="Selecione o Estado" value="" />
              {estados.map((estado) => (
                <Picker.Item
                  key={estado.id}
                  label={estado.nome}
                  value={estado.id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.texto2}>Cidade</Text>
          <View style={styles.pickerContainer}>
            {loadingCidades ? (
              <ActivityIndicator size="small" color="#333" />
            ) : (
              <Picker
                selectedValue={form.cidade}
                onValueChange={(itemValue) => handleChange("cidade", itemValue)}
                enabled={!!form.estado}
              >
                <Picker.Item label="Selecione a Cidade" value="" />
                {cidades.map((cidade) => (
                  <Picker.Item
                    key={cidade.id}
                    label={cidade.nome}
                    value={cidade.id}
                  />
                ))}
              </Picker>
            )}
          </View>

          <FotoPicker
            imagem={imagem}
            setImagem={setImagem}
            label="Foto do Profissional"
          />

          <Text style={styles.texto2}>Email</Text>
          <Input
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
          />

          <Text style={styles.texto2}>Senha</Text>
          <Input
            secureTextEntry
            value={form.senha}
            onChangeText={(v) => handleChange("senha", v)}
          />
        </View>

        <View style={styles.botao}>
          {loading ? (
            <ActivityIndicator size="large" color="#333" />
          ) : (
            <Btn texto="Cadastrar" onPress={handleSubmit} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
