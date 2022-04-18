import axios from 'axios';
import { 
  View, Text, ToastAndroid, FlatList, TouchableOpacity, Linking, RefreshControl, ActivityIndicator, Image 
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { CustomText } from '../components/DbText';
import styles from './screen.styles/DashboardScreenStyles'
import { ListViewItemSeparator } from '../components/ItemSeperator';
import { TaskInput } from '../components/Inputs';
import LogoutIcon from  '../../assets/images/logout.png'
import { Colors, Constants } from '../utils';

const db = openDatabase({
  name: 'news_sqlite'
})

const DashboardScreen = ({ navigation }) => {

  const [newsArticle, setNewsArticle] = useState([]);
  const [username, setUsername] = useState("username");
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newsPage, setNewsPage] = useState(1);
  const [error, setError] = useState("")

  const today = new Date()
  const API_KEY = `9f80026d02654659b63626deb0dfb4bc`
  const NEWS_API = `https://newsapi.org/v2/everything?q=ukraine&from=${today}&sortBy=publishedAt&apiKey=${API_KEY}&page=${newsPage}`

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

              let userName = res.rows.item(len).name
              // let password = result.rows.item(len).password
              setUsername(userName)
            }
          }
        ) 
      })
    } catch (error) {
    console.log(error)
    }
  }

  //deletes all details from db
  const signoutDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM items',
        [],
        (tx, res) => {
          console.log('Results', res.rowsAffected + res);
          if (res.rowsAffected > 0) {
            ToastAndroid.show("Logout successful", ToastAndroid.SHORT);
            navigation.navigate('Home')
          } else {
              alert('You are not signed in');
          }
        }
      );
    });
  };

  //get breaking news about Ukraine
  const getNews = async () => {
    try {
      const response = await axios.get(NEWS_API)
        setIsLoading(!isLoading)
        if (response.status ===  200) {
          console.log(response.data.articles)
          setNewsArticle(response.data.articles)
          setIsLoading(isLoading)
        }
      
    } catch (error) {
      console.log(error)
      setError(error)
    }
  };

  useEffect(() => {
    fetchData()
    getNews()
    // dispatch(getNews())
  }, [newsPage])

  const wait = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

  const pullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    getNews()
    // wait(2000).then(() => setIsRefreshing(false));
    setIsRefreshing(false)
  }, []);

  const handleNewsTouch = item => Linking.openURL(item.url)

  const renderCategory = ({item}) => {
    if(item.description.toLowerCase().includes(searchInput.toLowerCase().trim())
      || item.content.toLowerCase().includes(searchInput.toLowerCase().trim())) {
      return (
        <TouchableOpacity onPress={() => handleNewsTouch}>
          
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
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.headerView} >
        <CustomText caption={`${Constants.welcome} ${username}`} style={styles.header} onPress={() =>  navigation.navigate('Home')} />

        <TouchableOpacity onPress={() => signoutDb()} >
          <Image source={LogoutIcon} style={styles.logoutIcon} />
        </TouchableOpacity>

      </View>

      <TaskInput
        placeholder={Constants.clickToSearch}
        value={searchInput}
        onChangeText={text => setSearchInput(text)}
        returnKeyLabel={Constants.search}
      />

      {newsArticle? (
        <FlatList 
          data = {newsArticle}
          keyExtractor={(item, itemIndex) => itemIndex}
          ItemSeparatorComponent={ListViewItemSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={() => setNewsPage(newsPage+1)}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={pullToRefresh}
              tintColor={Colors.Green}
            />
          }
          renderItem={renderCategory}
        /> ) : (
          <ActivityIndicator 
            animating={true} 
            size={Constants.large}
            color={Colors.Green}
          />
        )
      }
      
    </View>
  );
};

export default DashboardScreen;
