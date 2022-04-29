import { StyleSheet, Dimensions } from "react-native";
import { Colors, Constants, Fonts } from "../../utils";

const { deviceHeight, deviceWidth } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: Colors.White
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
        tintColor: Colors.Green,
    },
    newsContainer: {
        elevation: 5,
        backgroundColor: Colors.White,
        // borderWidth: 1,
        // borderColor: Colors.Blue,
        margin: 5,
        borderRadius: 5      
    },
    databaseList: {
        // flex: 1,
        flexDirection: Constants.row,
        padding: 5,
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
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // marginTop: 10
    },
    swipeView : {
        backgroundColor: Colors.Red
    }
      
});

export default styles;
