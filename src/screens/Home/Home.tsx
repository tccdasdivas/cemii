import React from 'react';
import { View, Image, Text, ScrollView, ImageBackground } from 'react-native';
import Fundo from '../../../assets/fundoHome.png';
import { styles } from './HomeStyles';
import { Pesquisar } from '../../components/TextInput/Pesquisar';
import AntDesign from '@expo/vector-icons/AntDesign';

export function Home() {
    return (
        <ScrollView style={{backgroundColor:'#faf8d4'}}>
            <View style={styles.container}>
                <ImageBackground source={Fundo} style={styles.imagem}/>
                <View style={styles.icones}>
                    <AntDesign name="arrowleft" size={35} style={styles.icone1}/>
                    <Text style={styles.icone2}>V</Text>
                </View>
                <Pesquisar/>
            </View>
            
        </ScrollView>
    )
}