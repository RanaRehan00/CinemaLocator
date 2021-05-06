import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';

const Header = props => {
    return (
        <View style={styles.header}>
        {/* <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={props.searchButton}>
            <View>
              <Image source={require('../icons/search.png')} />
            </View>
          </TouchableOpacity>
        </View> */}
        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={props.ticketsButton}>
            <View>
              <Image source={require('../icons/tickets.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logoFlex}>
          <Text style={styles.logo}>{props.title}</Text>
        </View>
        <View style={styles.buttonFlex}>
          <TouchableOpacity onPress={props.menuButton}>
            <View>
              <Image source={require('../icons/logout.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
};
const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    
      },
      body: {
        flex: 9,
      },
      buttonFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
      },
      logoFlex: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        fontSize: 22,
        fontWeight: 'bold',
      },
});
export default Header;