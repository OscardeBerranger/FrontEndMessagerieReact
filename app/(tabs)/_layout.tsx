import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import {Pressable, Image, StyleSheet} from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import {currentUserEmail, getCurrentUserEmail} from "@/app/common/globalVariables";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
    homeLogo: {
        width: 25,
        height: 25,
        opacity: 0.9
    },
    message: {
        width: 30,
        height: 30,
        opacity: 0.9
    },
    profile: {
        width: 30,
        height: 30
    }
});


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>

        <Tabs.Screen
            name="index"
            options={{
                title: 'message',
                tabBarIcon: ({ color }) =>
                    <Image
                        style={styles.homeLogo}
                        source={require('../../assets/images/message.png')} />
                    // <TabBarIcon name="code" color={color} />
                ,
                headerRight: () => (
                    <Link href="/modal" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="info-circle"
                                    size={25}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
        <Tabs.Screen
            name="registration"
            options={{
                title: 'profile',
                tabBarIcon: ({ color }) =>
                    <Image
                        style={styles.profile}
                        source={require('../../assets/images/profile.png')}
                    />
                ,
                headerRight: () => (
                    <Link href="/modal" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="info-circle"
                                    size={25}
                                    color={Colors[colorScheme ?? 'light'].text}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }}
        />
    </Tabs>
  );
}
