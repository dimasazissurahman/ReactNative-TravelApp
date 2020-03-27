import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button } from 'react-native';
import Maps from '../Components/Maps';
import Menu, { styles, FontSize } from '../Components/Menu';
import { useNavigation } from 'react-navigation-hooks';
import { AppContext } from '../Components/Provider';



function Home() {
    const [flagClick, setFlagClick] = useState(true);
    const [getLoc, setGetLoc] = useState(true);
    const [onClickDetail, setOnClickDetail] = useState(true);
    const { tokenKey } = useContext(AppContext);

    const { navigate } = useNavigation();

    if (getLoc === false) {
        setGetLoc(true);
    }

    if (onClickDetail === false) {
        console.log(tokenKey);
        console.log("Masuk token");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {flagClick ?
                <View style={{ flexDirection: "row", width: '100%' }}>
                    <View style={{ width: '40%' }} onTouchStart={() => setFlagClick(false)}>
                        <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                    </View>
                    <View style={{ width: '40%' }} onTouchStart={() => setGetLoc(false)} >
                        <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/locationLogo.png')} />
                    </View>
                </View>
                :
                <Menu onTouchStart={() => setFlagClick(true)} />
            }

            <Maps getLoc={getLoc} onPress={() => setOnClickDetail(false)} />
            {onClickDetail === false ?
                <View onTouchStart={() => setOnClickDetail(true)} style={{ backgroundColor: "#00607C", width: "100%", height: "35%", borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                    <View style={{ flexDirection: "row", margin: 10, borderBottomWidth: 2, paddingBottom: 10 }}>
                        <View>
                            <View style={styles.circle} />
                        </View>
                        <View style={{ width: '60%', justifyContent: "center", marginLeft: 10 }}>
                            <FontSize>{tokenKey}</FontSize>
                            <Text style={{ marginTop: 15, color: "#fff", fontSize: 14 }}>English, Indonesia, China</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", margin: 10, width: '100%' }}>
                        <View
                            style={{ justifyContent: "center", marginLeft: '10%', width: 120, height: 45, backgroundColor: "#FFFFFF", borderRadius: 10 }}
                            onTouchStart={() => navigate('Order')}
                        >
                            <Text style={{ color: "#00607C", fontSize: 25, alignSelf: "center" }}>Order</Text>
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