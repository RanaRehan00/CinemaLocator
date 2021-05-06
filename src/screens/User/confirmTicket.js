import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, Alert, ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList, TouchableOpacity,
} from 'react-native';
import Dash from 'react-native-dash';
import Button from '../../components/button.js';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var alreadyBookedMovie = [];
export default function confirmTcket({ route, navigation }) {
  const [state, setState] = useState([]);

  var userId = auth().currentUser.uid;
  var UserName;
  var UserEmail;
  useEffect(() => {
    getUserData();
  })
  const getUserData = async () => {
    const db = firestore().collection("SimpleUser").doc(userId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          UserEmail = doc.data().Email
          UserName = doc.data().Name
          // console.log("Document data:", UserEmail);
          // console.log("Document data:", UserName);

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
  const Bookingkey = route.params.MovieName + userId + route.params.CinemaNameis;
  var DataArray2 = [];
  var bookedseats;

  const Checkduplication = () => {
    const usersCollection = firestore().collection('BookedMovies');
    usersCollection.where('Key', '==', '' + Bookingkey).get()
      .then(
        querySnapshot => {
          // console.log('Total Objects: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            DataArray2.push(documentSnapshot.data())
          }
          )
        }).then(() => {
          alreadyBookedMovie = DataArray2;
          setState();
          console.log("Already booked Movies", alreadyBookedMovie)
          // console.log('outside use effect call', FlatlistData)
        }).then(() => {
          if (alreadyBookedMovie.length == 0) {
            uploadData();
            console.log('not booked previously')
          } else {
           const y = route.params.BookedSeats - alreadyBookedMovie[0].BookedSeats
            const seatsLeft=route.params.AvailableSeats-y
            const data = firestore().collection('Movies');
            data.doc('' + route.params.Key).update({
              AvailableSeats: seatsLeft,
            }).then(() => {
              Alert.alert("Seats Updated!",
                "Your Booking Has been Successfully Updated. Please arrive 15 minutes prior to ShowTime to confirm Seat numbers.",
                [
        
                  { text: "ok", onPress: () => UpdateBookedSeats().then(() => navigation.popToTop()) }
                ])
            }).catch(er => {
              console.log(er)
            })
          }
        })
  }

  const UpdateSeats = async () => {
    const x = route.params.AvailableSeats - route.params.BookedSeats;
    const data = firestore().collection('Movies');
    data.doc('' + route.params.Key).update({
      AvailableSeats: x,
    })
  }
  const UpdateBookedSeats = async () => {
    const data = firestore().collection('BookedMovies');
    data.doc('' + Bookingkey).update({
      BookedSeats: route.params.BookedSeats,
    })
  }
  const uploadData = async () => {
    console.log("Document data:", UserEmail);
    console.log("Document data:", UserName);

    // console.log("availableseats: ",x )
    const Bookingkey = route.params.MovieName + userId + route.params.CinemaNameis;
    const db = firestore().collection('BookedMovies');
    db.doc(Bookingkey).set({
      UserId: userId,
      UserEmail: UserEmail,
      UserName: UserName,
      MoveiId: route.params.Key,
      MovieName: route.params.MovieName,
      ImgLink: route.params.ImgLink,
      Time: route.params.Time,
      Date: route.params.Date,
      CinemaId: route.params.CinemaId,
      CinemaNameis: route.params.CinemaNameis,
      BookedSeats: route.params.BookedSeats,
      Key: Bookingkey,
    }).then(() => {
      Alert.alert("Congragulations!",
        "Your Booking Has been Successfully Recieved. Please arrive 15 minutes prior to ShowTime to confirm Seat numbers.",
        [

          { text: "ok", onPress: () => UpdateSeats().then(() => navigation.popToTop()) }
        ])
    }).catch(error => {
      alert(error)
    })
  }
  return (
    <SafeAreaView style={styles.Flex_1}>
      <View style={styles.mainFlex}>
        <View style={styles.imageFlex}>
          <Image
            // resizeMode={'contain'}
            style={styles.image}
            source={{ uri: route.params.ImgLink }}
          />
        </View>
        <Dash style={styles.dotLine} />
        <View style={styles.detailFlexMainContainer}>
          <View style={styles.movieNameContainer}>
            <Text style={styles.movieNameText}>{route.params.MovieName}</Text>
          </View>
          <View style={styles.cinemaNameContainer}>
            <Text style={styles.cinemaNameText}>{route.params.CinemaNameis}</Text>
          </View>

          <View style={styles.detailContainer} >
            <View style={styles.dateflex}>
              <Text style={styles.detailHeadingtext}>Date</Text>
              <Text style={styles.detailTextDate}>{route.params.Date}</Text>
            </View>
            <View style={styles.timeflex}>
              <Text style={styles.detailHeadingtext}>Time</Text>
              <Text style={styles.detailtextTime}>{route.params.Time}</Text>
            </View>
            <View style={styles.timeflex}>
              <Text style={styles.detailHeadingtext}>seats</Text>
              <Text style={styles.detailtextTime}>{route.params.BookedSeats}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* getUserData().then(()=>uploadData()) */}
      {/* onPress={()=>navigation.navigate('Movies')} */}
      <View style={styles.buttonFlex}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Checkduplication()}>
          <Button title={'Confirm'} buttonColor={'red'} textColor={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );


};

const styles = StyleSheet.create({
  Flex_1: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: -10,
    backgroundColor: 'ghostwhite'
  },
  mainFlex: {
    flex: 9,
    width: '73%',
    backgroundColor: 'white', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,

  },
  imageFlex: {
    flex: 6,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 5,
    borderStyle: 'dotted',
    padding: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 0,

  },
  dotLine: {
    overflow: 'hidden'
  },
  detailFlexMainContainer: {
    flex: 4,
    borderTopWidth: 0,
    borderWidth: 0,
    borderRadius: 5,
    padding: 10,

  },
  movieNameContainer: {
    flex: 2,
  },
  movieNameText: {
    fontWeight: 'bold',
    fontSize: 22,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cinemaNameContainer: {
    flex: 2,
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: 'green',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cinemaNameText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 6,
    flexDirection: 'row',
    paddingTop: 5,

  },
  detailHeadingtext: {
    fontSize: 16
  },
  dateflex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  detailTextDate: {
    fontSize: 13,
    fontWeight: 'bold',
    overflow: 'scroll'

  },
  timeflex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    overflow: 'hidden',

  },
  detailtextTime: {
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonFlex: {
    flex: 1,
    margin: 5,
    width: '70%',
    overflow: 'visible'
  },

});

