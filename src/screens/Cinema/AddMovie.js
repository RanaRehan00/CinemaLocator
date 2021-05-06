import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Alert } from 'react-native'
import { Text } from 'react-native-paper'
//local imports
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { nameValidator } from '../../helpers/nameValidator'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import auth from '@react-native-firebase/auth';

export default function AddMovie({ route, navigation }) {
    const [name, setName] = useState({ value: '', error: '' })
    const [Date, setDate] = useState({ value: '', error: '' })
    const [Time, setTime] = useState({ value: '', error: '' })
    const [Seats, setSeats] = useState({ value: '', error: '' })
 
    const nextPressed = () => {
        const nameError = nameValidator(name.value)
        const DateError = nameValidator(Date.value)
        const TimeError = nameValidator(Time.value)
        const SeatsError = nameValidator(Seats.value)
        console.log("button entered")


        if (nameError || DateError || TimeError || SeatsError) {
            setName({ ...name, error: nameError })
            setDate({ ...Date, error: DateError })
            setTime({ ...Time, error: TimeError })
            setSeats({ ...Seats, error: SeatsError })
            console.log('error')
            return
        }
        console.log("async before")
       
        const userId = auth().currentUser.uid;
            console.log(userId)
        navigation.navigate('AddMovieDetail', {
            Title: name.value,
            Date: Date.value,
            Time: Time.value,
            TotalSeatsAvailable: Seats.value,
            UserId: userId,
        })
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            {/* <Logo /> */}
            <Header>Add A Movie Show</Header>
            <TextInput
                label="Movie Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Date(dd:mm:yy)"
                returnKeyType="next"
                value={Date.value}
                onChangeText={(text) => setDate({ value: text, error: '' })}
                error={!!Date.error}
                errorText={Date.error}
            />
            <TextInput
                label="Time(00:00)"
                returnKeyType="next"
                value={Time.value}
                onChangeText={(text) => setTime({ value: text, error: '' })}
                error={!!Time.error}
                errorText={Time.error}
            />
            <TextInput
                label="Total Booking Seats Available"
                returnKeyType="next"
                value={Seats.value}
                onChangeText={(text) => setSeats({ value: text, error: '' })}
                error={!!Seats.error}
                errorText={Seats.error}
            />
            <ButtonLogin
                mode="contained"
                onPress={() => nextPressed()}
                style={{ marginTop: 25 }}
            >
                Next
      </ButtonLogin>

        </Background>
    )
}

const styles = StyleSheet.create({

})
