import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native'
import { Text } from 'react-native-paper'
//Local Imports
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
import { nameValidator } from '../../helpers/nameValidator'
//firebase auth functions
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '884219733010-6u7g0kj2c4gd453084dgorkjip4ihkq1.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default function UserSignup({ route, navigation }) {
 //Next Page Route
  const Continue = () => {
    (navigation.reset({
      index: 0,
      routes: [{ name: route.params.userType }],
    }))
  }

//The type of user selected at the time of signup
var userId;
var currentUserType;

const CheckType = async () => {
  userId = auth().currentUser.uid
  const CinemaCheck = await firestore().collection('CinemaUser').doc(userId).get()
  const UserCheck = await firestore().collection('SimpleUser').doc(userId).get()
if(UserCheck.exists){
  currentUserType = UserCheck.data().UserType
  if (currentUserType == "SimpleUser") {
    navigation.navigate("SimpleUser")
  }else if (!UserCheck.exists && !CinemaCheck.exists) {
    Alert.alert("New SignUp!",
        "Press Continue to Register as a Simple User. Note:(You won't be able to change type in future!)",
        [
          { text: "Cancel",},
          { text: "Continue", onPress: () =>  UploadGoogleDataToFirestore()}
        ])
    
  }
}else 
  if (CinemaCheck.exists) {
    currentUserType = CinemaCheck.data().UserType
    if (currentUserType == "CinemaUser") {
      navigation.navigate("CinemaUser")
    }
  } else if (!UserCheck.exists && !CinemaCheck.exists) {
    Alert.alert("New SignUp!",
        "Press Continue to Register as a Simple User. Note:(You won't be able to change type in future!)",
        [
          { text: "Cancel",},
          { text: "Continue", onPress: () =>  UploadGoogleDataToFirestore()}
        ])
    
  }
}

const UploadGoogleDataToFirestore = () => {
  userId = auth().currentUser;
  const db = firestore().collection('SimpleUser');
  db.doc(userId.uid).set({
    UserType: 'SimpleUser',
    Name: userId.displayName,
    Email: userId.email,
    UserId: userId.uid,
  }).then(() => {
    Alert.alert("Congragulations!",
      "Your Account has been created as Simple User Successfully.",
      [

        { text: "ok", onPress: () =>navigation.navigate('SimpleUser') }
      ])
  }).catch(error => {alert(error);})
}



  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    CreateUser();
  }
  //firebase Handling
  var user="";
  var userName='';
  const UploadDataToFirestore = () => {
    user = auth().currentUser;
    if(user.displayName!=null){
      userName=user.displayName;
    }
    const db = firestore().collection('SimpleUser');
    db.doc(user.uid).set({
      UserType: route.params.userType,
      Name: userName,
      Email: user.email,
      UserId: user.uid,
    }).then(() => {
      Alert.alert("Congragulations!",
        "Your Account has been created Successfully.",
        [

          { text: "ok", onPress: () => Continue() }
        ])
    })
  }

  const CreateUser = () => {
    auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        userName=name.value;
        UploadDataToFirestore();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmail({ ...email, error: "Email already registered" })
          return
        }
        if (error.code === 'auth/invalid-email') {
          setEmail({ ...email, error: "Email is invalid" })

          return
        }
        alert(error);
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create User Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email(e.g name@gmail.com)"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <ButtonLogin
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </ButtonLogin>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text>or Signup with</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onGoogleButtonPress().then(()=> CheckType())}>
          <Image source={require('../../assets/google.png')} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => onFacebookButtonPress().then(()=> UploadDataToFirestore())}>
          <Image source={require('../../assets/facebook.png')} />
        </TouchableOpacity> */}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
