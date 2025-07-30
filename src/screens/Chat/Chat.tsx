import React ,  { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';

import { styles } from './ChatStyles';
import * as Font from "expo-font";

import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';

import Fundo from '../../../assets/fundoHome.png';
import { Pesquisar } from '../../components/TextInput/Pesquisar';
import { ChatList } from '../../components/Chat/ChatList';

export function Chat() {
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
          <View style={{ flexDirection:'row', paddingTop:30}}>
            <TouchableOpacity
              onPress={()=> navigation.navigate('Home')}
              style={styles.icone}>
                <AntDesign name="arrowleft" size={30} style={styles.seta} />
            </TouchableOpacity>
            <View style={styles.boxinput}>
              <Pesquisar/>
            </View>
          </View>
        </View>
        <View style={styles.boxtexto}>
          <ChatList border={0} 
          background="rgba(127, 169, 199/ 0.2)" 
          bordercolor="rgba(6,2,82/ 0.2)"/>

          <ChatList border={0} 
          background="rgba(200,154,101/ 0.17)" 
          bordercolor="rgba(91,48,0/ 0.2)"/>

          <ChatList border={0} 
          background="rgba(142,196,110/ 0.17)" 
          bordercolor="rgba(40,55,32/ 0.2)"/>
        </View>
      </View>
    </ScrollView>
   
  );
}