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
        <View style={styles.container}>
            <ImageBackground 
            source={Fundo} 
            style={styles.imagem}/>
            <TouchableOpacity
                onPress={()=> navigation.navigate('Home')}
                style={styles.icone}>
                    <AntDesign name="arrowleft" size={35} style={styles.seta} />
            </TouchableOpacity>
            <Image
            source={Bidu}
            style={styles.img}/>
            <FontAwesome name="pencil" size={24} color="#5b3000" />
            <View style={styles.box}>
                <View style={styles.box2}>
                    <View style={styles.box3}>
                        <Text style={styles.texto}>Nome</Text>
                        <Text style={styles.texto}>Email</Text>
                        <Text style={styles.texto}>Senha</Text>
                    </View>
                </View>
                <View>
                    <Text>Sair</Text>
                    <Entypo name="log-out" size={24} color="black" />
                </View>
            </View>
        </View>
    </ScrollView>
  );
}