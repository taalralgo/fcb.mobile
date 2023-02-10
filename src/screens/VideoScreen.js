import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video, AVPlaybackStatus } from 'expo-av';
import { Back } from '../../assets/images';

const VideoScreen = ({ route, navigation }) => {

    const videoRef = useRef(null);
    const [videoStatus, setVideoStatus] = useState({});

    const { video } = route.params;

    useEffect(() => {
    }, []);

    return (
        <SafeAreaView className='px-5 flex-1 bg-dark'>
            <View className='flex-row'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={Back} />
                </TouchableOpacity>

            </View>

            <View className='my-10'>
                <Video
                    ref={videoRef}
                    className='w-full h-64'
                    source={{
                        uri: video.url,
                    }}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                    onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
                />
            </View>
            <Text className='text-white text-justify leading-5'>Vous regardez : {video.name}</Text>
        </SafeAreaView>
    )
}

export default VideoScreen