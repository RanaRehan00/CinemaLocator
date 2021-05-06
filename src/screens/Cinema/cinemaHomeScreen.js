import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,Alert, StyleSheet, Text, Image, View, FlatList, TouchableOpacity, TouchableHighlightBase,
} from 'react-native';
import Header from '../../components/Login/Header';
import Background from '../../components/Background'
import ButtonLogin from '../../components/Login/Button'
import Logo from '../../components/Logo'
import Paragraph from '../../components/Paragraph'
import DoubleTapToClose from '../../helpers/doubleTapToClose';


//firebase
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';


export default function cinemaHomeScreen({ route,navigation }) {
  
  // state={
  //   user:{
  //     name:""
  //   }
  // }
  // constructor=(props)=>{

  //   this.getUser();
  //   this.subscriber= firestore().collection("users").doc
  //   ('lMXFCBrX6b8Vcl0EG4nX').onSnapshot(doc=>{
  //     this.setState({
  //       user:{
  //         name: doc.data().name
  //       }
  //     })
  //   })
  // }
  // getUser = async()=>{
  //   const userDocument= await firestore().collection("users").
  //   doc('lMXFCBrX6b8Vcl0EG4nX').get()
  //   console.log(userDocument)
  // }

  const userId = auth().currentUser.uid;
  // console.log(userId)

  const AddMoviePressed=()=>{
    navigation.navigate('AddMovie',{userId: userId});
  }
  const ViewMoviesPressed=()=>{
  navigation.navigate('ViewAddedMovies',{userId: userId});
}
const ViewBookingsPressed=()=>{
  navigation.navigate('ViewBookings',{userId: userId});
}
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
    <Background>
      <DoubleTapToClose />
          <Logo />
          <Header>Start Right Away!</Header>
          <Paragraph></Paragraph>
          <ButtonLogin
            mode="contained"
            onPress={() => AddMoviePressed()}
          >
            Add A Movie
      </ButtonLogin>
          <ButtonLogin
            mode="outlined"
            onPress={() => ViewMoviesPressed()}
          >
            Manage Added Movies
      </ButtonLogin>
          <ButtonLogin
            mode="outlined"
            onPress={() => ViewBookingsPressed()}
          >
            View bookings
      </ButtonLogin>
          <ButtonLogin
            mode="contained"
            onPress={()=>{Alert.alert("Are you sure!",
            "Press Logout to continue.",
            [
              { text: "Cancel", onPress: () =>  console.log("canceled")},
              { text: "Logout", onPress: () => Logoff() }
            ])}}
          >
            logout
      </ButtonLogin>
        </Background>
    // <SafeAreaView style={styles.Flex_1}>
      /* <View style={styles.header}>
        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Bookings')
          }}>
            <View>
              <Image source={require('../../icons/tickets.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logoFlex}>
          <Text style={styles.logo}>Cinema Home</Text>
        </View>
        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={(Logoff)}
          >
            <View>
              <Image source={require('../../icons/logout.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View> */
      /* <View style={styles.bodyFlex}> */
        

      /* </View> */
    /* </SafeAreaView> */
  );


};

const styles = StyleSheet.create({

  Flex_1: {
    flex: 1
  },
  bodyFlex: {
    flex: 9,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',

  },

  buttonFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2
  },
  logoFlex: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
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

});

