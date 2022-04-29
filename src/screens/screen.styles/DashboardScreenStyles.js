import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants, Fonts } from "../../utils";

const { deviceHeight, deviceWidth } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        height: deviceHeight,
        width: deviceWidth,
    },
    headerView: {
        flexDirection: Constants.row,
        justifyContent: "space-between",
        marginBottom: 20
    },
    header: {
        fontSize: 22,
        // textAlign: Constants.center
    },
    logoutIcon: {
        tintColor: Colors.Background_Brown,
        marginLeft: 5,
    },
    logoutView: {
        alignItems: Constants.center,
        flexDirection: Constants.row,
        alignSelf: Constants.center,
    },

    databaseList: {
        flex: 1,
        flexDirection: Constants.row,
        paddingVertical: 10,
        elevation: 5,
    },
    titleView: {
        flex: .3,
        // paddingLeft: 10,

    },
    bodyView: {
        flex: .7,
        paddingLeft: 10,
        
    },
    itemTitle: {
        marginRight: 10,
        fontSize: 16,
        fontFamily: Fonts.News_Fonts,
        fontStyle: 'italic',
        color: Colors.Black,
    },
    itemBody: {
        fontFamily: Fonts.Semi_Bold_Font,
        fontSize: 16
    },
    createdAt: {
        textAlign: 'right',
        marginTop: 5,
        marginRight: 10,
        fontFamily: Fonts.News_Fonts,
        fontSize: 14,
    },
    points: {
        textAlign: 'right',
        marginTop: 5,
        marginRight: 10,
        color: Colors.Red,

    },
    tinyLogo: {
        width : "100%",
        height: 200,
        marginTop: 10
    }
})

export default styles