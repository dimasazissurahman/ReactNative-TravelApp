import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { AppContext } from './Provider';

export const saveToken = async (value) => {
    try {
        await AsyncStorage.setItem("id_token", value.toString());
        console.log("token berhasil di store ");
    } catch (error) {
        console.log("error saveToken: " + error);
    }
}

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem("id_token");
        console.log("berhasil hapus token");
    } catch (error) {
        console.log("error deleteToken: " + error);
    }
}

export const saveRole = async (value) => {
    try {
        await AsyncStorage.setItem("user_role", value.toString());
        console.log("user role berhasil di store");
    } catch (error) {
        console.log("error saveRole " + error);
    }
}

export const deleteRole = async () => {
    try {
        await AsyncStorage.removeItem("user_role");
        console.log("berhasil hapus role");
    } catch (error) {
        console.log("error deleteRole: " + error);
    }
}
