import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { Logo } from '../../assets/images';
import VideoCard from '../components/VideoCard';
import { noParamGet } from '../api/common';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {

    const scrollRef = useRef();
    const [videos, setVideos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const res = await axios.get(`${process.env.API_URL}/videos`).then(response => {
            setVideos(response.data.data);
        }).catch(error => {
            setVideos([]);
            console.error(error);
            console.error(JSON.stringify(error));
        });
    }

    const refresh = async () => {
        await getVideos();
    }

    const goToTop = () => {
        scrollRef.current.scrollToOffset({
            offset: 0,
            animated: true,
        });
    }

    const onClickVideo = (video) => {
        navigation.navigate("VideoScreen", {
            video: video
        });
    }


    return (
        <SafeAreaView className='bg-dark flex-1'>
            <StatusBar barStyle="light-content" />
            <View className='mt-3 mx-6 flex-row items-center'>
                <Image source={Logo} className='w-20 h-20 rounded-full mr-3' />
                <Text className='text-white text-base flex-shrink font-[r-regular]'>FCB LIVE | Toutes les chaines de sports et les matchs du Barça rien que pour vous.</Text>
            </View>

            <View className='mt-6 mb-8 px-6 flex-row items-center justify-between'>
                <TouchableOpacity onPress={goToTop}>
                    <Text className='font-[r-bold] text-white text-xl'>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className='font-[r-regular] text-gray text-base'>Live TV</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                ref={scrollRef}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refresh} colors={'#00e344'} title={'LOADING'} titleColor={'#00e344'} tintColor={'#00e344'} />
                }
                data={videos}
                renderItem={({ item }) => <VideoCard title={item.name} image={item.image} onPress={() => onClickVideo(item)} key={item.id} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default HomeScreen