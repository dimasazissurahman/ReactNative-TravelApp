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

const Container = styled.View`
  flex-grow: 1;
`;

function Maps({ getLoc, onPress }) {
  const [textLatitude, setTextLatitude] = useState(0);
  const [textLongitude, setTextLongitude] = useState(0);
  const [location, setLocation] = useState();
  const [errMsg, setErrMsg] = useState();

  const { tokenKey } = useContext(AppContext);

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
  }, [getLoc]);

  return (
    <Container>
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
          <Marker coordinate={{ latitude: -6.1770648, longitude: 106.6462424 }}>
            <Image
              style={{ height: 30, width: 30 }}
              resizeMode={"contain"}
              source={peopleIcon}
            />
          </Marker>
          <Marker
            coordinate={{ latitude: -6.176064, longitude: 106.6465423 }}
            onPress={onPress}
          >
            <Image
              style={{ height: 30, width: 30 }}
              resizeMode={"contain"}
              source={peopleIcon}
            />
          </Marker>
        </MapView>
      ) : (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: "center" }}
          size={"large"}
          animating
        />
      )}
    </Container>
  );
}

export default Maps;
