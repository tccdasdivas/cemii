import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./stylesFiltro";

interface Props {
  filtroExperiencia: boolean | null;
  setFiltroExperiencia: (value: boolean | null) => void;
}

export function FiltroExperiencia({
  filtroExperiencia,
  setFiltroExperiencia,
}: Props) {
  return (
    <View>
      <Text style={styles.titulo}>Experiência:</Text>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setFiltroExperiencia(true)}
      >
        <View style={styles.checkboxBox}>
          {filtroExperiencia === true && <View style={styles.checkboxChecked} />}
        </View>
        <Text style={styles.label}>SIM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setFiltroExperiencia(false)}
      >
        <View style={styles.checkboxBox}>
          {filtroExperiencia === false && <View style={styles.checkboxChecked} />}
        </View>
        <Text style={styles.label}>NÃO</Text>
      </TouchableOpacity>
    </View>
  );
}
