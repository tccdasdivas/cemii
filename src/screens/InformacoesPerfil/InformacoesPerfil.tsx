import React, { useState } from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';


import Manoel from '../../../assets/manoel.png';
import O from '../../../assets/o.png';
import Fundo from '../../../assets/fundoHome.png';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import { styles } from './InformacoesPerfilStyles';

export function InformacoesPerfil() {
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
              source={Manoel} 
              style={styles.img}/>
              <Text style={styles.texto}>Manoel Gomes</Text>
          </View>
  
          <View style={{marginTop:30, alignItems:'center'}}>
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