import React, { useState } from "react";
import { View, TextInput, StyleSheet,  } from "react-native";

const TaskInput = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <View style={[styles.container,
            focus ? styles.focused: styles.notFocused]}>
            <TextInput 
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={text => props.onChangeText(text)}
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
                autoCapitalize="none"
                onChangeText={text => props.onChangeText(text)}
                style={[styles.input, props.style]}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    focused: {
        // fontFamily: Font.INTER_SEMIBOLD,
        fontSize: 12,
        color: 'gray',
        backgroundColor: 'white',
        borderColor: '#16f0b2',
        borderWidth: 1,
    },
    textInput: {
        borderRadius: 5,
        paddingLeft: 15,
        // fontFamily: Font.INTER_REGULAR,
        width: 290
    },
    notFocused: {
        // fontFamily: Font.INTER_REGULAR,
        fontSize: 12,
        color: 'gray',
        backgroundColor: '#e1e8e6'
    },
    container: {
        flexDirection: 'row',
        borderRadius: 20,
        // width: 312,
        justifyContent: 'center',
        padding: 3,
        alignItems: 'center',
        height: 50,
        marginHorizontal: 24
    },
        
    input: {
        marginHorizontal: 10,
    }
})

export { TaskInput, SecondInput };
