import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import Button from './button.js';

const MovieListView = props => {
    return (
        <FlatList
          data={props.data}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) =>
          (
            <TouchableOpacity style={{ flex: 1 }} onPress={props.onpicclick}>
              <View style={styles.mainFlex}>
                <View style={styles.mainContainer}>
                  <View style={styles.imageFlex}>
                    <Image
                      resizeMode={'contain'}
                      style={styles.image}
                      source={{ uri: item.Poster }} />
                  </View>
                  <View style={styles.buttonFlex}>
                    <TouchableOpacity onPress={props.onbuttonclick}>
                      <Button title={'Reserve Now'} />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
          )}
        />
    );
};
const styles = StyleSheet.create({
    mainFlex: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        width: "95%",
        borderRadius: 20,
        backgroundColor: 'ghostwhite',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    
      },
      imageFlex: {
        flex: 8,
        height: "100%",
      },
      image: {
        height: '100%',
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 10,
        margin: 5
    
      },
      buttonFlex: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
      },
      
});
export default MovieListView;