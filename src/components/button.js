import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native';

const Button = (props) => {
    return (
        <View style={styles(props).buttonContainer}>
            <Text style={styles(props).buttonText}>
                {props.title}
            </Text>
        </View>
    );
};
const styles = (props) => StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: props.buttonColor,
        borderWidth: props.borderWidth,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    buttonText: {
        padding: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: props.textColor,
    },
});
export default Button;