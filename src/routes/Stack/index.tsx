import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Inicial }  from "../../screens/Inicial/Inicial";
import { Entrar } from "../../screens/Entrar/Entrar";
import { Escolha }  from "../../screens/Escolha/Escolha";
import { CadastroFam } from "../../screens/CadastroFam/CadastroFam";
import { CadastroIdoso } from "../../screens/CadastroIdoso/CadastroIdoso";
import { CadastroCuid } from "../../screens/CadastroCuid/CadastroCuid";
import { Home } from "../../screens/Home/Home";

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
        </Navigator>
    )
}