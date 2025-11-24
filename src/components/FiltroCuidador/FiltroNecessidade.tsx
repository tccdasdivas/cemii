import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./stylesFiltro";

interface Props {
  filtroNecessidade: "sim" | "nao" | null;
  setFiltroNecessidade: (value: "sim" | "nao" | null) => void;
}

export function FiltroNecessidade({
  filtroNecessidade,
  setFiltroNecessidade,
}: Props) {
  const toggle = (value: "sim" | "nao") => {
    setFiltroNecessidade(filtroNecessidade === value ? null : value);
  };

  return (
    <View>
      <Text style={styles.titulo}>Necessidade Especial:</Text>

      {["sim", "nao"].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.checkboxContainer}
          onPress={() => toggle(item as "sim" | "nao")}
        >
          <View style={styles.checkboxBox}>
            {filtroNecessidade === item && (
              <View style={styles.checkboxChecked} />
            )}
          </View>

          <Text style={styles.label}>
            {item === "sim" ? "SIM" : "NÃO"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}