import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, BackHandler, ToastAndroid, AsyncStorage } from 'react-native';
import Maps from '../Components/Maps';
import Menu, { styles, FontSize } from '../Components/Menu';
import { useNavigation } from 'react-navigation-hooks';
import { AppContext } from '../Components/Provider';
import HeaderComponent from '../Components/Header';
import photoProfile from '../../assets/IMG_0223.png';
import { getData } from '../Components/DeviceStorage';



function Home(props) {
    const [getLoc, setGetLoc] = useState(true);
    const [flag, setFlag] = useState(true);

    if (getLoc === false) {
        setGetLoc(true);
    }

    useEffect(() => {
        setFlag(false);
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            backHandler.remove();
        }
    }, []);

    const handleBackPress = () => {
        ToastAndroid.show('If you want to go back, click menu', ToastAndroid.SHORT);
        return true;
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
                <View style={{ width: '40%' }} onTouchStart={() => setGetLoc(false)} >
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/locationLogo.png')} />
                </View>
            </View>
            <Maps flag={getLoc}/>
        </SafeAreaView>
    );
}

export default Home;