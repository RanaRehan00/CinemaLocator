import { useState, useEffect } from 'react'
import * as React from 'react';
//Local imports
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import Paragraph from '../../components/Paragraph'
//firebase auth functions
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function WelcomeScreen({ navigation }) {
  var userId = ""
  var currentUserType="";
 
  const LoginPress=()=>{
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);
    if (initializing) return null;
    if (!user) {
      return (
        () => {
          //User not Loged In
          navigation.navigate('LoginScreen')
          return
        }
      );
    }
    return (
      //User already Loged In.
      //getting the type of user loged.
      async()=>{
      userId = auth().currentUser.uid
      const currentuser =await firestore()
        .collection('CinemaUser').doc(userId).get()
        if(currentuser.exists){
        currentUserType=currentuser.data().UserType
        if (currentUserType == "CinemaUser") {
          navigation.navigate("CinemaUser",{UserId:userId})
        }} else{
          navigation.navigate("SimpleUser")
        }
        }          
    )
  }

  const SignupPress=()=>{
    navigation.navigate('StartScreen')
    return
  }

  return (
    <Background>
          <Logo />
      <Header>Cinema Locator App</Header>
      <Paragraph>
         Book a Movie Now At your fingertips!
      </Paragraph>
      <ButtonLogin
        mode="contained"
        onPress={LoginPress()}
      >
        Login!
      </ButtonLogin>
      <ButtonLogin
        mode="outlined"
        onPress={()=>SignupPress()}
      >
        Signup!
      </ButtonLogin>
     
    </Background>
  )
}
