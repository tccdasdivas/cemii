import React from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';

import { styles } from './SobreStyles';

import SobreImg from '../../../assets/Sobre.png';
import O from '../../../assets/o.png';
import Fundo from '../../../assets/fundoHome.png';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

export function Sobre() {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
         <TouchableOpacity
            onPress={()=> navigation.navigate('Home')}
            style={styles.icone}>
              <AntDesign name="arrowleft" size={35} style={styles.seta} />
          </TouchableOpacity>

        <View style={{alignItems:'center'}}>
          <Image
            source={SobreImg} 
            style={styles.img}/>
          <View style={{flexDirection:'row'}}>
            <View>
              <Text style={styles.texto}>n</Text>
            </View>
            <View style={styles.o}>
              <Image
              source={O}
              style={styles.imgo}/>
            </View>
            <View>
              <Text style={styles.texto}>s</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop:50, alignItems:'center'}}>
          <ImageBackground 
            source={Fundo} 
            style={styles.fundo}
            borderRadius={40}/>
            <View style={styles.box}>
              <View style={{width:'17%'}}>
                <Text>Texto</Text>
              </View>
            </View> 
        </View>
      </View>
  );
}