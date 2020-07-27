import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import peopleIcon from "../../assets/peopleIcon.png";
import userIcon from "../../assets/icon_user.png";
import touristIcon from "../../assets/touristIcon.png";
import { AppContext } from "./Provider";
import Axios from "axios";
import { getData } from '../Components/DeviceStorage';
import photoProfile from '../../assets/IMG_0223.png';
import { FontSize } from "./Menu";
import { useNavigation } from "react-navigation-hooks";

const Container = styled.View`
  flex-grow: 1;
  position: absolute;
  z-index: 999;
`;

function Maps() {
  const { navigate } = useNavigation();
  const [textLatitude, setTextLatitude] = useState(0);
  const [textLongitude, setTextLongitude] = useState(0);
  const [location, setLocation] = useState();
  const [errMsg, setErrMsg] = useState();
  const [dataMarker, setDataMarker] = useState();
  const [selectMarker, setSelectMarker] = useState(false);
  const [name, setName] = useState();
  const [regionName, setRegionName] = useState();
  const [tourGuideId, setTourGuideId] = useState();
  const [touristId, setTouristId] = useState();
  const [statusLocation, setStatusLocation] = useState();


  const getDataMarker = async () => {
    try {
      let data = await Axios.post("http://192.168.1.2:5000/maps", {
        long: textLongitude,
        lat: textLatitude
      });
      console.log(data);
      setDataMarker(data.data);
      setStatusLocation(data.status);
    } catch (error) {
      console.log(error);
    }
  }
  const getDataTourist = async () => {
    const data = await getData();
    console.log(data.id);
    setTouristId(data.id);
  }

  useEffect(() => {
    getDataTourist();
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (textLatitude) {
      getDataMarker();
    }
  }, [statusLocation, textLatitude]);


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
      setLocation(currlocation);
      setTextLatitude(currlocation.coords.latitude);
      setTextLongitude(currlocation.coords.longitude);
    }
  };

  // useEffect(() => {
  //   getLocationAsync();
  //   getDataMarker();
  // }, []);

  const region = {
    latitude: textLatitude,
    longitude: textLongitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034
  };

  const handleSelectMarker = (index) => {
    setSelectMarker(true);
    for (let i = 0; i < dataMarker.length; i++) {
      if (i === index) {
        setName(dataMarker[i].name);
        setRegionName(dataMarker[i].region);
        setTourGuideId(dataMarker[i].id);
      }
    }
  }

  const handleSaveTourGuide = async () => {
    try {
      let data = await Axios.post("http://192.168.1.2:5000/pick", {
        tourGuideId: tourGuideId,
        touristId: touristId
      });
      console.log(data);
      if (data.status === 200) {
        navigate('OrderScreen');
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={{ flexGrow: 1 }}>
      {textLatitude ? (
        <MapView style={{ flex: 1, zIndex: -1 }} region={region}>
          <Marker
            coordinate={{
              latitude: textLatitude,
              longitude: textLongitude
            }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              resizeMode={"contain"}
              source={touristIcon}
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
                onPress={() => handleSelectMarker(index)}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode={"contain"}
                  source={userIcon}
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
      {selectMarker === true ?
        <View style={{ backgroundColor: "#00607C", width: "100%", height: "35%", borderTopStartRadius: 10, borderTopEndRadius: 10, zIndex: 10, }}>
          <View style={{ flexDirection: "row", justifyContent: "center", margin: 10, borderBottomWidth: 2, paddingBottom: 10 }}>
            <View style={{
              alignSelf: "center",
              height: 100,
              width: 100,
              borderRadius: 100 / 2,
              elevation: 10,
            }}>
              <Image
                style={{ height: 100, width: 100, borderRadius: 100 / 2 }}
                resizeMode={"cover"}
                source={photoProfile}
              />
            </View>
            <View style={{ width: '60%', justifyContent: "center", marginLeft: 20 }}>
              <FontSize>{name}</FontSize>
              <Text style={{ marginTop: 15, color: "#fff", fontSize: 14 }}>{regionName}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: 10, width: '100%', justifyContent:"center"}}>
            <TouchableOpacity onPress={() => handleSaveTourGuide()}>
              <View style={{ justifyContent: "center", width: 120, marginHorizontal:20, height: 45, backgroundColor: "#FFFFFF", borderRadius: 10 }}>
                <Text style={{ color: "#00607C", fontSize: 25, alignSelf: "center" }}>Select</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectMarker(false)}>
              <View style={{ justifyContent: "center", width: 120, marginHorizontal:20,height: 45, backgroundColor: "#00607C", borderWidth: 2, borderColor: "#FFFFFF", borderRadius: 10 }}>
                <Text style={{ color: "#FFFFFF", fontSize: 25, alignSelf: "center" }}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        : <View></View>
      }
    </View>
  );
}

export default Maps;
