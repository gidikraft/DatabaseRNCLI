import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Constants } from '../utils';

const BlueButton = (props) => (
    <View>
        <TouchableOpacity style={[ styles.blueButtonContainer , props.style]} onPress={props.onPress}>
            <Text style={styles.buttonCaption}>{props.caption || "BUTTON"}</Text>
        </TouchableOpacity>
    </View>
);

const WhiteButton = (props) => (
    <View >
        <TouchableOpacity style={[styles.whiteButtonContainer, props.style]} onPress={props.onPress}>
            <Text style={styles.buttonCaption}>{props.caption || "BUTTON"}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    blueButtonContainer: {
        backgroundColor: Colors.Blue,
        justifyContent: Constants.center,
        alignItems: Constants.center,
        alignContent: Constants.center,
        marginHorizontal: 24,
        borderRadius: 10,
        height: 48,
    },
    buttonCaption: {
        color: Colors.White,
        fontSize: 18,
        fontWeight: Constants.bold,
        // textAlign: 'center',
        
    },
    whiteButtonContainer: {
        backgroundColor: Colors.Green,
        justifyContent: Constants.center,
        alignItems: Constants.center,
        alignContent: Constants.center,
        marginHorizontal: 24,
        marginVertical: 24,
        borderRadius: 10,
        height: 48,
    },
})

export { BlueButton, WhiteButton };