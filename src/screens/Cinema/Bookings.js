import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

export default function Bookings({  navigation }) {
    const usersCollection = firestore().collection('users');

    const adduser=()=>
 {usersCollection.add({
    name:'abc',
    age:20
  });
  alert('added');
 };
    return(
        <View>
           <TouchableOpacity onPress={()=>adduser()}>
          <Text style={{fontSize:40}}>add user</Text>
        </TouchableOpacity>
            
        </View>
    );
};
const styles = StyleSheet.create({
   
});