import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SpaceHeader } from "./Menu";
import { useNavigation } from "react-navigation-hooks";
import axios from "axios";
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
  const [isPageLogin, setIsPageLogin] = useState(true);
  const [role, setRole] = useState("");
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
  const handleRole = text => {
    setRole(text);
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

  const handlerSubmit = () => {
    if (isPageLogin === true) {
      if (emailFlag === true && passwordFlag === true) {
        console.log(emailValue, passwordValue, role);
        axios
          .post("http://192.168.1.9:1010/loginuser", {
            email: emailValue,
            password: passwordValue,
            role: role
          })
          .then(function(response) {
            console.log(response.data.token.iat);
            if (response.data.token.iat !== "") {
              navigate("Home");
            } else {
              console.log("salah goblog");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
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
        navigate("Home");
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
        <TextInput
          style={styles.textField}
          onChangeText={text => handleRole(text)}
          placeholder={"Role"}
          placeholderTextColor={"#FFFFFF"}
          value={role}
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
            <TextInput
              style={styles.textField}
              onChangeText={text => handleRole(text)}
              placeholder={"Role"}
              placeholderTextColor={"#FFFFFF"}
              value={role}
            />
          </View>
        )}

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
