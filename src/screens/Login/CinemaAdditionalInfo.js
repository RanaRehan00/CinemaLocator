import React, { useState, useEffect } from 'react'
import { View, Alert,StyleSheet, TouchableOpacity, Image } from 'react-native'
//Local Imports
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import TextInput from '../../components/TextInput'
import { theme } from '../../core/theme'
import { nameValidator } from '../../helpers/nameValidator'
//firebase auth functions
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '884219733010-6u7g0kj2c4gd453084dgorkjip4ihkq1.apps.googleusercontent.com',
});

export default function CinemaAditionalInfo({ navigation }) {
const userType="CinemaUser"
//Next Page
    const Continue = () => {
        (navigation.reset({
            index: 0,
            routes: [{ name: userType }],
        }))
    }

    var user="";
    const UploadDataToFirestore = () => {
        user = auth().currentUser;
    console.log("current user data:",user)
        const db = firestore().collection(userType);
        db.doc(user.uid).set({
            UserType: userType,
            Name: name.value,
            Email: user.email,
            Adress: adress.value,
            UserId: user.uid
        }).then(() => {
            Alert.alert("Congragulations!",
              "Your Account has been created Successfully.",
              [
      
                { text: "ok", onPress: () => Continue() }
              ])
          })
        }


        const [name, setName] = useState({ value: '', error: '' })
        const [adress, setAdress] = useState({ value: '', error: '' })
        
        const donePressed = () => {
        const nameError = nameValidator(name.value)
        const adressError = nameValidator(adress.value)
        if (nameError||adressError) {
            setName({ ...name, error: nameError })
            setAdress({ ...adress, error: adressError })
            return
        }
        UploadDataToFirestore();
    }
return (
    <Background>
        {/* <BackButton goBack={navigation.goBack} /> */}
        <Logo />
        <Header>Additional Information</Header>
        <TextInput
            label="Cinema Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
        />
        <TextInput
            label="Cinema Location"
            returnKeyType="next"
            value={adress.value}
            onChangeText={(text) => setAdress({ value: text, error: '' })}
            error={!!adress.error}
            errorText={adress.error}
        />
        <ButtonLogin
            mode="contained"
            onPress={donePressed}
            style={{ marginTop: 25 }}
        >
            Done
      </ButtonLogin>

    </Background>
)
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})
