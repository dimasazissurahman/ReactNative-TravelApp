import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, SafeAreaView, AsyncStorage } from 'react-native';
import { LoginForm } from '../Components/AllComponents';
import { AppContext } from '../Components/Provider';
import Home from './Home';
import { useNavigation } from 'react-navigation-hooks';

function LoginRegister() {
    const { tokenKey, setTokenKey } = useContext(AppContext);
    const { role, setRole } = useContext(AppContext);
    const { navigate } = useNavigation();

    return (
        // <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#00607C" }} behavior={"padding"}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#00607C" }}>
            <View style={styles.title}>
                <Text style={{ fontSize: 25, color: "#FFFFFF" }}>Travel-App</Text>
            </View>
            <LoginForm />
        </SafeAreaView>
        // </KeyboardAvoidingView>
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