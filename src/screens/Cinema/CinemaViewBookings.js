import React, { useEffect,useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Alert, FlatList } from 'react-native'
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
export default function CinemaViewBookings({ route, navigation }) {
    const [state, setState] = useState([]);
    var DataArray = [];
    var UID;
    useEffect(() => {
    //     // console.log("useffect")const usersCollection = firestore().collection('users');
    // const usersCollection.where('UserId', '==', route.parmas.UserId).get()
    // .then(
    //   async querySnapshot => {
    //   //  console.log('Users ID: ', querySnapshot.id, querySnapshot.data());
    //     const querySnapshot_1 = await querySnapshot.docs[0].ref.collection('MoviesPlayingNow').get();
    //     querySnapshot_1.forEach(documentSnapshot => {
    //       DataArray.push(documentSnapshot.data());
    //     })})})

        UID=route.params.userId
        console.log('id',UID)
        // const db=firestore().collection('SimpleUser').doc(UID);
        // const doc=db.get()
        // console.log('name of user: ',doc.data().Name);
        const usersCollection = firestore().collection('BookedMovies');
        usersCollection.where('CinemaId','==',''+UID).get()
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
                    console.log('outside use effect call', FlatlistData)
                })

    })
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Movies Currently Booked</Header>
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
                                    <Text style={styles.detailHeadingtext}>Name:<Text style={styles.detailHeading_text}>{item.UserName}</Text></Text>
                                </View>
                            <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Email:<Text style={styles.detailHeading_text}>{item.UserEmail}</Text></Text>
                                </View>
                                <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Date:{item.Date}</Text>
                                </View>
                                <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Time:{item.Time}</Text>
                                </View>
                                <View style={styles.timeflex}>
                                    <Text style={styles.detailHeadingtext}>Seats Booked:<Text style={styles.detailHeading_text}>{item.BookedSeats}</Text></Text>
                                </View>
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
        flex: 5,
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
        flex: 5,
        padding: 10,
    },
    movieNameContainer: {
        flex: 2,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    movieNameText: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    detailContainer: {
        flex: 8,
        flexDirection: 'column',
        paddingTop: 5,
    },
    detailHeadingtext: {
        fontSize: 16
    },
    detailHeading_text: {
        fontSize: 18,
        fontWeight:'bold'
    },
    timeflex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
})
