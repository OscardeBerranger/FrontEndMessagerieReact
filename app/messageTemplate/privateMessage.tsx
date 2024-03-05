import {StyleSheet, TextInput} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

let privateConversation = []



export default function TabTwoScreen() {
    const styles = ({
        container: {
            flex: 1,
        },
        messagesContainer: {
            flex: 1
        },
        sendMessageBar: {
        },
        sendMessageBarContainer: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            padding: 7,
            marginBottom: "3%",
            width: "96%",
            left: '2%'
        },
    })
    return (
        <View style={styles.container}>

        </View>
    );

}