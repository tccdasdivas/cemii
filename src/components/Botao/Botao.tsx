import { TouchableOpacity, View, Text } from 'react-native';
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

import { styles } from './BotaoStyles';

import * as Font from "expo-font";
  
type Propriedades = {
  texto: string;
  navegacao: string;
};

export function Botao(props: Propriedades) {

  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Quicksand-Regular": require("../../../assets/fonts/Quicksand/Quicksand-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <View>
        <TouchableOpacity
        style={styles.botao}
        onPress={()=> navigation.navigate(props.navegacao)}>
            <Text  style={styles.texto}>{props.texto}</Text>
        </TouchableOpacity>
    </View>
  );
}