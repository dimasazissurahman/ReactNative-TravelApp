import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView, AsyncStorage, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import Menu, { SpaceHeader } from '../Components/Menu';
import HeaderComponent from '../Components/Header';
import { stylesHomeTourGuide } from './HomeTourGuide';
import photoProfile from '../../assets/IMG_0223.png';
import { stylesForm } from '../Components/AllComponents';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import { getData, deleteData, saveData } from '../Components/DeviceStorage';
import Axios from "axios";


function ProfileTourist(props) {
    // const [flagStatus, setFlagStatus] = useState(true);
    const [fnameValue, setFNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [descValue, setDescValue] = useState("");
    const [disableForm, setDisableForm] = useState(false);
    const [photoProfile, setPhotoProfile] = useState();
    const [saveFlag, setSaveFlag] = useState(false);
    const [role, setRole] = useState();
    const [userId, setUserId] = useState();


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
    const Fetch = async () => {
        const data = await getData();
        console.log(data);

        // setUserData(data);
        if (data) {
            let img_profile = `http://192.168.1.2:5000/${data.img_profile}`;
            setFNameValue(data.name);
            setEmailValue(data.email);
            setPhoneValue(data.phone_number);
            setDescValue(data.description);
            setPhotoProfile(img_profile);
            setUserId(data.id);
            setRole(data.role);
        }
    }
    useEffect(() => {
        setSaveFlag(false);
        Fetch();
    }, []);

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

    const updateProfile = async () => {
        let formData = new FormData();
        let localUri = photoProfile;
        console.log(localUri);

        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;


        formData.append("id", userId);
        formData.append("name", fnameValue);
        formData.append("email", emailValue);
        formData.append("phone_number", phoneValue);
        formData.append("role", role);

        formData.append('img_profile', { uri: localUri, name: filename, type });


        try {
            let data = await Axios.post("http://192.168.1.2:5000/profile", formData);
            console.log(data);


            if (data.status === 200) {
                await deleteData();
                console.log(data.data[0]);
                saveData(data.data[0]);
                Fetch();
                setSaveFlag(true);
                ToastAndroid.show('Success Update', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("error");

            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ flexDirection: "row", width: '100%' }}>
                <View style={{ width: '40%' }} onTouchStart={props.navigation.openDrawer}>
                    <Image style={{ position: 'absolute', height: 75, width: 75, marginBottom: -50, zIndex: 10, top: 30, left: 10 }} source={require('../../assets/BurgerBarAndroid.png')} />
                </View>
            </View>
            <HeaderComponent title={"Profile"} />
            <View style={stylesHomeTourGuide.container}>
                <ScrollView style={{ width: "100%" }}>
                    <SpaceHeader />
                    <View style={stylesHomeTourGuide.boxPhoto}>
                        <Image
                            style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
                            resizeMode={"cover"}
                            source={{ uri: photoProfile }}
                        />
                    </View>
                    <TouchableOpacity onPress={() => pickImage()}>
                        <View style={[stylesForm.buttonLogin, { alignSelf: "center" }]}>
                            <Text style={{ color: "#fff" }}>Change Photo</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: "100%", alignItems: "center", marginTop: 20, alignSelf: "center" }}>
                        <TextInput
                            style={[stylesForm.textField, { backgroundColor: "#C9E2EA", borderWidth: 0.5 }]}
                            onChangeText={text => setFNameValue(text)}
                            placeholder={"Full Name"}
                            placeholderTextColor={"#999999"}
                            value={fnameValue}
                        />
                        <TextInput
                            style={[stylesForm.textField, { backgroundColor: "#C9E2EA", borderWidth: 0.5 }]}
                            onChangeText={text => handlerEmail(text)}
                            placeholder={"Email"}
                            placeholderTextColor={"#999999"}
                            value={emailValue}
                        />
                        <TextInput
                            style={[stylesForm.textField, { backgroundColor: "#C9E2EA", borderWidth: 0.5 }]}
                            onChangeText={text => setPhoneValue(text)}
                            keyboardType={"number-pad"}
                            placeholder={"Phone Number"}
                            placeholderTextColor={"#999999"}
                            value={phoneValue}
                        />
                    </View>
                    <TouchableOpacity onPress={() => updateProfile()}>
                        <View style={[stylesForm.buttonLogin, { alignSelf: "center", marginBottom: 10 }]}>
                            <Text style={{ color: "#fff" }}>Save</Text>
                        </View>
                    </TouchableOpacity>
                    {saveFlag === true &&
                        <View style={{ width: "80%", alignSelf: "center", paddingVertical: 10, backgroundColor: "#C9E2EA" }}>
                            <Text style={{ alignSelf: "center", color: "#00607C" }}>Edit Profile Success</Text>
                        </View>
                    }
                    <SpaceHeader />
                </ScrollView>
            </View>
        </View>
    );
}

export default ProfileTourist;