import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Image, ScrollView, AsyncStorage } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";
import { AppContext } from "./Provider";
import { saveItem, saveToken, saveRole, saveEmail, saveData } from '../Components/DeviceStorage';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import Constants from 'expo-constants';

export const stylesForm = StyleSheet.create({
  containerRegister: {
    backgroundColor: "#66ADC3",
    height: "80%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: "center"
  },
  containerLogin: {
    backgroundColor: "#66ADC3",
    marginTop: "30%",
    height: "75%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: "center"
  },
  textField: {
    height: 40,
    width: "80%",
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
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C9E2EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#C9E2EA',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  }
});



export const LoginForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [repasswordValue, setRepasswordValue] = useState("");
  const [repasswordFlag, setRepasswordFlag] = useState(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [phoneNumberFlag, setphoneNumberFlag] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [ktpNumber, setKtpNumber] = useState();
  const [region, setRegion] = useState();
  const [language, setLanguage] = useState();
  const [capability, setCapability] = useState();

  const [isPageLogin, setIsPageLogin] = useState(true);
  const [role, setRole] = useState("Tourist");

  const [imageKtp, setImageKtp] = useState();

  const { tokenKey, setTokenKey } = useContext(AppContext);
  const { isLoading, setIsLoading } = useContext(AppContext);



  const { navigate } = useNavigation();

  const handlerEmail = text => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailReg.test(text) === false) {
      setEmailValue(text);
      setEmailFlag(false);
    } else {
      setEmailValue(text);
      setEmailFlag(true);
    }
  };

  const handlerPassword = text => {
    if (text === "") {
      setPasswordFlag(false);
      setPasswordValue(text);
    } else {
      setPasswordValue(text);
      setPasswordFlag(true);
    }
  };
  const handleRepassword = text => {
    if (text !== passwordValue) {
      setRepasswordValue(text);
      setRepasswordFlag(false);
    } else {
      setRepasswordFlag(true);
      setRepasswordValue(text);
    }
  };
  const handlePhoneNumber = text => {
    let num = text.replace(".", "");
    if (isNaN(num)) {
      setphoneNumberFlag(false);
    } else if (text === "") {
      setPhoneNumberValue(text);
      setphoneNumberFlag(false);
    } else if (text.length > 8) {
      setphoneNumberFlag(true);
      setPhoneNumberValue(text);
    } else {
      setPhoneNumberValue(text);
      setphoneNumberFlag(false);
    }
  };

  const pickImage = async () => {
    getPermissionAccess();

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.uri) {
        setImageKtp(result);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlerSubmit = async () => {
    if (isPageLogin === true) {
      if (emailFlag === true && passwordFlag === true) {
        try {
          const data = await axios.post("http://192.168.0.5:5000/loginuser", {
            email: emailValue,
            password: passwordValue,
            role: role
          });
          console.log(data);
          console.log(data.data.data.name);



          if (data.status === 200) {
            console.log("masuk");
            saveToken(data.data.token.iat);
            saveRole(role);
            saveData(data.data.data);

            if (role === "Tourist") {
              navigate('Tourist');
            } else {
              navigate('TourGuide');
            }
          }
        } catch (error) {
          console.log({ error: error.response });
          console.log("Error");
          alert("Wrong Username/Password");
        }
      } else {
        console.log("Please fill all field");
      }
    } else {
      if (
        emailFlag === true &&
        passwordFlag === true &&
        repasswordFlag === true &&
        phoneNumberFlag === true
      ) {
        let formData = new FormData();
        console.log(formData);

        formData.append("name", nameValue);
        formData.append("email", emailValue);
        formData.append("password", passwordValue);
        formData.append("phone_number", phoneNumberValue);
        formData.append("role", role);

        if (role === "Tour Guide") {
          let localUri = imageKtp.uri;
          let filename = localUri.split('/').pop();

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          formData.append('img', { uri: localUri, name: filename, type });
          formData.append("region", region);
          formData.append("ktp_number", ktpNumber);
        }

        try {
          let data = await fetch("http://192.168.0.5:5000/signupuser", {
            method: 'POST',
            body: formData,
            headers: {
              'content-type': 'multipart/form-data',
            },
          });
          console.log("Post Sukses");

          if (data.status) {
            setIsPageLogin(true);
            setPasswordValue("");
          }
        } catch (error) {
          console.log("error");

          console.log(error);
        }
      } else {
        alert("Please fill all field");
        console.log("Please fill all field");
      }
    }
  };

  const getPermissionAccess = async () => {
    let status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }

  const Auth = async () => {
    try {
      const data = await AsyncStorage.getItem("id_token");
      const dataRole = await AsyncStorage.getItem("user_role");
      console.log("token =", data);
      if (data !== null) {
        if (dataRole === "Tourist") {
          navigate('Tourist');
        } else {
          navigate('TourGuide');
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Auth();
  })

  const handlerChangePage = () => {
    if (isPageLogin === true) {
      setEmailValue("");
      setPasswordValue("");
      setRepasswordValue("");
      setNameValue("");
      setPhoneNumberValue("");
      setRegion("");
      setKtpNumber("");
      setImageKtp();
      setLanguage("");
      setCapability("");
      setIsPageLogin(false);
    } else if (isPageLogin === false) {
      setEmailValue("");
      setPasswordValue("");
      setRepasswordValue("");
      setNameValue("");
      setPhoneNumberValue("");
      setRegion("");
      setKtpNumber("");
      setLanguage("");
      setCapability("");
      setImageKtp();
      setIsPageLogin(true);
    }
  }


  return (

    <View
      style={
        isPageLogin === true ? stylesForm.containerLogin : stylesForm.containerRegister
      }
    >
      <ScrollView style={{ width: "100%" }}>

        {isPageLogin === true ? (
          <Text style={{ fontSize: 25, color: "#FFFFFF", marginTop: 20, alignSelf: "center" }}>
            Login
          </Text>
        ) : (
            <Text style={{ fontSize: 25, color: "#FFFFFF", marginTop: 20, alignSelf: "center" }}>
              Register
            </Text>
          )}
        <View style={{ width: "100%", alignItems: "center", marginTop: 20, alignSelf: "center" }}>
          {isPageLogin === false &&
            <TextInput
              style={stylesForm.textField}
              onChangeText={text => setNameValue(text)}
              placeholder={"Full Name"}
              placeholderTextColor={"#FFFFFF"}
              value={nameValue}
            />
          }

          <TextInput
            style={stylesForm.textField}
            onChangeText={text => handlerEmail(text)}
            placeholder={"Email"}
            placeholderTextColor={"#FFFFFF"}
            value={emailValue}
          />
          <TextInput
            secureTextEntry={true}
            style={stylesForm.textField}
            onChangeText={text => handlerPassword(text)}
            placeholder={"Password"}
            placeholderTextColor={"#FFFFFF"}
            value={passwordValue}
          />
          {isPageLogin === true ? (
            <View></View>
          ) : (
              <View style={{ width: "100%", alignItems: "center" }}>
                <TextInput
                  secureTextEntry={true}
                  style={stylesForm.textField}
                  placeholder={"Re-Password"}
                  placeholderTextColor={"#FFFFFF"}
                  onChangeText={text => handleRepassword(text)}
                  value={repasswordValue}
                />
                <TextInput
                  keyboardType={"number-pad"}
                  style={stylesForm.textField}
                  placeholder={"Phone Number"}
                  placeholderTextColor={"#FFFFFF"}
                  onChangeText={text => handlePhoneNumber(text)}
                  value={phoneNumberValue}
                />
              </View>
            )}

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={stylesForm.radioContainer}>
              <TouchableOpacity style={stylesForm.circle} onPress={() => setRole("Tour Guide")}>
                {role === "Tour Guide" && <View style={stylesForm.checkedCircle} />}
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>Tour Guide</Text>
            </View>
            <View style={stylesForm.radioContainer}>
              <TouchableOpacity style={stylesForm.circle} onPress={() => setRole("Tourist")} >
                {role === "Tourist" && <View style={stylesForm.checkedCircle} />}
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 10 }}>Tourist</Text>
            </View>
          </View>
          {isPageLogin === false &&
            role === "Tour Guide" &&
            <View style={{ width: "100%", alignItems: "center" }}>
              <TextInput
                style={stylesForm.textField}
                placeholder={"Region"}
                placeholderTextColor={"#FFFFFF"}
                onChangeText={text => setRegion(text)}
                value={region}
              />
              <TextInput
                style={stylesForm.textField}
                keyboardType={"number-pad"}
                placeholder={"KTP Number"}
                placeholderTextColor={"#FFFFFF"}
                onChangeText={text => setKtpNumber(text)}
                value={ktpNumber}
              />
              <TextInput
                style={stylesForm.textField}
                keyboardType={"number-pad"}
                placeholder={"KTP Number"}
                placeholderTextColor={"#FFFFFF"}
                onChangeText={text => setLanguage(text)}
                value={language}
              />
              <View style={stylesForm.textField} onTouchStart={() => pickImage()}>
                <Text style={{ color: "#FFFFFF", marginTop: 10 }}>Upload KTP Photo</Text>
              </View>
              <View style={stylesForm.textField} onTouchStart={() => pickImage()}>
                <Text style={{ color: "#FFFFFF", marginTop: 10 }}>Upload Sertifikasi</Text>
              </View>
              {imageKtp && <Image source={{ uri: imageKtp.uri }} style={{ width: 250, height: 150 }} />}
            </View>
          }

          {isPageLogin === true ? (
            <TouchableOpacity onPress={() => handlerSubmit()}>
              <View style={stylesForm.buttonLogin}>
                <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Sign In</Text>
              </View>
            </TouchableOpacity>
          ) : (
              <TouchableOpacity onPress={() => handlerSubmit()}>
                <View style={stylesForm.buttonLogin}>
                  <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            )}
          {isPageLogin === true ? (
            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 50 }}>
              <Text style={{ color: "#FFFFFF" }}>Don't have Account ?</Text>
              <TouchableOpacity onPress={() => handlerChangePage()}>
                <Text style={{ color: "#00607C" }}> Register</Text>
              </TouchableOpacity>
            </View>
          ) : (
              <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 50 }}>
                <Text style={{ color: "#FFFFFF" }}>Already have Account ?</Text>
                <TouchableOpacity onPress={() => handlerChangePage()}>
                  <Text style={{ color: "#00607C" }}> Login</Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
};

