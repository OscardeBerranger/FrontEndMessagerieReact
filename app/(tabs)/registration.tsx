import React, {useState} from 'react'
import {SafeAreaView, TextInput, StyleSheet, Button, View, Text} from "react-native";
import {useRouter} from "expo-router";
import {baseUrl, setCurrentUserEmail, setToken, getToken} from "@/app/common/globalVariables";

export default function RegisterScreen() {

    const navigation = useRouter()
    if (getToken()!=""){
        return (
            <SafeAreaView>
                <Button title={"logout"} onPress={()=>{
                    setToken("")
                    setCurrentUserEmail("profile")
                    navigation.push('/registration')

                }} />
            </SafeAreaView>
        );
    }else {
        return (
            <SafeAreaView>
                <Button title={"login"} onPress={()=>{navigation.push('/RegistrationTemplates/login')}} />
                <Button title={"register"} onPress={()=>{navigation.push('/RegistrationTemplates/register')}} />
            </SafeAreaView>
        )
    }

}