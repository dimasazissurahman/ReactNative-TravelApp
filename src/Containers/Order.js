import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Menu, { SpaceHeader, styles, FontSize } from '../Components/Menu';
import { LoginForm, stylesForm } from '../Components/AllComponents';
import HeaderComponent from '../Components/Header';
import Axios from "axios";
import { getData } from '../Components/DeviceStorage';

export default function Order(props) {
    const [touristId, setTouristId] = useState();
    const [dataTourGuide, setDataTourGuide] = useState();

    const handleCall = (data) => {
        console.log(data);
        Linking.openURL(`tel:${data}`);
    }
    const handleSMS = (data) => {
        console.log(data);
        Linking.openURL(`sms:${data.phone_number}?body=Hi Mas/Mba ${data.name}, 
            Saya Wisatawan dari TravelApp ingin menggunakan jasa Mas/Mba ${data.name} sebagai pemandu wisata di wilayah ${data.region}
            Terima Kasih`);
    }

    const getDataTourist = async () => {
        const data = await getData();
        setTouristId(data.id);
    }

    const getDataHistory = async () => {
        getDataTourist();
        if (touristId) {
            try {
                let data = await Axios.post("http://192.168.1.2:5000/history", {
                    touristId: touristId
                });
                // console.log(data);
                setDataTourGuide(data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getDataHistory();
    }, [touristId]);

    console.log(dataTourGuide);

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
            </View>
            <HeaderComponent title={"History"} />
            <ScrollView style={{ width: "100%" }}>
                {dataTourGuide ? dataTourGuide.map((data, index) => {
                    let img_profile = `http://192.168.1.2:5000/${data.img_profile}`;
                    return (
                        <View style={styles.cardUser} key={index}>
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
                                    source={{ uri: img_profile }}
                                />
                            </View>
                            <View style={{ flexDirection: "column", width: "100%", justifyContent: "center" }}>
                                <View style={{ width: '60%', justifyContent: "center", marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20 }}>{data.name}</Text>
                                    <Text style={{ fontSize: 15 }}>{data.region}</Text>
                                </View>
                                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => handleCall(data.phone_number)}>
                                        <View style={[stylesForm.buttonLogin, { height: 35, marginRight: 20, backgroundColor: "#66ADC3" }]}>
                                            <Text style={{ color: "#fff" }}>Call</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleSMS(data)}>
                                        <View style={[stylesForm.buttonLogin, { height: 35, backgroundColor: "#66ADC3" }]}>
                                            <Text style={{ color: "#fff" }}>SMS</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                })
                    : <View></View>
                }
            </ScrollView>
        </View>
    );
}

