import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Menu from '../Components/Menu';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

function HomeTourGuide() {
    const [flagClick, setFlagClick] = useState(true);
    const [textLatitude, setTextLatitude] = useState(0);
    const [textLongitude, setTextLongitude] = useState(0);

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
        }
    };

    useEffect(() => {
        getLocationAsync();
        console.log("masuk nih getLocation");
    }, [textLongitude, textLongitude]);

    //ini longitut latitut tourguide
    console.log(textLatitude);
    console.log(textLongitude);


    return (
        <View style={{ flex: 1 }}>
            {flagClick ?
                <View style={{ flexDirection: "row", width: '100%' }}>
                    <View style={{ width: '40%' }} onTouchStart={() => setFlagClick(false)}>
                        <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                    </View>
                </View>
                :
                <Menu onTouchStart={() => setFlagClick(true)} />
            }
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>This is for tour guide</Text>
            </View>
        </View>
    );
}

export default HomeTourGuide;