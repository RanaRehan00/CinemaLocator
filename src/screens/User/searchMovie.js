import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, Image, View, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Button from '../../components/button.js';


export default function searchMovie({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const updateArray=()=>{
console.log("value",searchQuery)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Searchbar
      placeholder="Search Movie"
      onChangeText={onChangeSearch().then(updateArray())}
      value={searchQuery}
    />
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

