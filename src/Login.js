import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const setData = async () => {
    }

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        // const email_pattern=/[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (email === "") {
            setError('email is required')
        }else if (password === ""){
            setError('password is required')
        }else {
            setError('')
            console.log('Login')
            var formData = new FormData();
            formData.append('user_email', email);
            formData.append('user_password', password);
            formData.append('action', 'user_login');
            //body 
            axios.post('https://techartisanslab.com/tracking/api/api.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then(async (res) => {
                console.log(res.data)
                await AsyncStorage.setItem("token", res.data.data)
                navigation.navigate('Homepage')
            }).catch(err => {
                console.log(err)
                // return null
            })
        }
    }
    return (
        <Background>
            <View style={{ alignItems: 'center', width: 400 }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 64, fontWeight:
                            'bold', marginVertical: 10
                    }}>
                    Login</Text>
                <View
                    style={{
                        backgroundColor: "white",
                        height: 700,
                        width: 460,
                        borderTopLeftRadius: 130,
                        paddingTop: 100,
                        alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>Welcome back</Text>
                    <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>Login to your account</Text>

                    {/* for defining your values and changing their state by onchangetest method by writing text in input field */}
                    <Field
                        maxLength={30}
                        placeholder="Email/Username" keyboardType={"email-address"} onChangeText={(text) => setEmail(text)}
                        value={email} />

                    {error === 'email is required' ?
                        <Text style={{ color: "red", fontSize: 19 }}>{error}</Text>
                        : null}

                    {error === 'email is invalid' ?
                        <Text style={{ color: "red", fontSize: 19 }}>{error}</Text>
                        : null}

                    <Field placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}
                        keyboardType={'numeric'}
                    />
                    {error === 'password is required' ?
                        <Text style={{ color: "red", fontSize: 19 }}>{error}</Text>
                        : null}

                    {error === 'password is invalid' ?
                        <Text style={{ color: "red", fontSize: 15 }}>{error}</Text>
                        : null}

                    <View style={{ alignItems: 'flex-end', width: '70%', paddingRight: 16, marginBottom: 130, alignItems: 'center' }}>
                        <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Forget Password ?</Text>
                    </View>

                    {/* this is onpress method for calling any function  */}
                    <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => {
                        handleSubmit()
                    }} />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Background>
    );
}

export default Login;