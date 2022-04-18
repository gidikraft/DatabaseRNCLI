import { 
    View, Text, TouchableOpacity, RefreshControl, FlatList, Image, SafeAreaView
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react';
import { getNews } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Colors, Constants } from '../utils';
import styles from './screen.styles/TechNewsStyles';
import { TaskInput } from '../components/Inputs';
import { CustomText } from '../components/DbText';

const Technews = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const { news } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNews())
    }, [])

    const pullToRefresh = useCallback(() => {
        setIsRefreshing(true);
        getNews()
        setIsRefreshing(false)
    }, []);

    const handleNewsTouch = item => Linking.openURL(item.url)

    const renderCategory = ({item}) => {
        if(item.title.toLowerCase().includes(searchInput.toLowerCase().trim())) {
            return (
                <TouchableOpacity onPress={() => handleNewsTouch(item)} style={styles.newsContainer} >
                    
                    <View style={styles.databaseList}>
            
                        <View style={styles.titleView}>
                        <Text style={styles.itemTitle}>
                            {item.author}:
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
    };

    return (
       
        <SafeAreaView style={styles.container} >

            <TaskInput
                placeholder={Constants.clickToSearch}
                value={searchInput}
                onChangeText={text => setSearchInput(text)}
                returnKeyLabel={Constants.search}
            />

            {news? (
                <FlatList 
                    data = {news}
                    keyExtractor={(item, itemIndex) => itemIndex}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => getNews}
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

export default Technews;
