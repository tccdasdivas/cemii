import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Inicial }  from "../../screens/Inicial/Inicial";
import { Entrar } from "../../screens/Entrar/Entrar";
import { Escolha }  from "../../screens/Escolha/Escolha";
import { CadastroFam } from "../../screens/CadastroFam/CadastroFam";
import { CadastroIdoso } from "../../screens/CadastroIdoso/CadastroIdoso";
import { CadastroCuid } from "../../screens/CadastroCuid/CadastroCuid";
import { HomeResponsavel } from "../../screens/Home/HomeResponsavel";
import { SobreCuidador } from "../../screens/Sobre/SobreCuidador";
import { FavoritosCuidador } from "../../screens/Favoritos/FavotitosCuidador";
import { Menssagem } from "../../screens/Menssagem/Menssagem";
import { PerfilCuidador } from "../../screens/Perfil/PerfilCuidador";
import { InformacoesPerfilResponsavel } from "../../screens/InformacoesPerfil/InformacoesPerfilResponsavel";
import { InformacoesPerfilCuidador } from "../../screens/InformacoesPerfil/InformacoesPerfilCuidador";
import { SobreResponsavel } from "../../screens/Sobre/SobreResponsavel";
import { FavoritosResponsavel } from "../../screens/Favoritos/FavotitosResponsavel";
import { ChatCuidador } from "../../screens/Chat/ChatCuidador";
import { ChatResponsavel } from "../../screens/Chat/ChatResponsavel";
import { HomeCuidador } from "../../screens/Home/HomeCuidador";
import { PerfilResponsavel } from "../../screens/Perfil/PerfilResponsavel";


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
            <Screen name="HomeResponsavel" component={HomeResponsavel}/>
            <Screen name="HomeCuidador" component={HomeCuidador}/>
            <Screen name="SobreResponsavel" component={SobreResponsavel}/>
            <Screen name="SobreCuidador" component={SobreCuidador}/>
            <Screen name="FavoritosCuidador" component={FavoritosCuidador}/>
            <Screen name="FavoritosResponsavel" component={FavoritosResponsavel}/>
            <Screen name="ChatCuidador" component={ChatCuidador}/>
            <Screen name="ChatResponsavel" component={ChatResponsavel}/>
            <Screen name="Menssagem" component={Menssagem}/>
            <Screen name="PerfilCuidador" component={PerfilCuidador}/>
             <Screen name="PerfilResponsavel" component={PerfilResponsavel}/>
            <Screen name="InformacaoCuidador" component={InformacoesPerfilCuidador}/>
            <Screen name="InformacaoResponsavel" component={InformacoesPerfilResponsavel}/>
            
        </Navigator>
    )
}