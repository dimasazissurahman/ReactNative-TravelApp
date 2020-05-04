import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import styled from 'styled-components';
import Menu, { SpaceHeader, styles, FontSize } from '../Components/Menu';
import { LoginForm, stylesForm } from '../Components/AllComponents';
import HeaderComponent from '../Components/Header';



export default function Order(props) {
    const [flagClick, setFlagClick] = useState(true);
    let phoneNumber = "082929292920";

    const handleCall = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    }
    const handleSMS = () => {
        Linking.openURL(`sms:${phoneNumber}?body=Hi Mas/Mba, 
Saya Wisatawan dari TravelApp ingin menggunakan jasa Mas/Mba sebagai pemandu wisata
Terima Kasih`);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* {flagClick ?
                <View style={{ flexDirection: "row", width: '100%' }}>
                    <View style={{ width: '40%' }} onTouchStart={() => setFlagClick(false)}>
                        <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                    </View>
                </View>
                :
                <Menu onTouchStart={() => setFlagClick(true)} />
            } */}
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
            </View>
            <HeaderComponent title={"History"} />
            <View style={styles.cardUser}>
                <View>
                    <View style={styles.circle}></View>
                </View>
                <View style={{ flexDirection: "column", width: "100%", justifyContent: "center" }}>
                    <View style={{ width: '60%', justifyContent: "center", marginLeft: 10 }}>
                        <Text style={{ fontSize: 20 }}>Andy Warhol</Text>
                        <Text style={{ fontSize: 15 }}>Jakarta</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginLeft: 10}}>
                        <View onTouchStart={() => handleCall()} style={[stylesForm.buttonLogin, { height:35,marginRight: 20, backgroundColor: "#66ADC3" }]}>
                            <Text style={{ color: "#fff" }}>Call</Text>
                        </View>
                        <View onTouchStart={() => handleSMS()} style={[stylesForm.buttonLogin, { height:35,backgroundColor: "#66ADC3" }]}>
                            <Text style={{ color: "#fff" }}>SMS</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

