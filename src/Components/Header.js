import React from 'react';
import { View, Text } from 'react-native';

function HeaderComponent({ title }) {
    return (
        <View style={{ height: 110, width: "100%", justifyContent:"center", alignItems:"center",borderColor:"#00607C",borderBottomWidth:1,backgroundColor:"#66ADC3"}}>
            <Text style={{fontSize:30,color:"#FFFFFF",marginTop:10}}>{title}</Text> 
        </View>
    );
}
export default HeaderComponent;