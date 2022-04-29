import { View, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BlueButton } from '../components/Buttons';
import { SecondInput } from '../components/Inputs';
import styles from './screen.styles/HomeScreenStyles';
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { Constants } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setPassword } from '../redux/actions';

const db = openDatabase({
    name: 'news_sqlite'
})

const HomeScreen = ({ navigation }) => {
    // const [name, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)

    const { name, password } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const createTables = () => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)`,
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

    const validateInput = () => {
        if (name.trim() === "" || password.trim() === "") {
            ToastAndroid.show("Invalid username/password", ToastAndroid.LONG);
            setErrorMessage(true)
        } else {
            addCategory()
        }
    };
  
    const handleUsernameChange = (username) => {
        setErrorMessage(false)
        dispatch(setName(username))
    }

    const handlePasswordChange = (userPassword) => {
        setErrorMessage(false)
        dispatch(setPassword(userPassword))
    }

    const addCategory = () => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO items (name, password) VALUES (?, ?)`,
                [name, password],
                (sqlTx, res) => {
                    console.log(`name:${name} password:${password} added successfully`)
                    navigation.navigate("BottomNav")
                },
                error => {console.log(`error on logging in` +  error.message);}
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
                        navigation.navigate("BottomNav")
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
    }, [])
    
    return (
        <View style={styles.container}>
            <CustomText style={styles.header} caption={"HomeScreen"} onPress={() => navigation.navigate("Dashboard")}/>

            {errorMessage? (
                <CustomText caption={"Invalid username/password"} style={styles.errorMessage} />
            ) : null}

            <SecondInput 
                placeholder={Constants.Enter_task}
                value={name}
                onChangeText={(nameText) => handleUsernameChange(nameText)}
                autoCapitalize={'words'}
                style={styles.taskInput}
            />

            <SecondInput 
                placeholder={Constants.Enter_password}
                value={password}
                onChangeText={(passwordText) => handlePasswordChange(passwordText)}
                autoCapitalize={'none'}
                style={styles.taskInput}
                secureTextEntry={true}
            />
            <BlueButton style={styles.blueButton} caption={Constants.Submit_Name} onPress={validateInput} />

        </View>
    )
};

export default HomeScreen;
