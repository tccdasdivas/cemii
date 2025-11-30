import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFavoritos(key: string): Promise<number[]> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    return [];
  }
}

export async function toggleFavorito(key: string, id: number): Promise<number[]> {
  try {
    const favoritosAtuais = await getFavoritos(key);

    let novosFavoritos = [];

    if (favoritosAtuais.includes(id)) {
      novosFavoritos = favoritosAtuais.filter(item => item !== id);
    } else {
      novosFavoritos = [...favoritosAtuais, id];
    }

    await AsyncStorage.setItem(key, JSON.stringify(novosFavoritos));

    return novosFavoritos;
  } catch (error) {
    console.error("Erro ao atualizar favoritos:", error);
    return [];
  }
}
