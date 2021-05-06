import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Alert } from 'react-native'
import { Text } from 'react-native-paper'
//local imports
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Login/Header'
import ButtonLogin from '../../components/Login/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import { emailValidator } from '../../helpers/emailValidator'
import { passwordValidator } from '../../helpers/passwordValidator'
//Firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';


GoogleSignin.configure({
  webClientId: '884219733010-6u7g0kj2c4gd453084dgorkjip4ihkq1.apps.googleusercontent.com',
});
//Google Sign In
async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}



//Facebook Sign In
async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
    //open the waring here
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
    //open alert open

  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}


export default function LoginScreen({ route, navigation }) {
  //The type of user selected at the time of signup
  var userId;
  var currentUserType;

  const CheckType = async () => {
    userId = auth().currentUser.uid
    const CinemaCheck = await firestore().collection('CinemaUser').doc(userId).get()
    const UserCheck = await firestore().collection('SimpleUser').doc(userId).get()
    if (UserCheck.exists) {
      currentUserType = UserCheck.data().UserType
      if (currentUserType == "SimpleUser") {
        navigation.navigate("SimpleUser")
      } 
    }else 
      if (CinemaCheck.exists) {
        currentUserType = CinemaCheck.data().UserType
        if (currentUserType == "CinemaUser") {
          navigation.navigate("CinemaUser")
        }
      }else if (!UserCheck.exists && !CinemaCheck.exists) {
        Alert.alert("New Login!",
            "Press Continue to Register as a Simple User or press Change for Cinema User. Note:(You won't be able to change type in future!)",
            [
              { text: "Change to Cinema User", onPress: () =>  navigation.navigate('CinemaAdditionalInfo')},
              { text: "Continue", onPress: () =>  UploadDataToFirestore()}
            ])
        
      }
  }

  const UploadDataToFirestore = () => {
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

          { text: "ok", onPress: () => navigation.navigate('SimpleUser') }
        ])
    }).catch(error => { alert(error); })
  }
  //Simple Email Login
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const LoginPress = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        CheckType()
      }
      )
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          setPassword({ ...email, error: "Incorrect Password" })
          return
        }
        if (error.code === 'auth/user-not-found') {
          setEmail({ ...email, error: "user not found" })
          return
        }
        if (error.code === 'auth/invalid-email') {
          setEmail({ ...email, error: "That email address is invalid!" })
          return
        }
        alert(error);
      });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
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
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
        // onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}
      <ButtonLogin mode="contained" onPress={LoginPress}>
        Login
      </ButtonLogin>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('StartScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text>or Login with</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => CheckType())}>
          <Image source={require('../../assets/google.png')} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => onFacebookButtonPress().then(() => CheckType())}>
          <Image source={require('../../assets/facebook.png')} />
        </TouchableOpacity> */}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
