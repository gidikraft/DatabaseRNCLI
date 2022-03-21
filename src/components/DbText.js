import React from 'react';
import { StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../utils";

const CustomText = (props) => (
    <Text 
        style={[styles.headerText, props.style]}
        onPress={props.onPress}
    >
        {props.caption}
    </Text>
)

const styles = StyleSheet.create({
    headerText: {
        color: Colors.Black,
        fontFamily: Fonts.Bold_Italic_Font,
    }
})

export { CustomText }