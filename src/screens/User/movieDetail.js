import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Linking, TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../components/button.js';



export default function movieDetail({ route, navigation }) {
    return (
        <SafeAreaView style={styles.mainScreen}>
            <View style={styles.mainConatiner}>
                <ScrollView>
                    <View style={{ flex: 7 }}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.image}
                            source={{ uri: route.params.ImgLink }} />
                    </View>
                    <View style={styles.movieDetailFlex}>
                        <Text style={styles.movieName}>{route.params.MovieName}</Text>
                        <Text style={styles.textHeading}>Release Year: <Text style={styles.text}>{route.params.ReleaseYear}</Text></Text>
                        <Text style={styles.textHeading}>Discription: <Text style={styles.text}>{route.params.Description}</Text></Text>

                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0}

                        onPress={() => { Linking.openURL(route.params.Trailer); }}>
                        <Button title={'Watch Trailer'} buttonColor={'white'} textColor={'red'} borderWidth={1} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0} 
                        onPress={() => navigation.navigate(route.params.nextPage, {
                            nextPage: "Select Seats",
                            ImgLink: route.params.ImgLink,
                            MovieName: route.params.MovieName,
                            ReleaseYear: route.params.ReleaseYear,
                            Description: route.params.Description,
                            Trailer: route.params.Trailer,
                            CinemaId: route.params.CinemaId,
                            CinemaNameis: route.params.CinemaNameis,
                            Time: route.params.Time,
                            Date: route.params.Date,
                            AvailableSeats: route.params.AvailableSeats,
                            Key: route.params.Key,
                        })}>
                        <Button title={route.params.nextPage} buttonColor={'red'} textColor={'white'} />
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Flex_1: {
        flex: 1,
    },
    mainScreen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    mainConatiner: {
        flex: 8.7,
    },
    image: {
        height: '100%',
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    movieDetailFlex: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    movieName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textHeading: {
        fontSize: 19,
        fontWeight: 'bold',
        alignSelf: 'flex-start'

    },
    text: {
        fontSize: 18,
        fontWeight: 'normal',
        alignSelf: 'flex-start'
    },
    bottomContainer: {
        flex: 1.3,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 2,
        margin: 10,
    }
});

{/* onPress={() => Alert.alert("Watch Trailer!",
                        "Unavailable at the Moment.",
                        [
                            
                            { text: "OK",}
                        ])}> */}

