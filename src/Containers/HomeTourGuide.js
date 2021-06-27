import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, BackHandler, ToastAndroid, TouchableOpacity } from 'react-native';
import Menu from '../Components/Menu';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import HeaderComponent from '../Components/Header';
import photoProfile from '../../assets/IMG_0223.png';
import { getData } from '../Components/DeviceStorage';
import Axios from 'axios';
import { stylesForm } from '../Components/AllComponents';
import { AppContext } from '../Components/Provider';

export default function HomeTourGuide(props) {
    const [flagActive, setFlagActive] = useState(false);
    const [textLatitude, setTextLatitude] = useState(0);
    const [textLongitude, setTextLongitude] = useState(0);
    const [data, setData] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [descValue, setDescValue] = useState("");
    const [photoProfile, setPhotoProfile] = useState();
    const { isLoading, setIsLoading } = useContext(AppContext);

    const getLocationAsync = async () => {
        let status = await Permissions.askAsync(Permissions.LOCATION);

        if (status.status !== "granted") {
            console.log("Permission to access location was denied");

        } else {
            console.log("Permission Granted");

            let currlocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            setTextLatitude(currlocation.coords.latitude);
            setTextLongitude(currlocation.coords.longitude);
            setFlagActive(true);
        }
    };
    const getUserData = async () => {
        const data = await getData();

        let img_profile = `http://192.168.0.5:5000/${data.img_profile}`;
        setData(data);
        setName(data.name);
        setEmail(data.email);
        setDescValue(data.description);
        setPhotoProfile(img_profile);
        setIsLoading(true);
    }


    useEffect(() => {
        getLocationAsync();
        if (data) {
            (async () => {
                try {
                    const data = await Axios.post("http://192.168.0.5:5000/location", {
                        long: "106.6465428",
                        lat: "-6.1760408",
                        email: email
                    });
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [textLongitude, textLongitude]);

    useEffect(() => {
        getUserData();

        console.log("HOME TOUR GUIDE");
        
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove();
        }
    }, [isLoading]);
    

    const handleBackPress = () => {
        ToastAndroid.show('If you want to go back, click menu', ToastAndroid.SHORT);
        return true;
    }

    const handleFlagActive = () => {
        if (flagActive === true) {
            setFlagActive(false);
        } else {
            setFlagActive(true);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#00607C" }}>
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
            </View>
            <HeaderComponent title={"TravelApp"} />
            <View style={stylesHomeTourGuide.container}>
                <View style={stylesHomeTourGuide.col_1}>
                    <View style={stylesHomeTourGuide.boxPhoto}>
                        <Image
                            style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
                            resizeMode={"cover"}
                            source={{ uri: photoProfile }}
                        />
                    </View>
                    <Text style={stylesHomeTourGuide.nameText}>{name}</Text>
                </View>
                <View style={stylesHomeTourGuide.col_2}>
                    <View style={stylesHomeTourGuide.boxDesc}>
                        <Text style={{ marginBottom: 20, paddingTop: 20 }}>Description</Text>
                        <View style={{ justifyContent: "flex-start", width: "90%", paddingBottom: 20 }}>
                            <Text>{descValue}</Text>
                        </View>
                    </View>
                    <View style={stylesHomeTourGuide.boxStatus}>
                        {/* <Text style={stylesHomeTourGuide.nameText}>Status: {flagActive === false ? "Non-Active" : "Active"} </Text> */}
                        <TouchableOpacity onPress={() => handleFlagActive()}>
                            <View style={[stylesForm.buttonLogin, { marginTop: -10, alignSelf: "center", marginBottom: 10 }]}>
                                {flagActive === true ?
                                    <Text style={{ color: "#fff" }}>GPS ON</Text>
                                    :
                                    <Text style={{ color: "#fff" }}>GPS OFF</Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
export const stylesHomeTourGuide = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        borderWidth: 1,
        width: "95%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: -10,
    },
    col_1: {
        flex: 1,
        width: "100%",
        margin: 20
    },
    boxPhoto: {
        alignSelf: "center",
        height: 150,
        width: 150,
        borderRadius: 150 / 2,
        elevation: 10
    },
    nameText: {
        fontSize: 20,
        alignSelf: "center",
        color: "#000000"
    },
    col_2: {
        flex: 2,
        width: "100%",
        alignItems: "center"
    },
    boxDesc: {
        marginTop: 10,
        width: "95%",
        backgroundColor: "#FFF",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
    },
    boxStatus: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "30%",
    }
});