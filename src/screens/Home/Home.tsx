import React from 'react';
import { View, Image, Text, ScrollView, ImageBackground } from 'react-native';
import Fundo from '../../../assets/fundoHome.png';
import { styles } from './HomeStyles';
import { Pesquisar } from '../../components/TextInput/Pesquisar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Oculos from '../../../assets/oculos.png';
import Menssagem  from '../../../assets/mensagem.png';

export function Home() {
    return (
        <ScrollView style={{backgroundColor:'#faf8d4'}}>
            <View style={styles.container}>
                <ImageBackground source={Fundo} style={styles.imagem}/>
                <View style={styles.icones}>
                    <AntDesign name="arrowleft" size={35} style={styles.icone1}/>
                    <Ionicons name="person" size={30} style={styles.icone2}/>
                </View>
                <Pesquisar/>
                <View style={styles.box}>
                    <View style={styles.mensagem}>
                        <Image source={Menssagem} style={styles.imagem2}/>
                    </View>
                </View>
                
            </View>
            
        </ScrollView>
    );
}