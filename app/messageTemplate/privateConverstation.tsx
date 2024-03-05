import {Text, View} from "@/components/Themed";
import {Button, FlatList, TextInput} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import axiosHttp from "@/app/common/interceptor";
import {baseUrl} from "@/app/common/globalVariables";
import {GlobalContext} from "@/app/_layout";


export default function privateConverstation() {
    const [messageToSend, setMessageToSend] = useState("")
    const { privateConversation, setPrivateConversation  } = useContext(GlobalContext)

    useEffect(() => {
    }, []);


    function handleSendMessage(){
        if (messageToSend != "") {
            axiosHttp.post(baseUrl + "/api/private/message/create/" + privateConversation.id, {
                "content": messageToSend
            }).catch(err=>{console.log(err)})
        }
    }
    console.log(privateConversation.messages)

    return(
        <View>
            <FlatList
                data={privateConversation.messages}
                renderItem={({ item }) => (
                    <View>
                        <Text>Sent By {item.author.username}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
            <TextInput
                placeholder={"Entrez votre message"}
                value = {messageToSend}
                onChangeText={(text)=>{
                    setMessageToSend(text)
                }}
            />
            <Button title={"SendMessage"} onPress={()=>{handleSendMessage()}} />
        </View>
    )
}
