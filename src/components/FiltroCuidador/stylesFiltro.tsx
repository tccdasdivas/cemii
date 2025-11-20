import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  titulo: {
    fontSize: 17,
    marginBottom: 5,
    marginTop: 15,
    fontWeight: "600",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  checkboxBox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#5b3000",
    borderRadius: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5b3000",
    borderColor: "#8ec46e",
    borderWidth: 2,
    borderRadius: 5,
  },

  label: {
    fontSize: 15,
  },

  botoes: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },

  botao: {
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
  },

  aplicar: {
    backgroundColor: "#8ec46e",
  },

  cancelar: {
    backgroundColor: "#ccc",
  },
});
