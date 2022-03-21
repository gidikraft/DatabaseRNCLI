import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { BlueButton, WhiteButton } from '../components/Buttons';
import { TaskInput, SecondInput } from '../components/Inputs';
import { ListViewItemSeparator } from '../components/ItemSeperator';
import styles from './screen.styles/HomeScreenStyles';
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { Constants } from '../utils';

const db = openDatabase({
    name: 'rn_sqlite'
})

const HomeScreen = () => {
    const [category, setCategory] = useState("")
    const [data, setData] = useState([]);
    const [inputUserId, setInputUserId] = useState('');

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
        console.log(data)
        if (!category) {
            alert("Enter Category")
            return false
        }
        
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO items (name) VALUES (?)`,
                [category],
                (sqlTx, res) => {
                    console.log(res)
                    console.log(`${category} category added successfully`)
                    getCategories()
                },
                error => {console.log(`error on adding category` +  error.message);}
            )
        })
    };

    const deleteCategory = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM items where id=?',
                [inputUserId],
                (tx, res) => {
                    console.log('Results', res.rowsAffected + res);
                    if (res.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User deleted successfully',
                            [
                                {
                                text: 'Ok',
                                // onPress: () => navigation.navigate('HomeScreen'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Please insert a valid User Id');
                    }
                }
            );
        });
    };

    const getCategories = () => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM items ORDER BY id DESC`,
                [],
                (txSql, res) => {
                    console.log(`categories retrived successfully`)
                    let len = res.rows.length
                    if (len > 0) {
                        let results = []
                        for (let i = 0; i < len; i++){
                            let item = res.rows.item(i)
                            results.push({id: item.id, name: item.name})
                        }
                        setData(results)
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
            <View style={styles.databaseList}>
                <Text style={styles.dbNumber}>{item.id}</Text>
                <Text style={styles.dbName} >{item.name}</Text>
            </View>
        )
    }

    useEffect(() => {
        createTables(),
        getCategories()
    }, [])
    
    return (
        <View style={styles.container}>
            <CustomText style={styles.header} caption={"HomeScreen"}/>
            <SecondInput 
                placeholder={Constants.Enter_task}
                value={category}
                onChangeText={(text) => setCategory(text)}
                style={styles.taskInput}
            />
            <BlueButton style={styles.blueButton} caption={Constants.Submit_Name} onPress={addCategory} />

            <TaskInput 
                placeholder={Constants.Enter_Id}
                onChangeText={(text) => setInputUserId(text)}
                value={inputUserId}
            />
            <WhiteButton caption={Constants.Delete_Id} onPress={deleteCategory}/>
            <FlatList 
                data = {data}
                keyExtractor={(item, itemIndex) => itemIndex}
                ItemSeparatorComponent={ListViewItemSeparator}
                renderItem={renderCategory}
            />
        </View>
    )
};


export default HomeScreen