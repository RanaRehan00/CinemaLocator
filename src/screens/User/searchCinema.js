import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList, TouchableOpacity,
} from 'react-native';
import Button from '../../components/button.js';

const Data = [
  {
    "id": "1",
    "Title": "Godzilla vs. Kong",
    "Year": "2021",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },
  {
    "id": "2",
    "Title": "Ava",
    "Year": "2020",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTMzMTg1MjgtOWNhYy00NmZmLWExOTctMjA2OTZhZDFkNDhhXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },


  {
    "id": "3",
    "Title": "Bloodshot",
    "Year": "2020",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYjA5YjA2YjUtMGRlNi00ZTU4LThhZmMtNDc0OTg4ZWExZjI3XkEyXkFqcGdeQXVyNjUyNjI3NzU@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },
  {
    "id": "4",
    "Title": "Venom",
    "Year": "2018",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },
  {
    "id": "5",
    "Title": "Doctor Sleep",
    "Year": "2019",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYmY3NGJlYTItYmQ4OS00ZTEwLWIzODItMjMzNWU2MDE0NjZhXkEyXkFqcGdeQXVyMzQzMDA3MTI@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },
  {
    "id": "6",
    "Title": "Baywatch",
    "Year": "2017",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNTA4MjQ0ODQzNF5BMl5BanBnXkFtZTgwNzA5NjYzMjI@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },
  {
    "id": "7",
    "Title": "My Spy",
    "Year": "2020",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzMyOWRjYjUtMjc2OC00MWUyLWEzODktYWZlZDYxYjk4MDViXkEyXkFqcGdeQXVyODE0OTU5Nzg@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },
  {
    "id": "8",
    "Title": "Black Panther",
    "Year": "2018",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg",
    "Time": "10:30 PM",
    "Day": "Mon",
    "Month": "April",
    "Year": "2021",
    "Date": "19",
    "Cinema": "Scope Cinema",
  },

];


export default function searchCinema({ navigation }) {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>search</Text>
    </SafeAreaView>
  );


};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'mintcream',

  },
  body: {
    flex: 9,

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
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    width: "95%",
    borderRadius: 20,
    backgroundColor: 'white',
  },
  mainContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    // height:"30%"
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5

  },
  buttonContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    backgroundColor: 'red',
    margin: 10
  },
  button: {
    padding: 7,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
});

