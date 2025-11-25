import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./FotoPickerStyles";

interface FotoPickerProps {
  imagem: string | null;
  setImagem: (uri: string) => void;
  label?: string;
}

export function FotoPicker({ imagem, setImagem, label }: FotoPickerProps) {
  const selecionarImagem = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "É necessário permitir acesso às fotos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity style={styles.fotoButton} onPress={selecionarImagem}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.fotoPreview} />
        ) : (
          <Text style={styles.fotoTexto}>Selecionar foto</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
