import axiosHttp from "@/app/common/interceptor";
import {baseUrl} from "@/app/common/globalVariables";
import React, {useState} from "react";
import {useRouter} from "expo-router";
import {Text, View} from "@/components/Themed";
import {Button, FlatList} from "react-native";

export let friendsRequest: any = []

export function setFriendsRequest(requests: Array<any>){
    friendsRequest = requests
}


export default function friendsRequests(){
    const navigation = useRouter()




    return (
        <View>
            <Text>Vos demandes d'amis </Text>
            <FlatList
                data={friendsRequest}
                renderItem={({ item }) => (
                    <View>
                        <Text>Evoyé par : {item.sentBy.username} </Text>
                        <Button title={"Ajouter en ami"} onPress={()=>{
                            axiosHttp.get(baseUrl+"/api/acceptFriendRequest/"+item.id)
                                .then(res=>{
                                })
                        }} />
                    </View>
                )}
            />
        </View>
    )
}