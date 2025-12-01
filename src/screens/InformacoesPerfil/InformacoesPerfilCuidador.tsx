import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Usuario from "../../../assets/usuario.png";
import Fundo from "../../../assets/fundoHome.png";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./InformacoesPerfilStyles";
import { Ionicons } from "@expo/vector-icons";
import { calcularIdade } from "../../utils/calcularIdade";
import { formatarTelefone } from "../../utils/telefoneMask";

export function InformacoesPerfilCuidador() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  return (
    <ScrollView>

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeCuidador")}
          style={styles.icone}
        >
          <AntDesign name="arrowleft" size={35} style={styles.seta} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          {user?.foto ? (
            <Image
              source={
                user?.foto
                  ? { uri: `data:image/jpeg;base64,${user.foto}` }
                  : Usuario
              }
              style={styles.img}
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
                backgroundColor: "#faf8d4",
                marginTop: 30,
              }}
            />
          )}
          <Text style={styles.texto}>{user.nome}</Text>
        </View>

        <View style={{ marginTop: 30, alignItems: "center" }}>
          <ImageBackground
            source={Fundo}
            style={styles.fundo}
            borderRadius={40}
          />
          <View style={styles.box}>
            <View style={{ width: "90%", textAlign: "center" }}>
              <Text style={styles.texto1}>
                Idade do Idoso: {calcularIdade(user.nascimento)} anos
              </Text>
              <Text style={styles.texto1}>
                Necessidade especial: {user.necessidade || "Não possui"}
              </Text>
              <Text style={styles.texto1}>
                Logradouro do Idoso: {user.logradouro}- {user.bairro} - {user.cidade?.nome} - {user.cidade?.estado?.nome}
              </Text>
              <Text style={styles.texto1}>
                Nome do Responsável: {formatarTelefone(user.responsavel.nome)}
              </Text>
              <Text style={styles.texto1}>
                Telefone do Responsável:
                {formatarTelefone(user.responsavel.telefone)}
              </Text>
              <Text style={styles.texto1}>
                Email do Responsável: {user.responsavel.email}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
