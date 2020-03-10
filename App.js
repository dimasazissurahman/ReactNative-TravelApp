import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps'
import styled from 'styled-components';

const Container = styled.View`
  flex-grow: 1;
`;

function App() {
    return (
      <SafeAreaView style={{flex:1}}>
        <Container>
          <MapView 
          style={{flex:1}}
          initialRegion={{
            latitude:37.78825,
            longitude:-122.4324,
            latitudeDelta:0.00922,
            longitudeDelta:0.00421
          }}
          />
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
