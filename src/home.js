import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useEffect} from "react";
import { View, StyleSheet, Text } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkGreen,green } from "./Constants";


const Home = ({navigation}) => {
    const getData = async () => {
        const tokens = await AsyncStorage.getItem("token")
        // console.log(token)
        if (tokens != null) {
        navigation.navigate('Homepage');
        } 
        // useEffect 
      }
    
      useEffect(() => {
        getData()
      }, []);

    return (
        <Background>
            <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
                <Text style={{ color: 'white', fontSize: 64 }}>Let,s start</Text>
                <Text style={{ color: 'white', fontSize: 64 ,marginBottom: 40 }}>Coding</Text>
                <Btn bgColor={green} textColor='white' btnLabel="Login"  Press={()=> navigation.navigate("Login")}/>
                <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={()=> navigation.navigate("Signup")}/>
            </View>
        </Background>
    );
}
const style = StyleSheet.create({})
export default Home;