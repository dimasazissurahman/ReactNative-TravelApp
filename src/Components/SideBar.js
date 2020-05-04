import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { deleteToken } from './DeviceStorage';
import { useNavigation } from 'react-navigation-hooks';
import { stylesForm } from './AllComponents';


export const SideBar = props => {
    const { navigate } = useNavigation();
    const handleLogout = async () => {        
        await deleteToken();
        navigate('Auth');
    }
    return(
        <ScrollView>
            <View style={{ padding: 16, paddingTop: 40, backgroundColor: "#00607C" }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={SideBarStyle.circle} />
                    <View style={{ alignSelf: "center", width: "60%", margin: 10 }}>
                        <Text style={{ fontSize: 20, color: "#fff" }}>Dimas Surahman</Text>
                    </View>
                </View>
                <View onTouchStart={() => handleLogout()} style={[stylesForm.buttonLogin, { height: 40, width: 125, alignSelf: "flex-end", marginHorizontal: 20, backgroundColor: "#66ADC3" }]}>
                    <Text style={{ color: "#fff" }}>Logout</Text>
                </View>
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
        marginVertical: 10,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#fff',
        elevation: 10
    }
})