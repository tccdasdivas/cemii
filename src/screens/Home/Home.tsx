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
                    <Text style={styles.icone1}>V</Text>
                    <Text style={styles.icone2}>V</Text>
                </View>
                <Pesquisar/>
            </View>
        </ScrollView>
    )
}