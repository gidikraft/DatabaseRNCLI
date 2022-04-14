import { View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BlueButton } from '../components/Buttons';
import { SecondInput } from '../components/Inputs';
import styles from './screen.styles/HomeScreenStyles';
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { Constants } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { setName } from '../redux/actions';
import PushNotification from "react-native-push-notification";

const db = openDatabase({
    name: 'rn_sqlite'
})

const HomeScreen = ({ navigation }) => {
    // const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const { name } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const createTables = () => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`,
                [],
                (sqlTx, res) => {
                    console.log('table created successfully')
                },
                error => {
                    console.log('error on creating table' + error.message)
                },
            )
        })
    }

    const addCategory = () => {
        if (!name) {
            alert("Enter Category")
            return false
        }
        
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO items (name) VALUES (?)`,
                [name],
                (sqlTx, res) => {
                    console.log(`${name} category added successfully`)
                    navigation.navigate("TopBarNav")
                },
                error => {console.log(`error on adding category` +  error.message);}
            )
        })
    };

    const getCategories = () => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM items ORDER BY id DESC`,
                [],
                (txSql, res) => {
                    let len = res.rows.length
                    if (len > 0) {
                        navigation.navigate("TopBarNav")
                    }
                },
                error => {
                    console.log(`Error on getting categories ${error.message}`)
                }
            )
        })
    }

    useEffect(() => {
        createTables();
        getCategories();
        createNotificationChannel();
    }, [])

    const createNotificationChannel = () => {
      PushNotification.createChannel(
        {
          channelId: "hn-channel",
          channelName: "HN Channel",
          channelDescription: "News HackerNews available",
        }
      )
    }
    
    return (
        <View style={styles.container}>
            <CustomText style={styles.header} caption={"HomeScreen"} onPress={() => navigation.navigate("Dashboard")}/>
            <SecondInput 
                placeholder={Constants.Enter_task}
                value={name}
                onChangeText={(text) => dispatch(setName(text))}
                autoCapitalize={'words'}
                style={styles.taskInput}
            />

            <SecondInput 
                placeholder={Constants.Enter_password}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize={'words'}
                style={styles.taskInput}
            />
            <BlueButton style={styles.blueButton} caption={Constants.Submit_Name} onPress={addCategory} />

        </View>
    )
};


export default HomeScreen