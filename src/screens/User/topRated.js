import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, StyleSheet, Text, Image, View,Alert, FlatList, TouchableOpacity,
} from 'react-native';
import Button from '../../components/button.js';
import Header from '../../components/Header';
import cinemaHomeScreen from '../Cinema/cinemaHomeScreen.js';

//firebase auth functions
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationEvents } from 'react-navigation'

var FlatlistData = [];

export default function topRated({ route, navigation }) {
  const [state, setState] = useState([]);
  var DataArray = [];
  useEffect(() => {
    // console.log("useffect")
    const usersCollection = firestore().collection('Movies');
    usersCollection.get()
      .then(
        querySnapshot => {
          // console.log('Total Objects: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            DataArray.push(documentSnapshot.data())
          })
        })
      .then(() => {
        FlatlistData = DataArray;
        setState();
        // console.log('Final Flatlist Array: ', FlatlistData)

      })

  })





  const Logoff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then((navigation.reset({
        index: 0,
        routes: [{ name: 'entryscreen' }],
      })));
  }

  //Navigation constants for header buttons
  const searchPage = React.useCallback(() => {
    navigation.navigate('Search Movie');
  });
  const bookedTicketPage = React.useCallback(() => {
    navigation.navigate('Booked Tickets');
  });
  const Logout = React.useCallback(() => {
    navigation.navigate('entryscreen');
  });
  const getUid = () => {
    const user = auth().currentUser.uid;
    console.log(user);
  }


  return (
    <SafeAreaView style={styles.Flex_1}>
      <Header title="Top Movies" ticketsButton={bookedTicketPage} menuButton={ ()=>{Alert.alert("Are you sure!",
        "Press Logout to continue.",
        [
          { text: "Cancel", onPress: () =>  console.log("canceled")},
          { text: "Logout", onPress: () => Logoff() }
        ])} }/>
      <View style={styles.bodyFlex}>
        <FlatList
          data={FlatlistData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.Key}
          numColumns={1}
          renderItem={({ item }) =>
          (
            <View style={styles.mainFlex}>
              <TouchableOpacity
                activeOpacity={0}
                style={styles.Flex_1}
                onPress={() =>
                  navigation.navigate('Movie Detail',
                    {
                      nextPage: "Select Cinema",
                      ImgLink: item.ImgLink,
                      MovieName: item.MovieName,
                      ReleaseYear: item.ReleaseYear,
                      Description: item.Description,
                      Trailer: item.TrailerLink,
                      CinemaId: item.CinemaId,
                      CinemaNameis: item.CinemaNameForThisMovie,
                      Time: item.Time,
                      Date: item.Date,
                      AvailableSeats: item.AvailableSeats,
                      Key:item.Key,
                    })}
              >
                <View style={styles.mainContainer}>
                  <View style={styles.imageFlex}>
                    <Image
                      style={styles.image}
                      resizeMode={'contain'}
                      source={{ uri: item.ImgLink }} />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate('Movie Detail',
                          {
                            nextPage: "Select Cinema",
                            ImgLink: item.ImgLink,
                            MovieName: item.MovieName,
                            ReleaseYear: item.ReleaseYear,
                            Description: item.Description,
                            Trailer: item.TrailerLink,
                            CinemaId: item.CinemaId,
                            Time: item.Time,
                            Date: item.Date,
                            AvailableSeats: item.AvailableSeats,
                            Key:item.Key,
                          })}>
                      <Button title={'Reserve Now'} buttonColor={'red'} textColor={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );


};

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
    flexDirection: 'row',
    margin: 5,
    width: "95%",
    borderRadius: 20,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",

  },
  imageFlex: {
    flex: 8,
    height: "100%",
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});




/*async getMarkers() {
  const events = await firebase.firestore().collection('events')
  events.get().then((querySnapshot) => {
      const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      console.log(tempDoc)
    })
  }  */


// uerySnapshot.forEach(documentSnapshot => {
  //   return querySnapshot.docs[0].ref.collection('MoviesPlayingNow').get()
  // }).then(querySnapshot => {
//   querySnapshot.forEach(documentSnapshot => {
//     //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//     DataArray.push(documentSnapshot.data())
//   })
// })



  // querySnapshot.forEach(querySnapshot => {
          //   return querySnapshot.docs[0].ref.collection('MoviesPlayingNow').get()
          //   .then(querySnapshot => {
          //   querySnapshot.forEach(documentSnapshot => {
          //     //    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          //     DataArray.push(documentSnapshot.data())
          //   })})
          // })})

          // console.log('Total Objects: ', querySnapshot.size);

