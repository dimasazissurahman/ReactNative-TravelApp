import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SpaceHeader } from "./Menu";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";
import { AppContext } from "./Provider";
import { saveItem } from '../Components/DeviceStorage';

const styles = StyleSheet.create({
  containerRegister: {
    backgroundColor: "#66ADC3",
    height: "100%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    alignItems: "center"
  },
  containerLogin: {
    backgroundColor: "#66ADC3",
    marginTop: "30%",
    height: "65%",
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

  const [isPageLogin, setIsPageLogin] = useState(true);
  const [role, setRole] = useState("");

  const { tokenKey, setTokenKey } = useContext(AppContext);
  const { isLoading, setIsLoading } = useContext(AppContext);

  console.log(emailValue, passwordValue, role);

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

  const handlerSubmit = async () => {
    if (isPageLogin === true) {
      if (emailFlag === true && passwordFlag === true) {
        try {
          const data = await axios.post("http://192.168.1.10:5000/loginuser", {
            email: emailValue,
            password: passwordValue,
            role: role
          });
          // console.log(data.status);
          console.log(data);
          // console.log(data.data.token);
          // console.log(data.data.token.iat);
          // if (data.status === 200) {
          console.log("masuk");
          saveItem(data.data.token.iat);
          if(role === "Tourist"){
            navigate('Home');
          }else {
            navigate('HomeTourGuide');
          }
          // }
        } catch (error) {
          console.log({error: error.response});
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
        try {
          const data = await axios.post("http://192.168.1.10:5000/signupuser", {
            email: emailValue,
            name: nameValue,
            password: passwordValue,
            phone_number: phoneNumberValue,
            role: role
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        // navigate("Home");
      } else {
        console.log("Please fill all field");
      }
    }
  };


  return (
    <View
      style={
        isPageLogin === true ? styles.containerLogin : styles.containerRegister
      }
    >
      {isPageLogin === true ? (
        <Text style={{ fontSize: 25, color: "#FFFFFF", marginTop: 20 }}>
          Login
        </Text>
      ) : (
          <Text style={{ fontSize: 25, color: "#FFFFFF", marginTop: 20 }}>
            Register
          </Text>
        )}
      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        {isPageLogin === false &&
          <TextInput
            style={styles.textField}
            onChangeText={text => setNameValue(text)}
            placeholder={"Name"}
            placeholderTextColor={"#FFFFFF"}
            value={nameValue}
          />
        }

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
        {isPageLogin === true ? (
          <View></View>
        ) : (
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
          )}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.circle} onPress={() => setRole("Tour Guide")}>
              {role === "Tour Guide" && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10 }}>Tour Guide</Text>
          </View>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.circle} onPress={() => setRole("Tourist")} >
              {role === "Tourist" && <View style={styles.checkedCircle} />}
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 10 }}>Tourist</Text>
          </View>
        </View>

        {isPageLogin === true ? (
          <View onTouchStart={() => handlerSubmit()} style={styles.buttonLogin}>
            <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Sign In</Text>
          </View>
        ) : (
            <View onTouchStart={() => handlerSubmit()} style={styles.buttonLogin}>
              <Text style={{ fontSize: 20, color: "#FFFFFF" }}>Sign Up</Text>
            </View>
          )}
        {isPageLogin === true ? (
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={{ color: "#FFFFFF" }}>Don't have Account ?</Text>
            <View onTouchStart={() => setIsPageLogin(false)}>
              <Text style={{ color: "#00607C" }}> Sign Up</Text>
            </View>
          </View>
        ) : (
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ color: "#FFFFFF" }}>Already have Account ?</Text>
              <View onTouchStart={() => setIsPageLogin(true)}>
                <Text style={{ color: "#00607C" }}> Sign In</Text>
              </View>
            </View>
          )}
      </View>
    </View>
  );
};
