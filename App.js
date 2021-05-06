import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import userHomeScreen from "./src/screens/User/userHomeScreen.js";
import TopRated from "./src/screens/User/topRated.js";
import Cinema from "./src/screens/User/cinemas.js";
import searchMovie from "./src/screens/User/searchMovie.js";
import bookedTickets from "./src/screens/User/bookedTickets.js";
import selectCinema from "./src/screens/User/selectCinema.js";
import movieDetail from "./src/screens/User/movieDetail.js";
import confirmTcket from "./src/screens/User/confirmTicket.js";
import selectSeats from "./src/screens/User/selectSeats.js";
import searchCinema from "./src/screens/User/searchCinema.js";
import cinemaHomeScreen from './src/screens/Cinema/cinemaHomeScreen.js';
import Bookings from './src/screens/Cinema/Bookings.js';
//login imports
import { Provider } from 'react-native-paper'
import { theme } from './src/core/theme'
import {WelcomeScreen,
  StartScreen,
  LoginScreen,
  CinemaSignup, 
  ResetPasswordScreen,
  UserSignup,
  CinemaAdditionalInfo,
} from './src/screens/Login'
import AddMovie from './src/screens/Cinema/AddMovie.js';
import AddMovieDetail from './src/screens/Cinema/AddMovieDetail.js';
import ViewAddedMovies from './src/screens/Cinema/ViewAddedMovies.js';
import CienmaViewBooking from './src/screens/Cinema/CinemaViewBookings.js';
import Cinema_Movies from './src/screens/User/cinema_Movies.js';

const Stack = createStackNavigator()

function StartStack() {
  return (
    <Provider theme={theme}>
    <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false,}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      <Stack.Screen name="CinemaSignup" component={CinemaSignup} />
      <Stack.Screen name="CinemaAdditionalInfo" component={CinemaAdditionalInfo} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    </Stack.Navigator>
    </Provider>
  );
}


function SimpleUserStack() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }} initialRouteName="Movies">
      <Tab.Screen name="Movies" component={userHomeStackScreen}
        options={{
          tabBarIcon: ({ size }) => (<Image source={require('./src/icons/movie.png')
          }
            style={{
              width: size,
              height: size,
            }}
          />)
        }}
      />
      <Tab.Screen name="Top Rated" component={TopRatedStackScreen} options={{
        tabBarIcon: ({ size }) => (<Image source={require('./src/icons/topmovies.png')
        }
          style={{
            width: size,
            height: size,
          }}
        />)
      }} />
      <Tab.Screen name="Cinemas" component={CinemaStackScreen} options={{
        tabBarIcon: ({ size }) => (<Image source={require('./src/icons/cinema.png')
        }
          style={{
            width: size,
            height: size,
          }}
        />)
      }} />
    </Tab.Navigator>
  );
}

function userHomeStackScreen() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Movies" component={userHomeScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="Booked Tickets" component={bookedTickets } options={{ headerShown: false, }}/>
      {/* <Stack.Screen name="Search Movie" component={searchMovie} /> */}
      <Stack.Screen name="Movie Detail" component={movieDetail} />
      <Stack.Screen name="Select Cinema" component={selectCinema} />
      <Stack.Screen name="Select Seats" component={selectSeats} />
      <Stack.Screen name="Confirm Ticket" component={confirmTcket} />
    </Stack.Navigator>
  );
}

function CinemaStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cinemas" component={Cinema} options={{ headerShown: false, }} />
      <Stack.Screen name="Booked Tickets" component={bookedTickets } options={{ headerShown: false, }}/>
      {/* <Stack.Screen name="Search Cinema" component={searchCinema} /> */}
      <Stack.Screen name="Movies Playing Now!" component={Cinema_Movies}/>
      {/* <Stack.Screen name="Movie Detail" component={movieDetail} /> */}
      <Stack.Screen name="Select Seats" component={selectSeats} />
      <Stack.Screen name="Confirm Ticket" component={confirmTcket} />
    </Stack.Navigator>
  );
}
function TopRatedStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Top Rated Movies" component={TopRated} options={{ headerShown: false, }} />
      <Stack.Screen name="Booked Tickets" component={bookedTickets } options={{ headerShown: false, }}/>
      <Stack.Screen name="Select Cinema" component={selectCinema} />
      <Stack.Screen name="Select Seats" component={selectSeats} />
      <Stack.Screen name="Movie Detail" component={movieDetail} />
      <Stack.Screen name="Confirm Ticket" component={confirmTcket} />

    </Stack.Navigator>
  );
}


function CinemaUserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false,}}>
      <Stack.Screen name="Cinema Home" component={cinemaHomeScreen}/>
      <Stack.Screen name="AddMovie" component={AddMovie} />
      <Stack.Screen name="AddMovieDetail" component={AddMovieDetail} />
      <Stack.Screen name="ViewAddedMovies" component={ViewAddedMovies} />
      <Stack.Screen name="ViewBookings" component={CienmaViewBooking} />
    </Stack.Navigator>
  )
}



const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="entryscreen">
        <Stack.Screen name="entryscreen" component={StartStack} options={{ headerShown: false }} />
        <Stack.Screen name="SimpleUser" component={SimpleUserStack} options={{ headerShown: false }} />
        <Stack.Screen name="CinemaUser" component={CinemaUserStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
