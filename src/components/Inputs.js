import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors, Constants, Fonts } from "../utils";

const TaskInput = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <View style={[styles.container,
            focus ? styles.focused: styles.notFocused]}>
            <TextInput 
                returnKeyLabel={props.returnKeyLabel}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={text => props.onChangeText(text)}
                autoCapitalize={props.autoCapitalize}
                setFocus={focus}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                style={[styles.input, props.style]}
            />
        </View>
    )
    
};

const SecondInput = (props) => {
    return (
        <View >
            <TextInput 
                placeholder={props.placeholder}
                value={props.value}
                autoFocus={true}
                autoCorrect={false}
                autoCapitalize={props.autoCapitalize}
                onChangeText={text => props.onChangeText(text)}
                style={[styles.input, props.style]}
                secureTextEntry={props.secureTextEntry}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    focused: {
        fontFamily: Fonts.Semi_Bold_Font,
        fontSize: 12,
        color: Colors.Gray,
        backgroundColor: Colors.White,
        borderColor: Colors.Green_Border,
        borderWidth: 1,
    },
    textInput: {
        borderRadius: 5,
        paddingLeft: 15,
        fontFamily: Fonts.Regular_Font,
        width: 290
    },
    notFocused: {
        fontFamily: Fonts.Regular_Font,
        fontSize: 12,
        color: Colors.Gray,
        backgroundColor: Colors.Background_Gray
    },
    container: {
        flexDirection: Constants.row,
        borderRadius: 20,
        justifyContent: Constants.center,
        padding: 3,
        alignItems: Constants.center,
        height: 50,
        marginHorizontal: 24
    },
        
    input: {
        marginHorizontal: 10,
    }
})

export { TaskInput, SecondInput };
