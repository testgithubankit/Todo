import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";


export default function ProductCategory() {
    const route = useRoute();
    return(
        
        <View>
        <Text style={{
            fontSize:20,
            color:'#00008b',
            display:'flex',
            left:10,
            top:25,
            fontWeight:'bold',
            width:370,
            padding:7,
            borderBottomWidth:2,
            borderColor:'lightgrey',
        }}>{route.params?.Firstname}</Text>
        <Text style={{
             fontSize:20,
             color:'#00008b',
             display:'flex',
             fontWeight:'bold',
             left:6,
             top:25,
             margin:5,
             width:370,
             padding:8,
             borderBottomWidth:2,
             borderColor:'lightgrey'
        }}>{route.params?.Lastname}</Text>
        <Text style={{
            fontSize:20,
            color:'#00008b',
            display:'flex',
            fontWeight:'bold',
            width:370,
            left:11,
            top:25,
            padding:7,
            borderBottomWidth:2,
            borderColor:'lightgrey'
        }}>{route.params?.MobileNumber} </Text>
        <Text style={{
            fontSize:20,
            color:'#00008b',
            display:'flex',
            fontWeight:'bold',
            left:4,
            top:25,
            padding:8,
            margin:6,
            width:370,
            borderBottomWidth:2,
            borderColor:'lightgrey'
        }}>{route.params?.Email}</Text>
        <Text style={{
            fontSize:20,
            color:'#00008b',
            display:'flex',
            fontWeight:'bold',
            left:5,
            top:25,
            padding:8,
            width:370,
            borderBottomWidth:2,
            borderColor:'lightgrey'
        }}>{route.params?.Address}</Text>
        <Text style={{
            fontSize:20,
            color:'#00008b',
            display:'flex',
            fontWeight:'bold',
            margin:6,
            padding:8,
            left:5,
            width:370,
            top:25,
            borderBottomWidth:2,
            borderColor:'lightgrey'
            }}>{route.params?.PinCode}</Text>
        <Text style={{
            fontSize:20,
            color:'#00008b',
            fontWeight:'bold',
            display:'flex',
            left:10,
            width:372,
            padding:8,
            top:25,
            borderBottomWidth:2,
            borderColor:'lightgrey'
            }}>{route.params?.City}</Text>
        </View>
    );
}