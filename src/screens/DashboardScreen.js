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
import { Rect, Svg, Circle, SvgUri } from 'react-native-svg';
import HomeSvg from '../../assets/images/home.svg'

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

  const renderNews = ({item}) => {
    if(item.content.toLowerCase().includes(searchInput.toLowerCase().trim())) {
      return (
        <TouchableOpacity onPress={() => handleNewsTouch}>
          {/* {item.urlToImage === undefined? (
            <Image
              style={styles.tinyLogo}
              resizeMode="cover"
              source={{uri: item.urlToImage}}
            />
          ) : (
            <CustomText caption={"Image not available"} />
          )} */}
          
          <Image
            style={styles.tinyLogo}
            resizeMode="cover"
            source={{uri: item.urlToImage}}
            loadingIndicatorSource={require('../../assets/images/profileImage.png')}
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

        {/* <Svg width="10%" height="100%" viewBox="0 0 100 100">
          <Rect x={0} y={0} width={100} height={100} fill="green" stroke="black" />
          <Circle cx={50} cy={50} r={50} fill="blue" stroke="white" opacity={0.5} />
        </Svg> */}
        {/* <SvgUri
          width="10%"
          height="100%"
          uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
        /> */}
        {/* <HomeSvg width={20} height={20} /> */}
        <TouchableOpacity style={styles.logoutView} onPress={() => signoutDb()} >
          <CustomText caption={"Log out"}/>
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
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={pullToRefresh}
              tintColor={Colors.Green}
            />
          }
          renderItem={renderNews}
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
