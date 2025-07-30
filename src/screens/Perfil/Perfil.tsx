import React, { useState } from 'react';
import { ImageBackground, TouchableOpacity, View, Image, ScrollView, Text } from 'react-native';

import { styles } from './PerfilStyles';

import Fundo from '../../../assets/fundoHome.png';
import Bidu from '../../../assets/Bidu.png'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

export function Perfil() {
    const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
        <ImageBackground 
            source={Fundo} 
            style={styles.imagem}/>
            <TouchableOpacity
                onPress={()=> navigation.navigate('Home')}
                style={styles.icone}>
                    <AntDesign name="arrowleft" size={35} style={styles.seta} />
            </TouchableOpacity>
        <View style={styles.container}>
            <Image
            source={Bidu}
            style={styles.imgbidu}/>
            <TouchableOpacity style={styles.pencil}>
                <FontAwesome name="pencil" size={24} color="#5b3000"/>
            </TouchableOpacity>
            <Text style={styles.texto}>Bidu</Text>
            <View style={styles.box}>
                <View style={styles.box2}>
                    <View style={styles.box3}>
                        <Text style={styles.texto1}>Nome</Text>
                        <Text style={styles.texto2}>Email</Text>
                        <Text style={styles.texto2}>Senha</Text>
                    </View>
                </View>
                <TouchableOpacity style={{flexDirection:'row'}}>
                    <Text style={styles.texto}>Sair</Text>
                    <Entypo name="log-out" size={24} color="#725431" style={{marginTop:20, marginLeft:10}}/>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
}