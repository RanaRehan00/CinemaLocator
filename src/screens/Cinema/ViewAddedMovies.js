import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Alert, FlatList, Button } from 'react-native'
import { Text } from 'react-native-paper'
import { withRouter } from "react-router";

//local imports
import Background from '../../components/Background'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
//firebase auth functions
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationEvents } from 'react-navigation'

var FlatlistData = [];
var DeleteBookedMovies = [];
export default function ViewAddedMovies({ route, navigation }) {
    const [state, setState] = useState([]);
    var DataArray = [];
    var UID;
    UID = route.params.userId
    useEffect(() => {
        // console.log('id',UID)
        const usersCollection = firestore().collection('Movies');
        usersCollection.where('CinemaId', '==', '' + UID).get()
            .then(
                querySnapshot => {
                    // console.log('Total Objects: ', querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                        //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        DataArray.push(documentSnapshot.data())
                    }
                    )
                }).then(() => {
                    FlatlistData = DataArray;
                    setState();
                    // console.log()
                    // console.log('outside use effect call', FlatlistData)
                })
    })
    var DataArray2 = [];
    const DeleteMovie = async (key) => {
        const db = firestore().collection('Movies');
        db.doc(key).delete()
            .then(() => {
                const usersCollection = firestore().collection('BookedMovies');
                usersCollection.where('MoveiId', '==', '' + key).get()
                    .then(
                        querySnapshot => {
                            // console.log('Total Objects: ', querySnapshot.size);
                            querySnapshot.forEach(documentSnapshot => {
                                //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                                DataArray2.push(documentSnapshot.data())
                            }
                            )
                        }).then(() => {
                            DeleteBookedMovies = DataArray2;
                            setState();
                            console.log("booked entries", DeleteBookedMovies)
                            // console.log('outside use effect call', FlatlistData)
                        })
                    .then(() => {
                        const db2 = firestore().collection('BookedMovies');
                        for (let i = 0; i < DeleteBookedMovies.length; i++) {
                            db2.doc(DeleteBookedMovies[i].Key).delete()
                        }
                    })
            })
            .then(() => Alert.alert("Successful!",
                "Movie Deleted",
                [

                    { text: "ok", onPress: () => navigation.goBack() }
                ]))

    }
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Movies Currently Playing</Header>
            <FlatList
                style={{ marginLeft: -40, marginRight: -40 }}
                horizontal={true}
                data={FlatlistData}
                numColumns={1}
                keyExtractor={(item) => item.Key}
                renderItem={({ item }) =>
                (
                    <View style={styles.mainFlex}>
                        <View style={styles.imageFlex}>
                            <Image
                                resizeMode={'contain'}
                                style={styles.image}
                                source={{ uri: item.ImgLink }}
                            />
                        </View>
                        <View style={styles.detailFlexMainContainer}>
                            <View style={styles.movieNameContainer}>
                                <Text style={styles.movieNameText}>{item.MovieName}</Text>
                            </View>
                            <View style={styles.detailContainer} >
                                <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Date:{item.Date}</Text>
                                </View>
                                <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Time:{item.Time}</Text>
                                </View>
                                <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Seats Left:{item.AvailableSeats}</Text>
                                </View>
                                <ButtonLogin mode="contained" onPress={() => {
                                    Alert.alert("Are you sure!",
                                        "Press Yes to Delete this Movie and Cancel all the Bookings made on it.",
                                        [

                                            { text: "No", onPress: () => console.log("canceled") },
                                            { text: "Yes", onPress: () => DeleteMovie(item.Key) }
                                        ])
                                }}>
                                    Delete
                                </ButtonLogin>
                            </View>
                        </View>
                    </View>
                )}
            />

            <ButtonLogin
                mode="contained"
                onPress={() => navigation.popToTop()}
                style={{ marginTop: 25 }}
            >
                Done
      </ButtonLogin>

        </Background>
    )
}

const styles = StyleSheet.create({
    mainFlex: {
        flex: 9,
        width: 200,
        margin: 5,
        backgroundColor: 'lavender',
        borderRadius: 15
    },
    imageFlex: {
        flex: 6,
        padding: 5,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 5,
    },
    detailFlexMainContainer: {
        flex: 4,
        padding: 10,
    },
    movieNameContainer: {
        flex: 3,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    movieNameText: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    detailContainer: {
        flex: 7,
        flexDirection: 'column',
        paddingTop: 5,
    },
    detailHeadingtext: {
        fontSize: 16
    },
    timeflex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
})
