import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { deleteToken, deleteEmail, deleteData, getData } from './DeviceStorage';
import { useNavigation } from 'react-navigation-hooks';
import { stylesForm } from './AllComponents';


export const SideBar = props => {
    const { navigate } = useNavigation();
    const [name, setName] = useState();
    const [img_profile, setImg_profile] = useState();
    const handleLogout = async () => {
        await deleteToken();
        await deleteData();
        navigate('Auth');
    }
    const Fetch = async () => {
        const data = await getData();
        console.log(data.name);
        let img = `http://192.168.1.9:5000/${data.img_profile}`;
        // let img = "https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png";
        setName(data.name);
        setImg_profile(img);

    }
    useEffect(() => {
        Fetch();
    }, []);

    return (
        <ScrollView>
            <View style={{ padding: 16, paddingTop: 40, backgroundColor: "#00607C" }}>
                <View style={{ flexDirection: "row" }}>
                    <Image style={{ height: 100, width: 100, borderRadius: 100 / 2, backgroundColor: "#FFFFFF" }} resizeMode={"cover"} source={{ uri: img_profile }} />
                    <View style={{ alignSelf: "center", width: "60%", margin: 10 }}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>{name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleLogout()}>
                    <View style={[stylesForm.buttonLogin, { height: 40, width: 125, alignSelf: "flex-end", marginHorizontal: 20, backgroundColor: "#66ADC3" }]}>
                        <Text style={{ color: "#fff" }}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={SideBarStyle.container}>
                <DrawerNavigatorItems {...props} />
                {/* <View style={{marginTop:"90%"}}>
                <View onTouchStart={() => handleLogout()}>
                    <Text>Log out</Text>
                </View>
            </View> */}
            </View>
        </ScrollView>
    );
}

const SideBarStyle = StyleSheet.create({
    container: {
        flex: 1
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        elevation: 10
    }
})