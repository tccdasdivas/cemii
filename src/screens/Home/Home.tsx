import React from 'react';
import { View, Image, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Fundo from '../../../assets/fundoHome.png';
import { styles } from './HomeStyles';
import { Pesquisar } from '../../components/TextInput/Pesquisar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Oculos from '../../../assets/oculos.png';
import Menssagem  from '../../../assets/mensagem.png';
import { useNavigation } from '@react-navigation/native';




export function Home() {
    const navigation = useNavigation();

    return (
        <ScrollView style={{backgroundColor:'#faf8d4'}}>
            <View style={styles.container}>
                <ImageBackground source={Fundo} style={styles.imagem}/>
                <View style={styles.icones}>
                    <TouchableOpacity
                         onPress={()=> navigation.navigate(Perfil)}>
                    <Ionicons name="person" size={30} style={styles.icone1}/>
                    </TouchableOpacity>
                </View>
                <Pesquisar/>
                <View style={styles.box}>
                    <View style={styles.mensagem}>
                        <TouchableOpacity
                         onPress={()=> navigation.navigate(TelaMenssagem)}>
                            <Image source={Menssagem} style={styles.imagem2}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mensagem}>
                        <TouchableOpacity
                         onPress={()=> navigation.navigate(TelaMenssagem)}>
                            <Image source={Menssagem} style={styles.imagem2}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mensagem}>
                        <TouchableOpacity
                         onPress={()=> navigation.navigate(TelaMenssagem)}>
                            <Image source={Menssagem} style={styles.imagem2}/>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                
            </View>
            
        </ScrollView>
    );
}