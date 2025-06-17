import React ,  { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FavoritosStyles';
import * as Font from "expo-font";

import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Fundo from '../../../assets/fundoHome.png';

export function Favoritos() {
  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);
      
        useEffect(() => {
          async function loadFonts() {
            await Font.loadAsync({
              "OpenSans-Bold": require("../../../assets/fonts/Open Sans/OpenSans-Bold.ttf"),
            });
            setFontsLoaded(true);
          }
          loadFonts();
        }, []);

  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
      <View style={styles.container}>
        <View style={styles.box1}>
          <ImageBackground 
                source={Fundo} 
                style={styles.fundo}/>
          <View style={{ flexDirection:'row', paddingTop:50}}>
            <TouchableOpacity
              onPress={()=> navigation.navigate('Home')}
              style={styles.icone}>
                <AntDesign name="arrowleft" size={35} style={styles.seta} />
            </TouchableOpacity>
            <View style={styles.boxtexto}>
              <Text style={styles.texto}>Favoritos</Text>
            </View>
          </View>
        </View>
        <View style={styles.box2}>
          <View>
            <Image/>
            <View>
              <Text>Manoel Gomes</Text>
              <Text>Vamos marcar!!</Text>
            </View>
            <FontAwesome name="heart" size={35} color="#5783a2" />
          </View>
        </View>
      </View>
    </ScrollView>
   
  );
}