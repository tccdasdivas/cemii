import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ChatListStyles';

import UsuarioPadrao from '../../../assets/manoel.png';
import { Ionicons } from '@expo/vector-icons';

type Propriedades = {
  border: number;
  background: string;
  bordercolor: string;
  nomeUsuario: string;
  ultimaMensagem: string;
  fotoUsuario?: string; 
  index: number; 
  onPress: () => void;
};

export function ChatList(props: Propriedades) {
  
  const coresBordaImg = [
    "rgb(127, 169, 199)",
    "rgb(200,154,101)",
    "rgb(142,196,110)",
  ];
  
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          borderRadius: props.border,
          backgroundColor: props.background,
          borderColor: props.bordercolor,
          borderWidth: 1.5,
          marginTop: 17,
        }}
      >
        <View style={styles.perfil}>
          {props.fotoUsuario ? (
            <Image
              source={{ uri: `data:image/jpeg;base64,${props.fotoUsuario}` }}
              style={[
                styles.perfil1,
                {
                  borderColor: props.index % 2 === 0 ? "#7fa9c7" : "#8ec46e",
                },
              ]}
            />
          ) : (
            <Ionicons
              name="person"
              size={45}
              color="#c89a65"
              style={{
                marginRight: 10,
                borderColor: props.index % 3 ? "#7fa9c7" : "#8ec46e",
                borderWidth: 1,
                borderRadius: 15,
                padding: 5,
              }}
            />
          )}

          <View style={{ marginLeft: 20, marginTop: 15 }}>
            <Text style={styles.texto1}>{props.nomeUsuario}</Text>
            <Text style={styles.texto2}>{props.ultimaMensagem}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
