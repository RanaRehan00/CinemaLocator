import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, Alert,ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList, TouchableOpacity,
} from 'react-native';
import Button from '../../components/button.js';


export default function selectSeats({ route, navigation }) {
    const [count, setCount] = useState(1);
    useEffect(
        ()=>{
            if(route.params.AvailableSeats<1){
                setCount(0);
                Alert.alert("Sorry!",
              "No more Seats Available. Theatre is Fully Booked!",
              [
                { text: "ok", onPress: () =>navigation.goBack() }
              ])
            }
        }
    )
    const sub = () => {
        if (count > 1) return setCount(count - 1);
    }
    const add = () => {
        if (count < route.params.AvailableSeats) {
            return setCount(count + 1)
        }else{
            Alert.alert("Sorry!",
              "No more Seats Available. Theatre is Fully Booked!",
              [
                { text: "ok" }
              ])
            // alert("No more Seats Available. Theatre Fully Booked!");
        }
    }
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
            <View style={styles.selectHeadingFlex}>
                <Text style={styles.selectHeadingText}>Select total Seats</Text>
            </View>
            <View style={styles.workingFlex}>
                <TouchableOpacity style={styles.subFlex} onPress={sub}>
                    <Text style={styles.addStyle}>-</Text>
                </TouchableOpacity>

                <View style={styles.two}>
                    <Text style={styles.numberStyle}>{count}</Text>
                </View>

                <TouchableOpacity style={styles.addFlex} onPress={add}>
                    <Text style={styles.addStyle}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonFlex}>
                <TouchableOpacity
                    activeOpacity={0}
                    onPress={() => {
                        navigation.navigate('Confirm Ticket', {
                            ImgLink: route.params.ImgLink,
                            MovieName: route.params.MovieName,
                            ReleaseYear: route.params.ReleaseYear,
                            Description: route.params.Description,
                            Trailer: route.params.TrailerLink,
                            CinemaId: route.params.CinemaId,
                            CinemaNameis: route.params.CinemaNameis,
                            Time: route.params.Time,
                            Date: route.params.Date,
                            AvailableSeats: route.params.AvailableSeats,
                            Key: route.params.Key,
                            BookedSeats: count,
                        })
                    }}>
                    <Button title={'Done'} buttonColor={'red'} textColor={'white'} />
                </TouchableOpacity>
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

    selectHeadingFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'mintcream',
    },
    selectHeadingText: {
        color: 'black',
        fontSize: 21,
        fontWeight: 'bold',
    },
    workingFlex: {
        flex: 5,
        backgroundColor: 'lavender',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        height: '40%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    two: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '50%'
    },
    numberStyle: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    addFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        height: '40%',
        marginLeft: '5%',
        marginRight: '5%'
    },
    addStyle: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },


    buttonFlex: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        margin: 5,
        width: '70%',

        overflow: 'visible'
    },
});

