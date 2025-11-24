import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./stylesFiltro";

import { FiltroNecessidade } from "./FiltroNecessidade";

interface Props {
  visible: boolean;
  fechar: () => void;

  // <- mesma tipagem que o componente FiltroNecessidade
  filtroNecessidade: "sim" | "nao" | null;
  setFiltroNecessidade: (value: "sim" | "nao" | null) => void;
}

export function ModalFiltro({
  visible,
  fechar,
  filtroNecessidade,
  setFiltroNecessidade,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBg}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitulo}>Filtrar Perfis</Text>

          {/* FILTRO NECESSIDADE */}
          <FiltroNecessidade
            filtroNecessidade={filtroNecessidade}
            setFiltroNecessidade={setFiltroNecessidade}
          />

          <View style={styles.botoes}>
            <TouchableOpacity
              style={[styles.botao, styles.cancelar]}
              onPress={fechar}
            >
              <Text>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botao, styles.aplicar]}
              onPress={fechar}
            >
              <Text style={{ color: "#fff" }}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
