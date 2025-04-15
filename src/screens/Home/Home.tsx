import React from 'react';
import { View, Image, Text, ScrollView, ImageBackground } from 'react-native';
import Fundo from '../../../assets/fundoHome.png';
import { styles } from './HomeStyles';
import { Pesquisar } from '../../components/TextInput/Pesquisar';

export function Home() {
    return (
        <ScrollView style={{backgroundColor:'#faf8d4'}}>
            <View style={styles.container}>
                <ImageBackground source={Fundo} style={styles.imagem}/>
                <View style={styles.icones}>
                    <Text>V</Text>
                    <Text>V</Text>
                </View>
                <Pesquisar/>
            </View>
        </ScrollView>
    )
}