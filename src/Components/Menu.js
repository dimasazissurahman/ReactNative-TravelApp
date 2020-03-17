import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { SpaceHeader } from '../Order';
import styled from 'styled-components';

export const Margin10 = styled.View`margin:10px`;
export const FontSize = styled.Text`font-size:20px`;

export default function Menu({ onTouchStart }) {
    const { navigate } = useNavigation();
    
    return (
        <View onTouchStart={onTouchStart} style={{ position: "absolute", zIndex: 10, top: 0, width: '75%', height: '100%', backgroundColor: '#00607C' }}>
            <SpaceHeader />
            <View style={styles.cardUser}>
                <View>
                    <View style={styles.circle}/>
                </View>
                <View style={{width:'60%',justifyContent:"center",marginLeft:10}}>
                    <FontSize>Andy Warhol Sukma</FontSize>
                </View>
            </View>
            <Margin10 onTouchStart={() => navigate('Home')}>
                <FontSize>Home</FontSize>
            </Margin10>
            <Margin10 onTouchStart={() => navigate('Order')}>
                <FontSize>Order</FontSize>
            </Margin10>
        </View>
    );
}
const styles = StyleSheet.create({
    cardUser: {
        flexDirection: "row",
        margin:10,
        paddingBottom:10,
        borderBottomWidth:1
    },
    circle: {
        marginVertical:10,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#fff'
    }
})