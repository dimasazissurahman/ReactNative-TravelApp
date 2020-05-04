import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
// import { SpaceHeader } from '../Containers/Order';
import styled from 'styled-components';
import deviceStorage, { deleteToken } from './DeviceStorage';
import { AppContext } from './Provider';
import { stylesForm } from './AllComponents';


export const SpaceHeader = styled.View`
    height:20px
`;
export const Margin10 = styled.View`margin:10px`;
export const FontSize = styled.Text`
    font-size:20px;
    color: #fff;
`;

export default function Menu({ onTouchStart }) {
    const { navigate } = useNavigation();
    const { tokenKey, setTokenKey } = useContext(AppContext);

    const handleLogout = async () => {
        await deleteToken();
        navigate('Login');
    }

    return (
        <View onTouchStart={onTouchStart} style={{ position: "absolute", zIndex: 10, top: 0, width: '75%', height: '100%', backgroundColor: '#00607C' }}>
            <SpaceHeader />
            <View style={{ borderBottomWidth: 1 }}>
                <View style={[styles.cardUser, { borderBottomWidth: 0 }]}>
                    <View>
                        <View style={styles.circle} />
                    </View>
                    <View style={{ width: '60%', justifyContent: "center", marginLeft: 10 }}>
                        <FontSize>Andy Warhol Sukma</FontSize>
                    </View>
                </View>
                <View onTouchStart={() => navigate('Profile')} style={[stylesForm.buttonLogin, { height: 40, width: 125, alignSelf: "flex-end", marginTop: -30, marginBottom: 10, marginRight: 30, backgroundColor: "#66ADC3" }]}>
                    <Text style={{ color: "#fff" }}>Profile</Text>
                </View>
            </View>
            <Margin10 onTouchStart={() => navigate('Home')}>
                <FontSize>Home</FontSize>
            </Margin10>
            <Margin10 onTouchStart={() => navigate('Order')}>
                <FontSize>History</FontSize>
            </Margin10>
            <Margin10 onTouchStart={() => navigate('Order')}>
                <FontSize>Settings</FontSize>
            </Margin10>
            <View style={{marginTop:"90%"}}>
                <Margin10 onTouchStart={() => handleLogout()}>
                    <FontSize>Log out</FontSize>
                </Margin10>
            </View>
        </View>

    );
}

export const styles = StyleSheet.create({
    cardUser: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
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