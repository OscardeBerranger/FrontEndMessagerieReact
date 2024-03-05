
import { Text, View } from '@/components/Themed';
import {baseUrl, currentUserId, getToken} from "@/app/common/globalVariables";
import {useRouter} from "expo-router";
import axios from "axios";
import React, {useState} from "react";
import {Button, FlatList} from "react-native";
import axiosHttp from "@/app/common/interceptor";

function handleFriendRequest(id: number){
    axiosHttp.post(baseUrl+"/api/sendfriendrequest/"+id)
        .then(res=>{
            console.log(res)
        })
}

let allUsers: Array<any> = []


export function setAllUsers(users = []){
    allUsers = users
}

export default function TabTwoScreen() {
    const navigation = useRouter()
    if (!getToken()){
        navigation.push("/registration")
    }
    let tmpAllUsers= []
    allUsers.forEach(item =>{
        if (item.id == currentUserId){

        }else {
            tmpAllUsers.push(item)
        }
    })

    setAllUsers(tmpAllUsers)
    return (
        <View>
            <Text>returned</Text>
            <FlatList
                data={allUsers}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.username}</Text>
                        <Text>{item.lastname}</Text>
                        <Button title={"Envoyer une demande d'amis"} onPress={()=>{
                            handleFriendRequest(item.id)
                        }} />
                    </View>
                )}
            />
        </View>
    )
}