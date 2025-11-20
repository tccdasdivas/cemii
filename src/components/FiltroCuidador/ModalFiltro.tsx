import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./stylesFiltro";
import { FiltroProfissao } from "./FiltroProfissao";
import { FiltroExperiencia } from "./FiltroExperiencia";

interface Props {
  visible: boolean;
  fechar: () => void;
  filtroProfissao: string | null;
  setFiltroProfissao: (value: string | null) => void;
  filtroExperiencia: boolean | null;
  setFiltroExperiencia: (value: boolean | null) => void;
}

export function ModalFiltro({
  visible,
  fechar,
  filtroProfissao,
  setFiltroProfissao,
  filtroExperiencia,
  setFiltroExperiencia,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBg}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitulo}>Filtrar Perfis</Text>

          <FiltroProfissao
            filtroProfissao={filtroProfissao}
            setFiltroProfissao={setFiltroProfissao}
          />

          <FiltroExperiencia
            filtroExperiencia={filtroExperiencia}
            setFiltroExperiencia={setFiltroExperiencia}
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
