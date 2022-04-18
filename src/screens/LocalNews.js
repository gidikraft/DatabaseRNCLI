import axios from 'axios';
import { 
  FlatList, Image, Text, TouchableOpacity, View, SafeAreaView, Linking, RefreshControl, ActivityIndicator, 
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import styles from '../screens/screen.styles/LocalNewsStyles';
import { CustomText } from '../components/DbText';
import { TaskInput } from '../components/Inputs';
import { Colors, Constants } from '../utils';

const LocalNews = ({ navigation }) => {
  const [newsPage, setNewsPage] = useState(0);
  const [localNewsArticle, setLocalNewsArticle] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState()

  const API_KEY = `9f80026d02654659b63626deb0dfb4bc`
  const NEWS_API = `https://newsapi.org/v2/top-headlines?country=ng&apiKey=${API_KEY}&page=${newsPage}`
  
  const getNews = async () => {
    setLocalNewsArticle(null)
    try {
      const response = await axios.get(NEWS_API)
        setIsLoading(true)
  
        if (response.status ===  200) {
          setLocalNewsArticle(response.data.articles)
          setIsLoading(!isLoading)
        }
      
    } catch (error) {
      console.log(error)
      setError(error)      
    }
  };

  useEffect(() => {
    getNews()
  }, [newsPage])
  
  const pullToRefresh = useCallback(() => {
    setIsRefreshing(true);
    getNews()
    setIsRefreshing(false)
  }, []);

  const handleNewsTouch = item => Linking.openURL(item.url)

  const renderCategory = ({item}) => {
    if (item.description !== null && item.content !== null) {
      if(item.description.toLowerCase().includes(searchInput.toLowerCase().trim())
        || item.content.toLowerCase().includes(searchInput.toLowerCase().trim())) {
        return (
          <TouchableOpacity onPress={() => handleNewsTouch(item)} style={styles.newsContainer} >
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
  };

  return (

    <SafeAreaView style={styles.container} >

      <TaskInput
        placeholder={Constants.clickToSearch}
        value={searchInput}
        onChangeText={text => setSearchInput(text)}
        returnKeyLabel={Constants.search}
      />

      {localNewsArticle? (
        <FlatList 
          data = {localNewsArticle}
          keyExtractor={(item, itemIndex) => itemIndex}
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
    </SafeAreaView>
    
  )
}

export default LocalNews
