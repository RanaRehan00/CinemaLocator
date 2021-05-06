import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, Alert, ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList, TouchableOpacity,
} from 'react-native';
import Button from '../../components/button.js';


//local imports
import Background from '../../components/Background'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import BackButton from '../../components/BackButton'

//firebase auth functions
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var BookedMovies = [];
// var UserDetail = [];


export default function bookedTickets({ navigation }) {
  const [state, setState] = useState([]);
  var DataArray = [];
  var UID;
  var totalObj;
  useEffect(() => {
    UID = auth().currentUser.uid
    // console.log('id', UID)
    const usersCollection = firestore().collection('BookedMovies');
    usersCollection.where('UserId', '==', '' + UID).get()
      .then(
        querySnapshot => {
          // totalObj=querySnapshot.size;
          querySnapshot.forEach(documentSnapshot => {
            //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            DataArray.push(documentSnapshot.data())
          }
          )
        }).then(() => {
          BookedMovies = DataArray;
          // console.log('flatlistArray:', BookedMovies)
          setState();
          // console.log('outside use effect call', FlatlistData)
        })

    // var CompareWith;
    // const usersCollection = firestore().collection('BookedMovies');
    // usersCollection.where('UserId', '==', '' + UID).get()
    //   .then(
    //     querySnapshot => {
    //       // console.log('Total Objects: ', querySnapshot.size);
    //       querySnapshot.forEach(documentSnapshot => {
    //         //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //         DataArray.push(documentSnapshot.data())
    //       }
    //       )
    //     }).then(() => {
    //       UserDetail = DataArray;
    //       console.log('flatlistArray:', UserDetail)
    //       setState();
    //       // console.log('outside use effect call', FlatlistData)
    //     })

  })
  const deleteMovie = async (deleteMovieKey, seats, keyToUpdateTotalSeats) => {
    var newSeats;
    const db = firestore().collection('BookedMovies');
    db.doc('' + deleteMovieKey).delete()
      .then(async () => {
        const db = await firestore().collection('Movies').doc('' + keyToUpdateTotalSeats).get();
        if (db.exists) {
          // console.log('No such document!');
          const avialbleseats = db.data().AvailableSeats
          console.log('Document data:', avialbleseats);
          newSeats = avialbleseats + seats;
        }
      }).then(async () => {
        console.log("new seats wiil be", newSeats)
        const db2 = await firestore().collection('Movies')
          .doc('' + keyToUpdateTotalSeats).update({
            AvailableSeats: newSeats,
          })


      })
      .then(() => Alert.alert("Successful!",
        "Movie Booking Canceled",
        [

          { text: "ok", onPress: () => navigation.goBack() }
        ])

      ).catch(error => {
        alert(error)
      })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Movies Currently Booked</Header>
      <FlatList
        style={{ marginLeft: -40, marginRight: -40 }}
        horizontal={true}
        data={BookedMovies}
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
                  <Text style={styles.detailHeadingtext}><Text style={styles.detailHeading_text}>{item.CinemaNameis}</Text></Text>
                </View>
                <View style={styles.timeflex}>
                  <Text style={styles.detailHeadingtext}>Date:{item.Date}</Text>
                </View>
                <View style={styles.timeflex}>
                  <Text style={styles.detailHeadingtext}>Time:{item.Time}</Text>
                </View>
                <View style={styles.timeflex}>
                  <Text style={styles.detailHeadingtext}>Seats Booked:{item.BookedSeats}</Text>
                </View>
              </View>
              <ButtonLogin mode="contained" onPress={() => { Alert.alert("Are you sure!",
        "Press yes to cancel your booked Movie.",
        [

          { text: "No", onPress: () =>  console.log("canceled")},
          { text: "Yes", onPress: () => deleteMovie(item.Key, item.BookedSeats, item.MoveiId) }
        ]) }}>
                Cancel Booking
              </ButtonLogin>
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
  );


};

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
  detailHeading_text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  timeflex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

