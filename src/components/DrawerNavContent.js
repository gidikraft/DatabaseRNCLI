import { Button, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react';
import ProfileImage from "../../assets/images/profileImage.png"
import { CustomText } from './DbText';
import { Colors, Constants } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeIcon from "../../assets/images/home_icon.png";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { BlueButton, WhiteButton } from './Buttons';

const DrawerNavContent = (props) => {
    const [currentTab, setCurrentTab] = useState("Home");

    const handleDrawerItemTouch = (title) => {
        if (title == "Logout") {
            console.log("logged out")
        } else {
            setCurrentTab(title)
        }
    }

    const TabButton = (currentTab, setCurrentTab, title, image ) => (
        <TouchableOpacity 
            style={currentTab == title? styles.homeViewActive : styles.homeViewInactive}
            onPress={() => handleDrawerItemTouch(title)}
        >
            <Image source={image} style={currentTab == title? styles.itemIconActive : styles.itemIconInactive} />
            <CustomText caption={title} style={currentTab == title? styles.itemTitleActive : styles.itemTitleInactive} />
        </TouchableOpacity>

    )

    return (
        <>
        {/* // <SafeAreaView style={styles.container}>
            
        //     <Image source={ProfileImage} style={styles.profileIcon}  />
        //     <CustomText caption={"Jenna Ezarik"} style={styles.profileName}/>

        //     <TouchableOpacity >
        //         <CustomText caption={"View Profile"} style={styles.viewProfile}/>
        //     </TouchableOpacity>

        //     <View style={styles.mainNavMenu} >
        //         {TabButton(currentTab, setCurrentTab, "Home", HomeIcon)}
        //         {TabButton(currentTab, setCurrentTab, "Search", HomeIcon)}
        //         {TabButton(currentTab, setCurrentTab, "Notification", HomeIcon)}
        //         {TabButton(currentTab, setCurrentTab, "Settings", HomeIcon)}
        //     </View>

        //     <View >
        //         {TabButton(currentTab, setCurrentTab, "Logout", HomeIcon)}
        //     </View>
        // </SafeAreaView > */}

        <DrawerContentScrollView {...props} >
            <View >
                <CustomText caption={"Header"} style={styles.drawerHeader} />
            </View>
            <View style={styles.container} >
                <DrawerItemList {...props} />
            </View>

        </DrawerContentScrollView>

        <View style={styles.logoutButtonView} >
            {/* <Button 
                title="Logout" 
                onPress={() =>{ props.navigation.closeDrawer()}}
                color="#F1F1F1"
                accessibilityLabel="Logout button"
            ></Button> */}
            <WhiteButton 
                caption={"Logout"} 
                onPress={() =>{ props.navigation.closeDrawer()}} 
                style={styles.logoutButton}
            />
        </View>
        </>
    )
}

export default DrawerNavContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.Primary_Color,
        padding: 20,
    },
    drawerHeader: {
        height: 100,
        backgroundColor: "#F1F1F1",
        margin: 10,
        borderRadius: 10,
        marginTop: 0,
        marginBottom: 10
    },
    logoutButtonView: {
        // marginBottom: 30
    },
    logoutButton: {
        backgroundColor: Colors.White
    },


    profileIcon: {
        width: 60,
        height: 60,
        marginTop: 20,
    },
    profileName: {
        fontSize: 20,
        color: Colors.White,
        // marginTop: 20,
    },
    viewProfile: {
        color: Colors.White,
        marginTop: 8,
    },
    mainNavMenu: {
        flexGrow: 1,
        marginTop: 40
    },
    homeViewActive: {
        flexDirection: Constants.row,
        alignItems: Constants.center,
        backgroundColor: Colors.White,
        paddingVertical: 8,
        paddingLeft: 15,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 10,

    },
    homeViewInactive: {
        flexDirection: Constants.row,
        alignItems: Constants.center,
        backgroundColor: "transparent",
        paddingVertical: 8,
        paddingLeft: 15,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 10,

    },
    itemIconActive: {
        width: 25,
        height: 25,
        tintColor: Colors.Primary_Color
    },
    itemIconInactive: {
        width: 25,
        height: 25,
        tintColor: Colors.White
    },
    itemTitleActive: {
        fontSize: 15,
        paddingLeft: 15,
        color: Colors.Primary_Color
    },
    itemTitleInactive: {
        fontSize: 15,
        paddingLeft: 15,
        color: Colors.White
    }
    
})