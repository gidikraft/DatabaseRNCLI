import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants, Fonts } from "../../utils";

const { deviceHeight, deviceWodth } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceWodth,
        height: deviceHeight
    },
    header: {
        fontSize: 22,
        textAlign: Constants.center,
        marginTop: 20
    },
    blueButton: {
        marginVertical: 20,
        backgroundColor: Colors.Green,
        width: 180,
        alignSelf: Constants.center,
    },
    taskInput: {
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.Green_Border,
        textAlign: Constants.center,
        marginHorizontal: 20,
        padding: 10,
    },
    databaseList: {
        flexDirection: Constants.row,
        padding: 10,
    },
    dbNumber: {
        marginRight: 10,
        fontSize: 14,
        fontFamily: Fonts.Bold_Fonts
    },
    dbName: {
        fontFamily: Fonts.Italic_Fonts,
        fontSize: 14
    }
});

export default styles