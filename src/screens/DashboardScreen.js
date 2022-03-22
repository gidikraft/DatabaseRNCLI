import { View, Text, Alert, FlatList, TouchableOpacity, Linking, RefreshControl, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { WhiteButton } from '../components/Buttons';
import styles from './screen.styles/DashboardScreenStyles'
import { setName } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ListViewItemSeparator } from '../components/ItemSeperator';


const db = openDatabase({
  name: 'rn_sqlite'
})

const DashboardScreen = ({ navigation }) => {

  const { name, news } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState('');

  //fetch user details from db
  const fetchData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM items",
          [],
          (tx, res) => {
            var len = res.rows.length;
            if (len > 0) {
              len = res.rows.length-1

              var userName = res.rows.item(len).name
              // var userAge = result.rows.item(len).count
              
              setName(userName)
              
              // console.log(userName)
            }
          }
        ) 
      })
    } catch (error) {
    console.log(error)
    }
  }

  //deletes all details from db
  const deleteCategory = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM items',
        [],
        (tx, res) => {
          console.log('Results', res.rowsAffected + res);
          if (res.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Logout successful',
              [
                {
                text: 'Ok',
                onPress: () => navigation.navigate('Home'),
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

  useEffect(() => {
    fetchData()
    dispatch(getNews)
  }, [])


  const getNews = async () => {
    try {
      const result = await fetch('https://hn.algolia.com/api/v1/search_by_date?numericFilters=points%3E250&page=1', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
      })
      const json = await result.json()
      // console.log(json)
      if (json) {
          setData(json.hits)
      } else {
          console.log("Error fetching News")
      }
    } catch (error) {
        console.log(error)
    }
  };

  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <View style={styles.databaseList}>
          <View style={styles.titleView}>
            <Text style={styles.itemTitle}>
              {item.author.charAt(0).toUpperCase() + item.author.slice(1)}:
            </Text>
          </View>

          <View style={styles.bodyView} >
            
            <CustomText caption={item.title} style={styles.itemBody} />
            <CustomText 
              caption={ item.created_at.slice(11, 19) + ' ' + item.created_at.slice(0, 10) }
              style={styles.createdAt}
            />
            <CustomText
              caption={`Views: ${item.points}`} 
              style={styles.points}
            />
            
          </View>
        </View>
      </TouchableOpacity>
        
    )
  }

  return (
    <View style={styles.container}>
      {/* <Text>{name}</Text> */}
      <CustomText caption={name} style={styles.header} onPress={() => console.log(data)} />

      <CustomText caption={"SINGING"} style={styles.header} onPress={() => navigation.navigate("Home")} />

      <WhiteButton caption={"Sign out"} style={styles.signoutButton} onPress={() => deleteCategory()}/>

      <FlatList 
          data = {data}
          keyExtractor={(item, itemIndex) => itemIndex}
          ItemSeparatorComponent={ListViewItemSeparator}
          renderItem={renderCategory}
      />

    </View>
  )
}

export default DashboardScreen