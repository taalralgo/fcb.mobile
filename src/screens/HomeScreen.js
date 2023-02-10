import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Logo } from '../../assets/images';
import VideoCard from '../components/VideoCard';
import { noParamGet } from '../api/common';

const HomeScreen = () => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const res = await noParamGet(`/videos`);
        setVideos(res.data);
    }

    return (
        <SafeAreaView className='bg-dark flex-1'>
            <StatusBar barStyle="light-content" />
            <View className='mt-3 mx-6 flex-row items-center'>
                <Image source={Logo} className='w-20 h-20 rounded-full mr-3' />
                <Text className='text-white text-base flex-shrink font-[r-regular]'>FCB LIVE | Toutes les chaines de sports et les matchs du Barça rien que pour vous.</Text>
            </View>

            <View className='mt-6 mb-8 px-6 flex-row items-center justify-between'>
                <Text className='font-[r-bold] text-white text-xl'>Videos</Text>
                <TouchableOpacity>
                    <Text className='font-[r-regular] text-gray text-base'>Voir toutes &gt;</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={videos}
                renderItem={({ item }) => <VideoCard title={item.name} image={item.image} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default HomeScreen