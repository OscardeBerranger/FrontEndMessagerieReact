import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Text, View } from '@/components/Themed';
import {useState} from "react";
import axios from "axios";
import {SubmitHandler} from "react-hook-form";
import {baseUrl, setToken} from "@/app/common/globalVariables";
import {contain} from "@hapi/hoek";
import {useRouter} from "expo-router";


type userValues = {
    email: string,
    password: string
}

export default function register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verification, setVerification] = useState("")
    const [warning, setWarning] = useState("")

    const navigation = useRouter()

    function handleSubmit(){
        if (password === verification){
            if (email.includes("@") && email.includes('.')) {
                let headers = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                axios.post(baseUrl + "/register", {
                    email: email,
                    password: password
                }, headers)
                    .then(res => {
                        if (res.status == 202){
                            setWarning("Cet email est déjà utilisée !")
                        }if (res.status == 200){
                            let headers = {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            }
                            axios.post(baseUrl+"/api/login_check", {
                                password: password,
                                username: email
                            }, headers)
                                .then(res=>{
                                    setToken(res.data.token)
                                    navigation.push("/")
                                })
                                .catch(error => console.log(error));
                        }
                    })
                    .catch(
                        err=> {
                            console.log(err)
                            setWarning("Il y a eu une erreur de mon côté je suis désolé .")
                        }
                    )
            }else {
                setWarning("Il y a un problème avec votre address mail elle doit contenir '@exemple.mail")
            }
        }else {
            setWarning("Les mots de passes ne sont pas les mêmes !")
        }
    }




    return (
        <SafeAreaView>
            <View>
                <Text
                    style={styles.textWarning}
                >{warning}</Text>
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder={"Entrez votre email . . ."}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder={"Entrez votre mot de passe . . ."}
                    secureTextEntry={true}
                />
                <TextInput
                    onChangeText={setVerification}
                    value={verification}
                    placeholder={"Réentrez votre mot de passe . . ."}
                    secureTextEntry={true}
                />
                <Button title={"Register"} onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )}

const styles = StyleSheet.create({
    textWarning: {
        color: "red"
    }
});
