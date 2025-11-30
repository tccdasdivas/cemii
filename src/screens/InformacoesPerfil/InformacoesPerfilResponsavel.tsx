import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import Usuario from "../../../assets/usuario.png";
import Fundo from "../../../assets/fundoHome.png";

import AntDesign from "@expo/vector-icons/AntDesign";

import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "./InformacoesPerfilStyles";
import { Ionicons } from "@expo/vector-icons";
import { calcularIdade } from "../../utils/calcularIdade";
import { formatarTelefone } from "../../utils/telefoneMask";

export function InformacoesPerfilResponsavel() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeResponsavel")}
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
        <Text style={styles.texto}>{user?.nome}</Text>
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
              Idade do Profissional: {calcularIdade(user.nascimento)} anos
            </Text>
            <Text style={styles.texto1}>Profissão: {user.profissao}</Text>
            {user?.coren ? (
              <Text style={styles.texto1}>COREN: {user.coren}</Text>
            ) : null}
            <Text style={styles.texto1}>
              Experiência na área: {user.experiencia || "Não Possui"}
            </Text>
            <Text style={styles.texto1}>
              Telefone do Profissional: {formatarTelefone(user.telefone)}
            </Text>
            <Text style={styles.texto1}>
              Email do Profissional: {user.email}
            </Text>
            <Text style={styles.texto1}>
              {user.cidade?.nome} - {user.cidade?.estado?.nome}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
