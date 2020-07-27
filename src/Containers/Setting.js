import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import HeaderComponent from '../Components/Header';
import { deleteData, deleteToken } from '../Components/DeviceStorage';
import { useNavigation } from 'react-navigation-hooks';

export default function Setting(props) {
    const { navigate } = useNavigation();

    const handleLogout = async () => {
        await deleteToken();
        await deleteData();
        navigate('Auth');
    }

    const handleFeedback = () => {
        Linking.openURL(`mailto: admin@travelapp.co.id?body=Hi Admin,`);
    }
    const handleCallCenter = () => {
        Linking.openURL(`tel:0215544262`)
    }

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
                    <TouchableOpacity onPress={() => handleFeedback()}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.fontTitle}>Feedback</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCallCenter()}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.fontTitle}>Call Center</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLogout()}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.fontTitle}>Logout</Text>
                        </View>
                    </TouchableOpacity>
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
        justifyContent: "center",
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "black",
        marginBottom: 10
    },
    fontTitle: {
        fontSize: 22,
        marginLeft: 10
    }
})
