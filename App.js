import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps'
import styled from 'styled-components';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Container = styled.View`
  flex-grow: 1;
`;

function App() {
  const [textLatitude, setTextLatitude] = useState(0);
  // 
  const [textLongitude, setTextLongitude] = useState(0);
  // 
  const [location, setLocation] = useState();
  const [errMsg, setErrMsg] = useState();
  const [flag, setFlag] = useState(false);
  // let CurrentLocation = Location.getCurrentPositionAsync();

  const getLocationAsync = async () => {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    // console.log(status);

    if (status.status !== 'granted') {
      setErrMsg('Permission to access location was denied');
    } else {
      setErrMsg('Permssion granted')

      let currlocation = await Location.getCurrentPositionAsync(
        //   (postion) => {
        //     console.log(postion);

        //     // const currLong = JSON.stringify(postion.coords.longitude);
        //     // // setTextLongitude(currLong);
        //     // console.log("masuk curr");

        //     // console.log(currLong);

        //     // const currLat = JSON.stringify(postion.coords.latitude);
        //     // // setTextLatitude(currLat);
        //     // console.log(currLat);

        //   },
        //   (err) => setErrMsg(err), {
        //   enableHighAccuracy: false, timeout: 20000, maximumAge: 1000
        // }
      );

      setLocation(currlocation);
      console.log(location);
      console.log(location.coords);
      setTextLatitude(location.coords.latitude);
      console.log(location.coords.latitude);
      setTextLongitude(location.coords.longitude);

    }
  }

  // useEffect(() => {
  //   if (location) {

  //     let text = JSON.stringify(location);
  //     if (location.coords) {
  //       console.log(JSON.stringify(location));
  //       console.log(text.coords.longitude);


  //       // let textLat = JSON.stringify(text.coords.latitude);
  //       // let textLong = JSON.stringify(text.coords.longitude);
  //       console.log("masuk 1");

  //       if (text) {
  //         console.log("sucess");

  //         // setTextLatitude(textLat);
  //         // setTextLongitude(textLong);
  //       }
  //     }
  //   }
  // }, [location]);

  console.log(textLatitude);
  console.log(textLongitude);
  console.log(errMsg);


  // console.log(textLongitude);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {textLatitude ?
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: textLatitude,
              longitude: textLongitude,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034
            }}
          >
            <MapView.Marker 
              coordinate={{latitude: 37.78825,
                longitude: -122.4324}}
                title={"title"}
                description={"description"}
            />
          </MapView>
          : <Text>Loading Dulu</Text>}
        <View onTouchStart={() => getLocationAsync()}>
          {/* <Text>{textLatitude}</Text>
          <Text>{textLongitude}</Text> */}
          <Text>Click Here</Text>
        </View>
      </Container>
    </SafeAreaView>
  );
}

export default App;

// const styles = StyleSheet.crdkdkdkp
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
