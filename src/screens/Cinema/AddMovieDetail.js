import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, View, Linking,Image, Alert } from 'react-native'
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
//firebase auth functions
import firestore from '@react-native-firebase/firestore';

var CinemaDetail = [];
export default function AddMovieDetail({ route, navigation }) {
    const [CoverLink, setCoverLink] = useState({ value: '', error: '' })
    const [Description, setDescription] = useState({ value: '', error: '' })
    const [ReleaseYear, setReleaseYear] = useState({ value: '', error: '' })
    const [TrailerLink, setTrailerLink] = useState({ value: '', error: '' })
    var UID = route.params.UserId;
    const [state, setState] = useState([]);

    var DataArray = [];
    useEffect(() => {
        const usersCollection = firestore().collection('CinemaUser');
        usersCollection.where('UserId', '==', '' + UID).get()
            .then(
                querySnapshot => {
                    //   totalObj=querySnapshot.size;
                    querySnapshot.forEach(documentSnapshot => {
                        //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        DataArray.push(documentSnapshot.data())
                    }
                    )
                }).then(() => {
                    CinemaDetail = DataArray;
                    //   console.log('Cinema DEtail Array:', CinemaDetail)
                    //   var Name=CinemaDetail[0];
                    //   console.log('name: ',Name.Name)
                    setState();
                    // console.log('outside use effect call', FlatlistData)
                })
    })






    const uploadData = async () => {
        var CName = CinemaDetail[0];
        // console.log('Cname: ',CName.Name)
        const moviekey = route.params.Title + route.params.UserId;
        const db = await firestore().collection('Movies');
        db.doc(moviekey).set({
            CinemaId: route.params.UserId,
            CinemaNameForThisMovie: CName.Name,
            Key: moviekey,
            MovieName: route.params.Title,
            Date: route.params.Date,
            Time: route.params.Time,
            AvailableSeats: route.params.TotalSeatsAvailable,
            ImgLink: CoverLink.value,
            TrailerLink: TrailerLink.value,
            Description: Description.value,
            ReleaseYear: ReleaseYear.value,
        }).then(() => {
            alert('Movie Added Successfully');
            navigation.popToTop();
        })
    }


    const nextPressed = () => {
        console.log("button entered")

        const CoverLinkError = nameValidator(CoverLink.value)
        const DescriptionError = nameValidator(Description.value)
        const ReleaseYearError = nameValidator(ReleaseYear.value)
        const TrailerLinkError = nameValidator(TrailerLink.value)
        if (CoverLinkError || DescriptionError || ReleaseYearError || TrailerLinkError) {
            setCoverLink({ ...CoverLink, error: CoverLinkError })
            setDescription({ ...Description, error: DescriptionError })
            setReleaseYear({ ...ReleaseYear, error: ReleaseYearError })
            setTrailerLink({ ...TrailerLink, error: TrailerLinkError })
            // console.log("Error")
            return

        }
        // console.log("before async")
        uploadData()
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Additional Details</Header>
            <TextInput
                label="Cover Link(https://)"
                returnKeyType="next"
                value={CoverLink.value}
                onChangeText={(text) => setCoverLink({ value: text, error: '' })}
                error={!!CoverLink.error}
                errorText={CoverLink.error}
            />
            <TextInput
                label="Movie Discription"
                returnKeyType="next"
                value={Description.value}
                onChangeText={(text) => setDescription({ value: text, error: '' })}
                error={!!Description.error}
                errorText={Description.error}
            />
            <TextInput
                label="Release Year"
                returnKeyType="next"
                value={ReleaseYear.value}
                onChangeText={(text) => setReleaseYear({ value: text, error: '' })}
                error={!!ReleaseYear.error}
                errorText={ReleaseYear.error}
            />
            <TextInput
                label="Trailer Link(https://)"
                returnKeyType="next"
                value={TrailerLink.value}
                onChangeText={(text) => setTrailerLink({ value: text, error: '' })}
                error={!!TrailerLink.error}
                errorText={TrailerLink.error}
            />

            <ButtonLogin
                mode="contained"
                onPress={() => nextPressed()}
                style={{ marginTop: 25 }} >
                Add
            </ButtonLogin>
            <View style={styles.row}>
                <Text>Don't Have Links? </Text>
                <TouchableOpacity onPress={() => { Linking.openURL("https://omdbapi.com/?s=Godzilla&apikey=263d22d8"); }}>
                    <Text style={styles.link}>Get from Api</Text>
                </TouchableOpacity>
            </View>


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