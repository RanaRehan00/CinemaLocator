import React, { useState, useEffect } from 'react';
import {
     SafeAreaView, StyleSheet, Text, Image, View, FlatList, TouchableOpacity, Alert,ScrollView,
} from 'react-native';
import Header from '../../components/Header';
import ButtonLogin from '../../components/Login/Button'

//firebase auth functions
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var AllCinemas = [];

export default function cinema({ navigation }) {
    const [state, setState] = useState([]);
    var Cinemas = [];
    var Movies = [];

    useEffect(() => {
        // console.log("useffect1")

        const cinemaCollection = firestore().collection('CinemaUser');
        cinemaCollection.get().then(
            querySnapshot => {
                // console.log('Total Objects: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    Cinemas.push(documentSnapshot.data())
                })
            }
        ).then(
            () => {
                AllCinemas = Cinemas;
                console.log('All Cinemas Array: ', AllCinemas)
                setState();
            }
        )
    });

    //Navigation constants for header buttons
    const searchPage = React.useCallback(() => {
        navigation.navigate('Search Cinema');
    });
    const bookedTicketPage = React.useCallback(() => {
        navigation.navigate('Booked Tickets');
    });
    const Logoff = () => {
        auth()
          .signOut()
          .then(() => console.log('User signed out!'))
          .then((navigation.reset({
            index: 0,
            routes: [{ name: 'entryscreen' }],
          })));
      }


    return (
        <SafeAreaView style={styles.Flex_1}>
            <Header title="Cienmas" ticketsButton={bookedTicketPage} menuButton={ ()=>{Alert.alert("Are you sure!",
        "Press Logout to continue.",
        [
            { text: "Cancel", onPress: () =>  console.log("canceled")},
          { text: "Logout", onPress: () => Logoff() }
        ])} } />
            <View style={styles.bodyFlex}>
                {/* <Text>Flatlist start</Text> */}
                <FlatList
                    data={AllCinemas}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(item) => item.UserId}
                    renderItem={({ item }) =>
                    (
                        <TouchableOpacity
                        onPress={()=>navigation.navigate("Movies Playing Now!",{
                            CinemaId: item.UserId,
                            CinemaName: item.Name,
                            // nextpage: "MoviesDetail",
                        })}
                        >

                        <View style={styles.mainFlex}>
                            <View style={styles.cinemaNameFlex}>
                                <Text style={styles.cinemaNameText}>{item.Name}</Text>
                            </View>
                            <View style={styles.movieHeadingFlex}>
                                <Text style={styles.movieHeadingText}>Location: {item.Adress}</Text>
                            </View>
                            <View style={styles.movieHeadingFlex}>
                            <ButtonLogin mode="outlined" onPress={()=>navigation.navigate("Movies Playing Now!",{
                            CinemaId: item.UserId,
                            CinemaName: item.Name,
                            // nextpage: "MoviesDetail",
                        })}>
        View Movies Currently Playing
      </ButtonLogin>
                            </View>

                        </View>
                        </TouchableOpacity>
                    )} />
            </View>
        </SafeAreaView>
    );


}


const styles = StyleSheet.create({

    Flex_1: {
        flex: 1
    },
    bodyFlex: {
        flex: 9,
        backgroundColor: 'lavender',

    },
    mainFlex: {
        flex: 1,
        flexDirection: 'column',
        margin: 15,
        padding: 10,
        // width: "95%",
        borderRadius: 20,
        backgroundColor: 'ghostwhite',
        // justifyContent: 'center',
        // alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 12,
    },
    cinemaNameFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cinemaNameText: {
        fontWeight: 'bold',
        fontSize: 32,
    },
    movieHeadingFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop:10,
    },
    movieHeadingText: {
        fontSize: 20,
    },
    moviesFlatlist: {
        flex: 4,
    },
    movieDetailContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
        padding: 5,
        borderWidth: 0,
        backgroundColor: 'mintcream',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 12,
    },
    image: {
        height: 150,
        width: 100,
        borderRadius: 5,
    },
    movieDetailFlex: {
        flex: 2,
        marginLeft: 15,
    },
    movieHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    movieDetail: {
        color: 'black',
    },
});