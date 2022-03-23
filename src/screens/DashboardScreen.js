import { View, Text, Alert, FlatList, TouchableOpacity, Linking, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { WhiteButton } from '../components/Buttons';
import styles from './screen.styles/DashboardScreenStyles'
import { setName, getNews } from '../redux/actions';
import { useSelector, useDispatch, increasePage } from 'react-redux';
import { ListViewItemSeparator } from '../components/ItemSeperator';
import { TaskInput } from '../components/Inputs';


const db = openDatabase({
  name: 'rn_sqlite'
})

const DashboardScreen = ({ navigation }) => {

  const { name, news, page } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [data, setData] = useState('');
  // const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    dispatch(getNews())
  }, [])

  const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  const pullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(getNews())
    wait(2000).then(() => setIsRefreshing(false));
  }, []);

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
      
      <CustomText caption={name} style={styles.header} onPress={() => dispatch(increasePage())} />

      {/* <CustomText caption={page} style={styles.header} /> */}

      <CustomText caption={"SINGING"} style={styles.header} onPress={() => navigation.navigate("Home")} />

      <WhiteButton caption={"Sign out"} style={styles.signoutButton} onPress={() => deleteCategory()}/>

      <TaskInput
        placeholder={"Click here to search"}
        value={searchInput}
        onChangeText={text => setSearchInput(text)}
        returnKeyLabel={"Search"}
      />

      {news? (
        <FlatList 
          data = {news}
          keyExtractor={(item, itemIndex) => itemIndex}
          ItemSeparatorComponent={ListViewItemSeparator}
          refreshControl={
            <RefreshControl
                refreshing={isRefreshing}
                onRefresh={pullToRefresh}
                tintColor={"blue"}
            />
          }
          renderItem={renderCategory}
        /> ) : (
          <ActivityIndicator 
            animating={true} 
            size={"large"}
            color="green"
          />
        )}
      

    </View>
  )
}

export default DashboardScreen