import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, BackHandler, ToastAndroid, AsyncStorage } from 'react-native';
import Maps from '../Components/Maps';
import Menu, { styles, FontSize } from '../Components/Menu';
import { useNavigation } from 'react-navigation-hooks';
import { AppContext } from '../Components/Provider';
import HeaderComponent from '../Components/Header';
import photoProfile from '../../assets/IMG_0223.png';



function Home(props) {
    const [flagClick, setFlagClick] = useState(true);
    const [getLoc, setGetLoc] = useState(true);
    const [onClickDetail, setOnClickDetail] = useState(true);
    const { tokenKey, setTokenKey } = useContext(AppContext);

    const { navigate } = useNavigation();

    if (getLoc === false) {
        setGetLoc(true);
    }

    if (onClickDetail === false) {
        console.log(tokenKey);
        console.log("Masuk token");
    }
    console.log(tokenKey);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        console.log("jalan");
        return () => {
            backHandler.remove();
        }
    }, []);

    const handleBackPress = () => {
        // console.log("jalan handle");
        ToastAndroid.show('If you want to go back, click menu', ToastAndroid.SHORT);
        return true;
    }

    const Fetch = async () => {
        try {
            const data = await AsyncStorage.getItem("id_token");
            setTokenKey(data);
            console.log("token =", data);

        } catch (error) {

        }
    }

    

    useEffect(() => {
        Fetch();
    })
    console.log(onClickDetail);



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
            <Maps getLoc={getLoc} onPress={() => setOnClickDetail(false)} />
            {onClickDetail === false ?
                <View onTouchStart={() => setOnClickDetail(true)} style={{ backgroundColor: "#00607C", width: "100%", height: "35%", borderTopStartRadius: 10, borderTopEndRadius: 10, zIndex: 10, }}>
                    <View style={{ flexDirection: "row", justifyContent:"center",margin: 10, borderBottomWidth: 2, paddingBottom: 10 }}>
                        <View style={{
                            alignSelf: "center",
                            height: 100,
                            width: 100,
                            borderRadius: 100 / 2,
                            elevation: 10,
                        }}>
                            <Image
                                style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
                                resizeMode={"cover"}
                                source={photoProfile}
                            />
                        </View>
                        <View style={{ width: '60%', justifyContent: "center", marginLeft: 20 }}>
                            <FontSize>Supriyono</FontSize>
                            <Text style={{ marginTop: 15, color: "#fff", fontSize: 14 }}>Jakarta</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", margin: 10, width: '100%' }}>
                        <View
                            style={{ justifyContent: "center", marginLeft: '10%', width: 120, height: 45, backgroundColor: "#FFFFFF", borderRadius: 10 }}
                            onTouchStart={() => navigate('Order')}
                        >
                            <Text style={{ color: "#00607C", fontSize: 25, alignSelf: "center" }}>Select</Text>
                        </View>
                        <View style={{ justifyContent: "center", marginLeft: '10%', width: 120, height: 45, backgroundColor: "#00607C", borderWidth: 2, borderColor: "#FFFFFF", borderRadius: 10 }}>
                            <Text style={{ color: "#FFFFFF", fontSize: 25, alignSelf: "center" }}>Detail</Text>
                        </View>
                    </View>
                </View>
                : <View></View>}
        </SafeAreaView>
    );
}

export default Home;