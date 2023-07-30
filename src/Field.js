import React from 'react';
import { TextInput } from 'react-native';
import { darkGreen } from './Constants';

const Field = (props) => {
    return (
        <TextInput {...props} style={{ borderRadius: 70,fontSize:20,paddingLeft:18,color: darkGreen, width: '80%' }} placeholderTextColor={'#333'} >

        </TextInput>
    )
}
export default Field;