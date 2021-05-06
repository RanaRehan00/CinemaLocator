import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, ScrollView, TouchableNativeFeedback, StatusBar, StyleSheet, Text, Image, View, FlatList, TouchableOpacity,
} from 'react-native';
import Button from '../../components/button.js';
import firestore from '@react-native-firebase/firestore';


var FlatlistData = [];
export default function selectCinema({ route, navigation }) {
    const [state, setState] = useState([]);
    var DataArray = [];
    var MovieName = route.params.MovieName
    useEffect(() => {
        const usersCollection = firestore().collection('Movies');
        usersCollection.where('MovieName', '==', '' + MovieName).get()
            .then(
                querySnapshot => {
                    // console.log('Total Objects: ', querySnapshot.size);
                    querySnapshot.forEach(documentSnapshot => {
                        //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                        DataArray.push(documentSnapshot.data())
                    }
                    )
                }).then(() => {
                    console.log('FlatLIst:', DataArray)
                    FlatlistData = DataArray;
                    setState();
                })

    })
    return (
        <SafeAreaView style={styles.Flex_1}>
            <View style={styles.movieDetailContainer}>
                <View style={styles.Flex_1}>
                    <Image
                        resizeMode={'contain'}
                        style={styles.image}
                        source={{ uri: route.params.ImgLink }}
                    />
                </View>
                <View style={styles.movieDetailFlex}>
                    <ScrollView>
                        <Text style={styles.movieHeading}>{route.params.MovieName}</Text>
                        <Text style={styles.movieDetail}>{route.params.Description}</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.flatlistContainer}>
                <View style={styles.cinemaHeadingFlex}>
                    <Text style={styles.cinemaHeadingText}>Available Cinemas</Text>
                </View>
                <View style={styles.cinemaDetailFlex}>
                    <FlatList
                        data={FlatlistData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.Key}
                        numColumns={1}
                        renderItem={({ item }) =>
                        (
                            <View style={styles.mainContainer}>
                                <View style={styles.Flex_1}>
                                    <Text style={styles.HeadingText}>{item.CinemaNameForThisMovie}</Text>
                                </View>
                                <View style={styles.cienmaFlex_2}>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.detailText}>Time: </Text><Text style={styles.timeStyle}>{item.Time}</Text>
                                        <Text style={styles.detailText}>Date: <Text style={styles.dateStyle}>{item.Date}</Text></Text>
                                    </View>
                                    <View style={styles.buttonFlex}>
                                        <TouchableOpacity
                                            activeOpacity={0}
                                            onPress={() => {
                                                navigation.navigate('Select Seats', {
                                                    ImgLink: route.params.ImgLink,
                                                    MovieName: route.params.MovieName,
                                                    ReleaseYear: route.params.ReleaseYear,
                                                    Description: route.params.Description,
                                                    Trailer: route.params.TrailerLink,
                                                    CinemaId: item.CinemaId,
                                                    CinemaNameis: item.CinemaNameForThisMovie,
                                                    Time: item.Time,
                                                    Date: item.Date,
                                                    AvailableSeats: item.AvailableSeats,
                                                    Key: item.Key,
                                                })
                                            }}>
                                            <View>

                                                <Button title={route.params.nextPage} buttonColor={'red'} textColor={'white'} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );


};

const styles = StyleSheet.create({
    Flex_1: {
        flex: 1,
    },
    movieDetailContainer: {
        flex: 2,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'ghostwhite',
    },
    image: {
        height: 150,
        width: 100,
    },
    movieDetailFlex: {
        flex: 3,
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
    flatlistContainer: {
        flex: 9,
        backgroundColor: 'lavender',
    },
    cinemaHeadingFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'mintcream',
    },
    cinemaDetailFlex: {
        flex: 9
    },
    cinemaHeadingText: {
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'mintcream',
        borderWidth: 2,
        paddingTop: 10,
        paddingBottom: 20,

    },
    HeadingText: {
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor:'lightblue',
        borderRadius:10,
        padding:10,
        color:'black'
    },
    cienmaFlex_2: {
        flex: 5,
        flexDirection: 'row',
    }
    ,
    detailText: {
        margin: 2,
        fontSize: 15,
        fontWeight: 'normal',
    },
    timeStyle: {
        fontWeight: 'bold',
        fontSize: 23,
        color: 'crimson'
    },
    dateStyle: {
        fontWeight: 'bold'
    },
    detailContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFlex: {
        flex: 2,
        justifyContent: 'center',
        margin: 15
    },

});

