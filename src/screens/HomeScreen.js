import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BlueButton, WhiteButton } from '../components/Buttons';
import { TaskInput, SecondInput } from '../components/Inputs';
import { ListViewItemSeparator } from '../components/ItemSeperator';
import styles from './screen.styles/HomeScreenStyles';
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { Constants } from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { setName } from '../redux/actions';

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
                    navigation.navigate("Dashboard")
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
                        navigation.navigate("Dashboard")
                    }
                },
                error => {
                    console.log(`Error on getting categories ${error.message}`)
                }
            )
        })
    }

    const renderCategory = ({item}) => {
        return (
            <TouchableOpacity >
                <View style={styles.databaseList}>
                    <Text style={styles.dbNumber}>{item.id}</Text>
                    <Text style={styles.dbName} >{item.name}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }

    useEffect(() => {
        createTables(),
        getCategories()
    }, [])
    
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
                placeholder={Constants.Enter_task}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize={'words'}
                style={styles.taskInput}
            />
            <BlueButton style={styles.blueButton} caption={Constants.Submit_Name} onPress={addCategory} />

            {/* <TaskInput 
                placeholder={Constants.Enter_Id}
                onChangeText={(text) => setPassword(text)}
                value={password}
            /> */}

            {/* <WhiteButton caption={Constants.Delete_Id} onPress={addCategory}/> */}

            {/* <FlatList 
                data = {data}
                keyExtractor={(item, itemIndex) => itemIndex}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={renderCategory}
            /> */}
        </View>
    )
};


export default HomeScreen