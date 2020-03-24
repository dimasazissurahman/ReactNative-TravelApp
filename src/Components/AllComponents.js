import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SpaceHeader } from './Menu';
import { useNavigation } from 'react-navigation-hooks';
import Axios from 'axios';

const styles = StyleSheet.create({
    containerRegister: {
        backgroundColor: "#66ADC3",
        height: "100%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: "center",
    },
    containerLogin: {
        backgroundColor: "#66ADC3",
        marginTop: "30%",
        height: "65%",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: "center",
    },
    textField: {
        height: 40,
        width: '80%',
        backgroundColor: "#C9E2EA",
        borderRadius: 10,
        paddingLeft: 30,
        marginBottom: 20
    },
    buttonLogin: {
        marginTop: 10,
        height: 50,
        width: 100,
        borderRadius: 10,
        backgroundColor: "#00607C",
        justifyContent: "center",
        alignItems: "center"
    }

})

export const LoginForm = () => {
    const [emailValue, setEmailValue] = useState("");
    const [emailFlag, setEmailFlag] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [repasswordValue, setRepasswordValue] = useState("");
    const [repasswordFlag, setRepasswordFlag] = useState(false);
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [phoneNumberFlag, setphoneNumberFlag] = useState(false);
    const [isPageLogin, setIsPageLogin] = useState(true);

    const { navigate } = useNavigation();

    const handlerEmail = (text) => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailReg.test(text) === false) {
            console.log("Text should be email type!");
            setEmailValue(text);
            setEmailFlag(false);
        } else {
            setEmailValue(text);
            setEmailFlag(true);
            console.log("Text already email type");
        }
    }
    const handlerPassword = (text) => {
        if (text === "") {
            console.log("Please fill Your Password");
            setPasswordFlag(false);
            setPasswordValue(text);

        } else {
            setPasswordValue(text);
            setPasswordFlag(true);
        }
    }
    const handleRepassword = (text) => {
        if (text !== passwordValue) {
            console.log("Password doesn't match");
            setRepasswordValue(text);
            setRepasswordFlag(false);
        } else {
            console.log("Password Match Bro");
            setRepasswordFlag(true);
            setRepasswordValue(text);
        }
    }
    const handlePhoneNumber = (text) => {
        let num = text.replace(".",'');
        if (isNaN(num)) {
            setphoneNumberFlag(false);
        }
        else if (text === "") {
            setPhoneNumberValue(text);
            setphoneNumberFlag(false);
        } else if(text.length > 8){
            setphoneNumberFlag(true);
            setPhoneNumberValue(text);
        }else {
            setPhoneNumberValue(text);
            setphoneNumberFlag(false);
        }
    }
    // const PostAxios = async () => {
    //     try {
    //         const data = await Axios.post("localhost:5000/loginuser", )
            
    //     } catch (error) {
            
    //     }
    // }

    const handlerSubmit = () => {
        if (isPageLogin === true) {
            if (emailFlag === true && passwordFlag === true) {
                console.log("masuk sini");
                navigate('Home');
            } else {
                console.log("Please fill all field");
            }
        }
        else {
            if (emailFlag === true && passwordFlag === true && repasswordFlag === true && phoneNumberFlag === true) {
                console.log("masuk sini");
                navigate('Home');
            } else {
                console.log("Please fill all field");
            }
        }
    }


    return (
        <View style={isPageLogin === true ? styles.containerLogin : styles.containerRegister}>
            {isPageLogin === true ? <Text style={{ fontSize: 25, color: "#FFFFFF", marginTop: 20 }}>Login</Text> : <Text style={{ fontSize: 25, color: "#FFFFFF", marginTop: 20 }}>Register</Text>}
            <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
                <TextInput
                    style={styles.textField}
                    onChangeText={text => handlerEmail(text)}
                    placeholder={"Email"}
                    placeholderTextColor={"#FFFFFF"}
                    value={emailValue}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textField}
                    onChangeText={text => handlerPassword(text)}
                    placeholder={"Password"}
                    placeholderTextColor={"#FFFFFF"}
                    value={passwordValue}
                />
                {isPageLogin === true ? <View></View>
                    :
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.textField}
                            placeholder={"Re-Password"}
                            placeholderTextColor={"#FFFFFF"}
                            onChangeText={text => handleRepassword(text)}
                            value={repasswordValue}
                        />
                        <TextInput
                            keyboardType={"number-pad"}
                            style={styles.textField}
                            placeholder={"Phone Number"}
                            placeholderTextColor={"#FFFFFF"}
                            onChangeText={text => handlePhoneNumber(text)}
                            value={phoneNumberValue}
                        />
                    </View>
                }

                {isPageLogin === true ?
                    <View onTouchStart={() => handlerSubmit()} style={styles.buttonLogin}>
                        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Sign In</Text>
                    </View>
                    :
                    <View onTouchStart={() => handlerSubmit()} style={styles.buttonLogin}>
                        <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Sign Up</Text>
                    </View>
                }
                {isPageLogin === true ?
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ color: "#FFFFFF" }}>Don't have Account ?</Text>
                        <View onTouchStart={() => setIsPageLogin(false)}>
                            <Text style={{ color: "#00607C" }}> Sign Up</Text>
                        </View>
                    </View>
                    :
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ color: "#FFFFFF" }}>Already have Account ?</Text>
                        <View onTouchStart={() => setIsPageLogin(true)}>
                            <Text style={{ color: "#00607C" }}> Sign In</Text>
                        </View>
                    </View>
                }
            </View>
        </View>
    );
}