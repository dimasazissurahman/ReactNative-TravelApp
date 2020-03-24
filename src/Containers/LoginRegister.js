import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { LoginForm } from '../Components/AllComponents';

function LoginRegister() {

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#00607C" }} behavior={"padding"}>
            <View style={styles.title}>
                <Text style={{ fontSize: 25, color: "#FFFFFF" }}>Travel-Guide</Text>
            </View>
            <LoginForm />
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