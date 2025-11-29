import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';

import { styles } from './MenssagemStyles';

import Manoel from '../../../assets/manoel.png';

import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import * as Font from "expo-font";

export function Menssagem() {

  const navigation = useNavigation();
  
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
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
          <View style={{ flexDirection:'row', marginTop:-80}}>
            <TouchableOpacity
              onPress={()=> navigation.navigate('Chat')}
              style={styles.icone}>
                <AntDesign name="arrowleft" size={30} style={styles.seta} />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginTop:30, marginLeft:-10}}>
            <Image 
            source={Manoel}
            style={styles.img}
            />
            <View style={{alignItems:'center', marginLeft:35}}>
              <Text style={styles.texto1}>Manoel Gomes</Text>
              <Text style={styles.texto2}>Online</Text>
            </View>
            <Feather name="phone" size={35} color="#5b3000" style={{marginLeft:55}}/>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}