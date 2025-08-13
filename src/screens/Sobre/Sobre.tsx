import React from 'react';
import { View, Image, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import { styles } from './SobreStyles';

import SobreImg from '../../../assets/Sobre.png';
import O from '../../../assets/o.png';
import Fundo from '../../../assets/fundoHome.png';

import AntDesign from '@expo/vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

export function Sobre() {
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor:'#faf8d4'}}>
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
              <View style={{width:'95%'}}>
                <Text style={styles.texto3}>O nosso projeto surgiu de uma gincana da semana da informática (Hackathon) em nosso primeiro ano, 
                  a  primeira ideia se chamava CRAMI(Cronograma de Rotina, Alimentação e Medicamentos para Idosos) e 
                  possuía funções diferentes, ela auxiliava o próprio idoso a ter autonomia para realizar suas tarefas 
                  diárias e formular sua própria rotina, ao longo do desenvolvimento lógico do aplicativo vimos que a 
                  autossuficiência apresentada pelo app não levava em consideração as limitações que os usuários apresentavam, 
                  já que sua grande maioria precisa de cuidados e supervisão.
                  Logo, percebemos que um grande impasse para manter o bem-estar da melhor idade seria a falta de uma comunicação 
                  confiável entre cuidadores e enfermeiros de idosos com as respectivas famílias, pois não há nenhum aplicativo 
                  que auxilie nessa interlocução de maneira fácil e segura. Assim, o CEMII(Cuidadores e Enfermeiros da Melhor Idade) 
                  surgiu em nossas vidas.</Text>
              </View>
            </View> 
        </View>
      </View>
      </ScrollView>
  );
}