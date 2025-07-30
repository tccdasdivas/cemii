import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Inicial }  from "../../screens/Inicial/Inicial";
import { Entrar } from "../../screens/Entrar/Entrar";
import { Escolha }  from "../../screens/Escolha/Escolha";
import { CadastroFam } from "../../screens/CadastroFam/CadastroFam";
import { CadastroIdoso } from "../../screens/CadastroIdoso/CadastroIdoso";
import { CadastroCuid } from "../../screens/CadastroCuid/CadastroCuid";
import { Home } from "../../screens/Home/Home";
import { Sobre } from "../../screens/Sobre/Sobre";
import { Favoritos } from "../../screens/Favoritos/Favotitos";
import { Chat } from "../../screens/Chat/Chat";
import { Menssagem } from "../../screens/Menssagem/Menssagem";
import { Perfil } from "../../screens/Perfil/Perfil";

const { Navigator, Screen}= createNativeStackNavigator()

export default function(){
    return(
        <Navigator initialRouteName="Inicial" screenOptions={{headerShown: false}}>
            <Screen name="Inicial" component={Inicial}/>
            <Screen name="Entrar" component={Entrar}/>
            <Screen name="Escolha" component={Escolha}/>
            <Screen name="Familia" component={CadastroFam}/>
            <Screen name="Idoso" component={CadastroIdoso}/>
            <Screen name="Cuidador" component={CadastroCuid}/>
            <Screen name="Home" component={Home}/>
            <Screen name="Sobre" component={Sobre}/>
            <Screen name="Favoritos" component={Favoritos}/>
            <Screen name="Chat" component={Chat}/>
            <Screen name="Menssagem" component={Menssagem}/>
            <Screen name="Perfil" component={Perfil}/>
        </Navigator>
    )
}