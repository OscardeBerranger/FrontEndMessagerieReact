import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Text, View } from '@/components/Themed';
import {useState} from "react";
import axios from "axios";
import {
    baseUrl,
    currentUserId, setCurrentUserEmail,
    setCurrentUserId,
    setToken, getToken
} from "@/app/common/globalVariables";
import {useRouter} from "expo-router";
import axiosHttp from "@/app/common/interceptor";


type userValues = {
    email: string,
    password: string
}

export default function login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useRouter()

    function handleSubmit(){
        let headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.post(baseUrl+"/api/login_check", {
            username: email,
            password: password
        }, headers)
            .then(res=>{
                setToken(res.data.token)

                console.log("test")
                axiosHttp.get(baseUrl+"/api/profile/whoami")
                    .then(data=>{
                        setCurrentUserId(data.data.id)
                        setCurrentUserEmail(data.data.username)
                    })
                    .catch(err=>console.log(err))



                navigation.push("/")
            })
            .catch(error => console.log(error));
    }




    return (
        <SafeAreaView>
            <View>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder={"Enter your email . . ."}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder={"Enter your password . . ."}
                    secureTextEntry={true}
                />
                <Button title={"login"} onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )}

const styles = StyleSheet.create({

});
