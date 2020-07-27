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

export const saveData = async (data) => {
    try {
        await AsyncStorage.setItem("user_data", JSON.stringify(data));
        console.log("user data berhasil di store");
    } catch (error) {
        console.log("error saveData " + error);
    }
}

export const getData = async () => {
    try {
        const data = await AsyncStorage.getItem("user_data");
        let objData = JSON.parse(data);
        console.log("data berhasil di get");
        return objData;
    } catch (error) {
        console.log("data error di get" + error);
    }
}

export const deleteData = async () => {
    try {
        await AsyncStorage.removeItem("user_data");
        console.log("berhasil hapus data");
    } catch (error) {
        console.log("error deleteData: " + error);
    }
}
