import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styled from 'styled-components';
import Menu, { SpaceHeader } from '../Components/Menu';


export default function Order() {
    const [flagClick, setFlagClick] = useState(true);
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <SpaceHeader />
            {flagClick ?
                <View onTouchStart={() => setFlagClick(false)}>
                    <Image style={{ position:'absolute',height: 75, width: 75, marginBottom:-50, zIndex:10, top:10, left:10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
                :
                <Menu onTouchStart={() => setFlagClick(true)} />
            }
            <Text style={{alignSelf:"center", color: "black" }}>Order Transaction</Text>
        </View>
    );
}

