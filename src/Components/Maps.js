import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import peopleIcon from "../../assets/peopleIcon.png";
import { AppContext } from "./Provider";
import Axios from "axios";
import { getData } from '../Components/DeviceStorage';
import photoProfile from '../../assets/IMG_0223.png';

const Container = styled.View`
  flex-grow: 1;
  position: absolute;
  z-index: 999;
`;

function Maps({ getLoc, onPress }) {
  const [textLatitude, setTextLatitude] = useState(0);
  const [textLongitude, setTextLongitude] = useState(0);
  const [location, setLocation] = useState();
  const [errMsg, setErrMsg] = useState();
  const [dataMarker, setDataMarker] = useState();

  const { tokenKey } = useContext(AppContext);

  const getDataMarker = async () => {
    try {
      let data = await Axios.post("http://192.168.1.6:5000/maps", {
        long: textLongitude,
        lat: textLatitude
      });
      console.log(data);
      console.log(data.data);
      setDataMarker(data.data);
      console.log(textLatitude);
      console.log(textLongitude);
      console.log(data.data[0].longitude);
      console.log(data.data[0].latitude);
      console.log(data.data[1].longitude);
      console.log(data.data[1].latitude);
      console.log(data.data[2].longitude);
      console.log(data.data[2].latitude);



    } catch (error) {
      console.log(error);
    }
  }


  const getLocationAsync = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);

    if (status.status !== "granted") {
      setErrMsg("Permission to access location was denied");
    } else {
      setErrMsg("Permssion granted");

      let currlocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      // console.log(currlocation);
      console.log(tokenKey);

      setLocation(currlocation);
      setTextLatitude(currlocation.coords.latitude);
      setTextLongitude(currlocation.coords.longitude);
    }
  };

  const region = {
    latitude: textLatitude,
    longitude: textLongitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034
  };

  useEffect(() => {
    getLocationAsync();
    if (getLoc) {
      getDataMarker();
    }
  }, [getLoc]);


  return (
    <View style={{ flexGrow: 1 }}>
      {textLatitude ? (
        <MapView style={{ flex: 1 }} region={region}>
          <Marker
            coordinate={{
              latitude: textLatitude,
              longitude: textLongitude
            }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              resizeMode={"contain"}
              source={peopleIcon}
            />
          </Marker>
          {dataMarker ? dataMarker.map((data, index) => {
            let latitude = parseFloat(data.latitude)
            let longitude = parseFloat(data.longitude)

            const coords = {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034
            };
            return (
              <Marker
                key={index}
                coordinate={coords}
                onPress={onPress}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode={"contain"}
                  source={peopleIcon}
                />
              </Marker>
            )
          })
            : <View></View>}
        </MapView>
      ) : (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center" }}
            size={"large"}
            animating
          />
        )}
    </View>
  );
}

export default Maps;
