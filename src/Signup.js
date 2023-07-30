import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';

const Signup = (props,{navigation}) => {
    return (
        <Background>
            <View style={{ alignItems: 'center', width: 400 }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 64, fontWeight:
                        'bold', marginTop: 10
                    }}>
                    Register</Text>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Created a new account</Text>
                <View
                    style={{
                        backgroundColor: "white",
                        height: 650,
                        width: 400,
                        borderTopLeftRadius: 100,
                        paddingTop: 10,
                        alignItems: 'center',
                        display:'flex',
                        bottom:24
                    }}>
                    <Field placeholder="First Name"/>
                    <Field placeholder="Last Name"/>
                    <Field placeholder="Email/Username" keyboardType={"email-address"} />
                    <Field placeholder="Contact Number" keyboardType={"number"}/>
                    <Field placeholder="Password" secureTextEntry={true} />
                    <Field placeholder="Confirm Password" secureTextEntry={true} />
                    <View style={{ display:'flex',flexDirection:'row', justifyContent:'center', alignItems: 'flex-end', width: '70%', paddingRight: 10 ,alignItems:'center'}}>
                        <Text style={{ color: "grey",fontSize: 16 }}>By signing in, you agree to our {' '}</Text>
                        <Text style={{color:darkGreen,fontFamily:'bold',fontSize:16}}>Terms & Conditions</Text>
                    </View>
                    <View style={{ display:'flex',flexDirection:'row', alignItems: 'flex-end', width: '70%', paddingRight: 10,alignItems:'center'}}>
                        <Text style={{ color: "grey",fontSize: 16 }}>{" "}</Text>
                        <Text style={{color:darkGreen,fontFamily:'bold',fontSize:16}}>privacy policy</Text>
                    </View>
                    <Btn textColor='white' bgColor={darkGreen} btnLabel="Signup" Press={() => {
                        alert("Account created")
                        props.navigation.navigate('Login')

                    }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account ?</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
                            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    );
}
export default Signup;