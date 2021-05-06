import * as React from 'react';
//Local imports
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Login/Header'
import BackButton from '../../components/BackButton'
import ButtonLogin from '../../components/Login/Button'
import Paragraph from '../../components/Paragraph'


export default function StartScreen({ navigation }) {
  const UserSignupPress = () => {
    navigation.navigate('UserSignup', { userType: 'SimpleUser' })
  }
  const CinemaSignupPress = () => {
    navigation.navigate('CinemaSignup', { userType: 'CinemaUser' })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Cinema Locator</Header>
      <Paragraph>
        Providing with a single platform for both Fans and the Providers
      </Paragraph>
      <ButtonLogin
        mode="contained"
        onPress={() => UserSignupPress()}
      >
        Signup as a User
      </ButtonLogin>
      <ButtonLogin
        mode="outlined"
        onPress={() => CinemaSignupPress()}
      >
        Signup as a Cinema
      </ButtonLogin>
    </Background>
  )
}

// may be reuired code


 // const LoginSimpleUser = () => {
  //   const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   }
  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber;
  //   }, []);
  //   if (initializing) return null;
  //   if (!user) {
  //     return (
  //       () => {
  //         //User not Loged In
  //         navigation.navigate('LoginScreen', { userType: 'SimpleUser' })
  //         return
  //       }
  //     );
  //   }
  //   return (
  //     //User already Loged In.
  //     //getting the type of user loged.
  //     async () => {
  //       userId = auth().currentUser.uid
  //       const currentuser = await firestore()
  //         .collection('users')
  //         .doc(userId)
  //         .get()
  //       if (currentuser.data().userType == "SimpleUser") {
  //         navigation.navigate(currentuser.data().userType,{userId: userId})
  //         // console.log("success")
  //       } else {
  //         return (alert("Cinema User Loged in right now"))
  //       }
  //       return
  //     }
  //   );
  // }

  // const LoginCinemaUser = () => {
  //   const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   }
  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber;
  //   }, []);
  //   if (initializing) return null;
  //   if (!user) {
  //     return (
  //       () => {
  //         //User not Loged In
  //         navigation.navigate('LoginScreen', { userType: 'CinemaUser' })
  //         return
  //       }
  //     );
  //   }
  //   return (
  //     //User already Loged In.
  //     //getting the type of user loged.
  //     async () => {
  //       userId = auth().currentUser.uid
  //       const currentuser = await firestore()
  //         .collection('users')
  //         .doc(userId)
  //         .get()
  //       if (currentuser.data().userType == "CinemaUser") {
  //         navigation.navigate(currentuser.data().userType,{userId: userId})
  //         // console.log("success")
  //       } else {
  //         return (alert("Simple User Loged in right now"))
  //       }
  //       return
  //     }
  //   );
  // }