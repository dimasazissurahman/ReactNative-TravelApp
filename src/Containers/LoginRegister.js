import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { LoginForm } from '../Components/AllComponents';
import { AppContext } from '../Components/Provider';
import Home from './Home';

function LoginRegister() {
    const { tokenKey } = useContext(AppContext);


    useEffect(() => {
        console.log(tokenKey);
    }, [tokenKey]);

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#00607C" }} behavior={"padding"}>
            <View>
                <View style={styles.title}>
                    <Text style={{ fontSize: 25, color: "#FFFFFF" }}>Travel-Guide {tokenKey}</Text>
                </View>
                <LoginForm />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 50,
        height: '15%',
        marginLeft: 15,
    }
})
export default LoginRegister;