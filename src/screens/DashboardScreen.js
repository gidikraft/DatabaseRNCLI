import axios from 'axios';
import { View, Text, Alert, FlatList, TouchableOpacity, Linking, RefreshControl, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import { WhiteButton } from '../components/Buttons';
import styles from './screen.styles/DashboardScreenStyles'
import { setName, getNews, increasePage } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ListViewItemSeparator } from '../components/ItemSeperator';
import { TaskInput } from '../components/Inputs';
import PushNotification from "react-native-push-notification";

const db = openDatabase({
  name: 'rn_sqlite'
})

const DashboardScreen = ({ navigation }) => {

  const [newsArticle, setNewsArticle] = useState();
  // const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsPage, setNewsPage] = useState(1);

  const { name, news, page } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const API_KEY = `9f80026d02654659b63626deb0dfb4bc`
  const NEWS_API = `https://newsapi.org/v2/top-headlines?country=ng&apiKey=${API_KEY}`
  // const NEWS_API = `https://newsapi.org/v2/everything?q=uefa&from=2022-04-06&sortBy=publishedAt&apiKey=${API_KEY}`

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
              alert('You are not signed in');
          }
        }
      );
    });
  };

  const getNews = async () => {
    const response = await axios.get(NEWS_API)
      console.log(response)
      setIsLoading(true)
      if (response.status ===  200) {
        console.log(response.data.articles)
        setNewsArticle(response.data.articles)
        setIsLoading(false)
      }
  };

  useEffect(() => {
    fetchData()
    getNews()
    // dispatch(getNews())
  }, [])

  const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  const pullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    // dispatch(getNews())
    // wait(2000).then(() => setIsRefreshing(false));
    setIsRefreshing(false)
  }, []);

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: "hn-channel",
      title: `You clicked on ${item}`,
      message: item.body
    })
  }

  const handleNewsTouch = (item) => Linking.openURL(item.url)

  const renderCategory = ({item}) => {
    if(item.title.toLowerCase().includes(searchInput.toLowerCase().trim())
      || item.author.toLowerCase().includes(searchInput.toLowerCase().trim())) {
      return (
        <TouchableOpacity onPress={() => handleNotification(item)}>
          
          <Image
            style={styles.tinyLogo}
            resizeMode="cover"
            source={{uri: item.urlToImage}}
          />
          <View style={styles.databaseList}>

            <View style={styles.titleView}>
              <Text style={styles.itemTitle}>
                {item.author}:
              </Text>
            </View>

            <View style={styles.bodyView} >
              <CustomText caption={item.description} style={styles.itemBody} />

              <CustomText 
                caption={ item.publishedAt.slice(11, 19) + ' ' + item.publishedAt.slice(0, 10) }
                style={styles.createdAt}
              />

              <CustomText
                caption={`Source: ${item.source.name}`} 
                style={styles.points}
              />
            </View>
          </View>
        </TouchableOpacity>
          
      )
    }
  }

  return (
    <View style={styles.container}>
      
      <CustomText caption={`Welcome back ${name}`} style={styles.header} onPress={() => dispatch(increasePage())} />

      {/* <CustomText caption={`Page ${page}`} style={styles.header} onPress={() => navigation.navigate("Home")}/> */}

      {/* <CustomText caption={"SINGING"} style={styles.header} /> */}

      <WhiteButton caption={"Sign out"} style={styles.signoutButton} onPress={() => deleteCategory()}/>

      <TaskInput
        placeholder={"Click here to search"}
        value={searchInput}
        onChangeText={text => setSearchInput(text)}
        returnKeyLabel={"Search"}
      />

      {news? (
        <FlatList 
          data = {newsArticle}
          keyExtractor={(item, itemIndex) => itemIndex}
          ItemSeparatorComponent={ListViewItemSeparator}
          // onEndReachedThreshold={0.3}
          // onEndReached={() => setNewsPage(newsPage+1)}
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