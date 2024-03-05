import {Alert, Button, Modal, Pressable, StyleSheet} from 'react-native';

import { Text, View } from '@/components/Themed';
import {baseUrl, setToken, getToken} from "@/app/common/globalVariables";
import {useRouter} from "expo-router";
import axios from "axios";
import React, {useState} from "react";


export default function TabTwoScreen() {
    const navigation = useRouter()
    const [modalVisible, setModalVisible] = useState(false);
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
        },
        buttonOpen: {
            backgroundColor: '#F194FF',
        },
        buttonClose: {
            backgroundColor: '#2196F3',
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
    });

    if (getToken()){
        let headers = {
            headers: {
                'Authorization': 'Bearer '+getToken(),
                'Content-Type': 'application/json'
            }
        }
        axios.get(baseUrl+"/api/getmyfriends", headers)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))

        return (
            <View>
                <View>
                    <Button title={"Ajouter des amis"} onPress={()=>{}}></Button>
                    <Text>Message Displayer</Text>
                </View>
            </View>
        );




    }else {
        return (
            <View>
                <Text>You are not connected</Text>
                <Button title={"Login"} onPress={()=>{
                    navigation.push("/registration")
                }} />
            </View>
        )
    }
}