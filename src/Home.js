import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import Maps from './Components/Maps';
import { SpaceHeader } from './Order';
import Menu from './Components/Menu';



function Home() {
    const [flagClick, setFlagClick] = useState(true);
    const [getLoc, setGetLoc] = useState(true);
    if(getLoc === false){
        setGetLoc(true);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {flagClick ?
                <View style={{ flexDirection: "row", width:'100%' }}>
                    <View style={{width:'40%'}} onTouchStart={() => setFlagClick(false)}>
                        <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../assets/BurgerBarAndroid.png')} />
                    </View>
                    <View style={{width:'40%'}} onTouchStart={()=> setGetLoc(false)} >
                        <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../assets/locationLogo.png')} />
                    </View>
                </View>
                :
                <Menu onTouchStart={() => setFlagClick(true)} />
            }

            <Maps getLoc={getLoc}/>
        </SafeAreaView>
    );
}

export default Home;