import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import Menu, { SpaceHeader } from '../Components/Menu';
import HeaderComponent from '../Components/Header';
import { stylesHomeTourGuide } from './HomeTourGuide';
import photoProfile from '../../assets/IMG_0223.png';
import { stylesForm } from '../Components/AllComponents';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";


function ProfileTourist(props) {
    const [flagClick, setFlagClick] = useState(true);
    const [fnameValue, setFNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [disableForm, setDisableForm] = useState(false);
    const [photoProfile, setPhotoProfile] = useState();

    const handlerEmail = text => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailReg.test(text) === false) {
            setEmailValue(text);
            // setEmailFlag(false);
        } else {
            setEmailValue(text);
            // setEmailFlag(true);
        }
    };
    const getPermissionAccess = async () => {
        let status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    const pickImage = async () => {
        getPermissionAccess();

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setPhotoProfile(result.uri);
            }
            const response = await fetch(result.uri);
            const blob = await response.blob();

            // console.log(blob.slice(1,5,"Application/Image"));

            console.log(result.uri);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor:"#FFFFFF" }}>
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
            </View>
            <HeaderComponent title={"Profile"} />
            <View style={stylesHomeTourGuide.container}>
                <ScrollView style={{ width: "100%" }}>
                    <SpaceHeader />
                    <View onTouchStart={() => pickImage()} style={stylesHomeTourGuide.boxPhoto}>
                        <Image
                            style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
                            resizeMode={"cover"}
                            source={{ uri: photoProfile }}
                        />
                    </View>
                    <View onTouchStart={() => setDisableForm(true)} style={[stylesForm.buttonLogin, { alignSelf: "center" }]}>
                        <Text style={{ color: "#fff" }}>Edit Profile</Text>
                    </View>
                    <View style={{ width: "100%", alignItems: "center", marginTop: 20, alignSelf: "center" }}>
                        <TextInput
                            style={[stylesForm.textField, { backgroundColor: "#C9E2EA", borderWidth: 0.5 }]}
                            onChangeText={text => setFNameValue(text)}
                            placeholder={"Full Name"}
                            placeholderTextColor={disableForm ? "#00607C" : "#999999"}
                            value={fnameValue}
                            editable={disableForm}
                        />
                        <TextInput
                            style={[stylesForm.textField, { backgroundColor: "#C9E2EA", borderWidth: 0.5 }]}
                            onChangeText={text => handlerEmail(text)}
                            placeholder={"Email"}
                            placeholderTextColor={disableForm ? "#00607C" : "#999999"}
                            value={emailValue}
                            editable={disableForm}
                        />
                        <TextInput
                            style={[stylesForm.textField, { backgroundColor: "#C9E2EA", borderWidth: 0.5 }]}
                            onChangeText={text => setPhoneValue(text)}
                            keyboardType={"number-pad"}
                            placeholder={"Phone Number"}
                            placeholderTextColor={disableForm ? "#00607C" : "#999999"}
                            value={phoneValue}
                            editable={disableForm}
                        />
                    </View>
                    <View style={[stylesForm.buttonLogin, { alignSelf: "center", marginBottom: 10 }]}>
                        <Text style={{ color: "#fff" }}>Save</Text>
                    </View>
                    <SpaceHeader />
                </ScrollView>
            </View>
        </View>
    );
}

export default ProfileTourist;