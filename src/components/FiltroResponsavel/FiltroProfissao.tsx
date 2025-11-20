import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./stylesFiltro";

interface Props {
  filtroProfissao: string | null;
  setFiltroProfissao: (value: string | null) => void;
}

export function FiltroProfissao({
  filtroProfissao,
  setFiltroProfissao,
}: Props) {
  const toggle = (value: string) => {
    setFiltroProfissao(filtroProfissao === value ? null : value);
  };

  const [temExperiencia, setTemExperiencia] = useState<boolean | null>(null);

  return (
    <View>
      <Text style={styles.titulo}>Profissão:</Text>

      {["cuidador", "enfermeiro", "outros"].map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.checkboxContainer,
            {
              backgroundColor:
                temExperiencia === true ? "#8ec46e" : "transparent",
            },
          ]}
          onPress={() => toggle(item)}
        >
          {temExperiencia === true && (
            <View
              style={{ width: 12, height: 12, backgroundColor: "#5b3000" }}
            />
          )}
          <View style={styles.checkboxBox}>
            {filtroProfissao === item && (
              <View style={styles.checkboxChecked} />
            )}
          </View>
          <Text style={styles.label}>{item.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
