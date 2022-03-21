import { StyleSheet, Dimensions } from "react-native";

const { deviceHeight, deviceWodth } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceHeight,
        height: deviceHeight
    },
    header: {
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20
    },
    blueButton: {
        marginVertical: 20
    },
    taskInput: {
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 10,
        // color: '#e1e8e6',
        marginHorizontal: 20,
        paddingHorizontal: 10,
    },
    databaseList: {
        flexDirection: 'row',
        padding: 10,
    },
    dbNumber: {
        marginRight: 10
    }
});

export default styles