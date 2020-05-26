import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HeaderComponent from '../Components/Header';

export default function Setting(props) {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
            </View>
            <HeaderComponent title={"Settings"} />
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View onTouchStart={() => {}} style={styles.buttonContainer}>
                        <Text style={styles.fontTitle}>Location</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.fontTitle}>Feedback</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.fontTitle}>Call Center</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    subContainer: {
        margin: 10,
        width: "95%",
        // backgroundColor: "black"
    },
    buttonContainer: {
        justifyContent:"center",
        height:50,
        width:"100%",
        borderBottomWidth:1,
        borderColor:"black",
        marginBottom:10
    },
    fontTitle: {
        fontSize: 22,
        marginLeft:10
    }
})
