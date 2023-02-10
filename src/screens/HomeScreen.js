import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { Logo } from '../../assets/images';
import VideoCard from '../components/VideoCard';
import { noParamGet } from '../api/common';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ChannelCard from '../components/ChannelCard';

const HomeScreen = () => {

    const scrollRef = useRef();
    const [videos, setVideos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [videoSectionIsActive, setVideoSectionIsActive] = useState(true);

    const [channels, setChannels] = useState([]);


    const navigation = useNavigation();

    useEffect(() => {
        getVideos();
        getChannels();
    }, []);

    const getVideos = async () => {
        const res = await axios.get(`${process.env.API_URL}/videos`).then(response => {
            setVideos(response.data.data);
        }).catch(error => {
            setVideos([]);
        });
    }

    const refresh = async () => {
        getVideos();
        getChannels();
    }

    const goToTop = () => {
        setVideoSectionIsActive(true);
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

    const displayLiveSection = () => {
        setVideoSectionIsActive(false);
    }

    const getChannels = async () => {
        const res = await noParamGet('/lives');
        setChannels(res.data);
    }

    const onClickChannel = (channel) => {
        navigation.navigate("LiveTV", {
            channel: channel
        })
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
                    <Text className={videoSectionIsActive ? 'font-[r-bold] text-white text-xl' : 'font-[r-regular] text-gray text-base'}>Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={displayLiveSection}>
                    <Text className={videoSectionIsActive ? 'font-[r-regular] text-gray text-base' : 'font-[r-bold] text-white text-xl'}>Live TV</Text>
                </TouchableOpacity>
            </View>
            {videoSectionIsActive ?
                <FlatList
                    ref={scrollRef}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} colors={'#00e344'} title={'LOADING'} titleColor={'#00e344'} tintColor={'#00e344'} />
                    }
                    data={videos}
                    renderItem={({ item }) => <VideoCard title={item.name} image={item.image} onPress={() => onClickVideo(item)} key={item.id} />}
                    keyExtractor={item => item.id}
                /> :
                <FlatList
                    ref={scrollRef}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={refresh} colors={'#00e344'} title={'LOADING'} titleColor={'#00e344'} tintColor={'#00e344'} />
                    }
                    data={channels}
                    renderItem={({ item }) => <ChannelCard key={item.id} channel={item} onPress={() => onClickChannel(item)} />}
                    keyExtractor={item => item.id}
                />}

        </SafeAreaView>
    )
}

export default HomeScreen