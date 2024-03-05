import {Alert, Button, FlatList, Image, Modal, Pressable, StyleSheet, TouchableHighlight} from 'react-native';
import { Text, View } from '@/components/Themed';
import {useRouter} from "expo-router";
import React, {useEffect, useState, useContext} from "react";
import axiosHttp from "@/app/common/interceptor";
import {baseUrl, currentUserId, getToken} from "@/app/common/globalVariables";
import {friendsRequest, setFriendsRequest} from "@/app/FriendsRequests/friendsRequests";
import {setAllUsers} from "@/app/FriendsRequests/addFriends";
import {GlobalContext} from "@/app/_layout";

type ItemProps = {title: string}


export default function TabTwoScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [friends, setFriends]=useState<any[]>([])
    const { privateConversations, setPrivateConversations, privateConversation, setPrivateConversation  } = useContext(GlobalContext)
    const navigation = useRouter()
    let pos = 9
    const styles = StyleSheet.create({
        homeLogo: {
            width: 30,
            height: 30,
        },
        logoContainer: {
            opacity: 0.9,
            margin: pos,
            alignSelf: "flex-end",
        },
        container: {
        },
        centeredView: {
            flex: 1,
            marginTop: 50,
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
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
            margin: 15,
            backgroundColor: '#2196F3',
            alignSelf: "flex-end",
            width: 40
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
        friendsDisplayer: {
            margin: 5,
            padding: 5,
            borderWidth: 2,
        },
        topBtnContainer: {
            flexDirection: "row",
        },
        topBtn: {

        }
    })
    function handleClick(){
        navigation.push('/FriendsRequests/friends')
    }


    function handleFriendShow(){
        if (!getToken()){
            navigation.navigate("/registration")
        }
        axiosHttp.get(baseUrl+"/api/getmyfriends")
            .then((res)=>{
                if (res.status === 401){
                    navigation.push("/registration")
                }else {
                    setModalVisible(true)
                    setFriends(res.data)
                }
            })
            .catch(err=>console.log(err))

    }

    function handleFriendsAdd(){
        axiosHttp.get(baseUrl+"/api/profile/getpeople")
            .then(res=>{
                setAllUsers(res.data)
            })
            .then(foo=>{
                navigation.push("/FriendsRequests/addFriends")
            })

    }

    function handleFriendsRequests(){
        axiosHttp.get(baseUrl+"/api/getmyfriendrequest")
            .then(res=>{
                setFriendsRequest(res.data)
            })
            .then(data=>{
                navigation.push("/FriendsRequests/friendsRequests")
            })
    }

    function handRoomCreation(id: number){
        axiosHttp.get(baseUrl+"/api/private/conversation/getspecificconv/"+id)
            .then(res=>{
                if (res.data.length ===0){
                    axiosHttp.post(baseUrl+"/api/private/conversation/create/"+id)
                        .then(res=> {
                        })
                }else {
                    setPrivateConversation(res.data[0])
                    setModalVisible(false)
                    navigation.push("/messageTemplate/privateConverstation")
                }
            })
    }

    useEffect(() => {
        axiosHttp.get(baseUrl+"/api/private/conversation/getmyconvs")
            .then(res => {
                if (res.status === 401){
                    navigation.push("/registration")

                }
                setPrivateConversations(res.data)
            })
            .catch(err=>{console.log(err)})
    }, []);


    return (
        //Main page
        <View>

            <View>
                <View>
                    <View style={styles.logoContainer}>
                        <TouchableHighlight
                            onPress={
                            () =>{
                                handleFriendShow()
                            }
                        }>
                            <Image
                                style={styles.homeLogo}
                                source={require("../../assets/images/profile.png")}/>
                        </TouchableHighlight>
                        <Text>Amis</Text>
                    </View>
                </View>
                <View>
                    <Text>Vos conversations</Text>

                </View>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                        <View style={styles.topBtnContainer}>
                            <View>
                                <Button title={"Mes demandes d'amis"} onPress={()=>{
                                    setModalVisible(false);
                                    handleFriendsRequests()
                                }} />
                            </View>
                            <View>
                                <Button title={"Ajouter des amis"} onPress={()=>{
                                    setModalVisible(false);
                                    handleFriendsAdd()
                                }} />
                            </View>
                        </View>
                        <Text>Vos Demandes D'amis : </Text>
                        <View style={styles.friendsDisplayer}>
                            <FlatList
                                data={friends}
                                renderItem={({ item }) => (
                                    <View>
                                        <Text>Username : {item.username}</Text>
                                        <Button title={"Envoyer un message"} onPress={()=>{
                                            handRoomCreation(item.id)
                                        }}/>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}