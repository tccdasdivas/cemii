import React ,  { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FavoritosStyles';
import * as Font from "expo-font";

import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Fundo from '../../../assets/fundoHome.png';
import { ChatFavoritos } from '../../components/Chat/ChatFavoritos';

export function FavoritosResponsavel() {
  const navigation = useNavigation();

  const [fontsLoaded, setFontsLoaded] = useState(false);
      
        useEffect(() => {
          async function loadFonts() {
            await Font.loadAsync({
              "OpenSans-Bold": require("../../../assets/fonts/Open Sans/OpenSans-Bold.ttf"),
              "Quicksand-Bold": require("../../../assets/fonts/Quicksand/Quicksand-Bold.ttf"),
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
              onPress={()=> navigation.navigate('HomeResponsavel')}
              style={styles.icone}>
                <AntDesign name="arrowleft" size={35} style={styles.seta} />
            </TouchableOpacity>
            <View style={styles.boxtexto}>
              <Text style={styles.texto}>Favoritos</Text>
            </View>
          </View>
        </View>
        <View style={styles.box2}>
          <ChatFavoritos border={30} 
          background="rgba(127, 169, 199/ 0.2)" 
          bordercolor="rgba(6,2,82/ 0.2)"
          coracao="rgba(87,131,162/ 0.5)"
          bordaimg="rgba(6,2,82/ 0.2)"
          navegacao='Menssagem'/>

          <ChatFavoritos border={30} 
          background="rgba(200,154,101/ 0.17)" 
          bordercolor="rgba(91,48,0/ 0.2)"
          coracao="rgba(91,48,0/ 0.2)"
          bordaimg="rgba(91,48,0/ 0.2)"
          navegacao='Menssagem'/>

          <ChatFavoritos border={30} 
          background="rgba(142,196,110/ 0.17)" 
          bordercolor="rgba(40,55,32/ 0.2)"
          coracao="rgba(40,55,32/ 0.2)"
          bordaimg="rgba(40,55,32/ 0.2)"
          navegacao='Menssagem'/>
        </View>
      </View>
    </ScrollView>
   
  );
}