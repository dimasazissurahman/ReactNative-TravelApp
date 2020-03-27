import React, { useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { AppContext } from './Provider';

export const saveItem = async (value) => {
    try {
        await AsyncStorage.setItem("id_token", value.toString());
        console.log("token berhasil di store ");
        
    } catch (error) {
        console.log("error SetItem: " + error);
    }
}
export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem("id_token");
        console.log("berhasil hapus token");
    } catch (error) {
        console.log("error RemoveItem: " + error);
    }
}

