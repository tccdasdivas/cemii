import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Fundo from '../../../assets/fundoHome.png';
import { styles } from './HomeStyles';
import { Pesquisar } from '../../components/TextInput/Pesquisar';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

import Oculos from '../../../assets/oculos.png';
import Menssagem  from '../../../assets/mensagem.png';
import { Perfil1 } from '../../components/Perfil/Perfil1';
import { Perfil2 } from '../../components/Perfil/Perfil2';

import { useNavigation } from '@react-navigation/native';

import * as Font from "expo-font";

export function Home() {
    const navigation = useNavigation();

    const [fontsLoaded, setFontsLoaded] = useState(false);
    
      useEffect(() => {
        async function loadFonts() {
          await Font.loadAsync({
            "Brixton-Regular": require("../../../assets/fonts/Brixton/Brixton-Regular.ttf"),
          });
          setFontsLoaded(true);
        }
        loadFonts();
      }, []);

    return (
        <ScrollView style={{backgroundColor:'#faf8d4'}}>
            <View style={styles.container}>
                <ImageBackground 
                source={Fundo} 
                style={styles.imagem}/>
                <View style={styles.icone}>
                    <TouchableOpacity
                         onPress={()=> navigation.navigate(TelaPerfil)}>
                        <Ionicons name="person" size={30} style={styles.perfil}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:30}}>
                    <Pesquisar/>
                </View>
                <View style={styles.container2}>
                    <View style={styles.box}>
                        <View style={styles.menu}>
                            <View style={styles.mensagem}>
                                <TouchableOpacity
                                onPress={()=> navigation.navigate(TelaMenssagem)}>
                                    <Image source={Menssagem} style={styles.mensagemimg}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.coracao}>
                                <TouchableOpacity
                                onPress={()=> navigation.navigate('Favoritos')}>
                                    <FontAwesome name="heart" size={35} color="#e39694" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.oculos}>
                                <TouchableOpacity
                                onPress={()=> navigation.navigate('Sobre')}>
                                    <Image source={Oculos} style={styles.oculosimg}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ width:'81%'}}>
                        <View style={styles.textos}>
                            <Text style={styles.texto1}>Perfis Disponíveis</Text>
                                <TouchableOpacity style={{flexDirection:'row',marginTop:10}}>
                                   <Text style={styles.texto2}>Filtrar</Text><AntDesign name="right" size={15} color="#5b3000" />
                                </TouchableOpacity>
                        </View>

                        <Perfil1/>
                        <Perfil2/>
                    
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}