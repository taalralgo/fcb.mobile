import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video, AVPlaybackStatus } from 'expo-av';
import { Back } from '../../assets/images';
import YoutubePlayer from "react-native-youtube-iframe";

const VideoScreen = ({ route, navigation }) => {

    const videoRef = useRef(null);
    const [videoStatus, setVideoStatus] = useState({});
    const [YTplaying, setYTPlaying] = useState(true);

    const { video } = route.params;

    useEffect(() => {
    }, []);

    const goBack = () => {
        setYTPlaying(false);
        console.log(videoRef);
        if (videoRef.current) {
            videoRef.current.pauseAsync();
        }
        navigation.goBack();
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setYTPlaying(false);
        }
    }, []);

    return (
        <SafeAreaView className='px-5 flex-1 bg-dark'>
            <View className='flex-row'>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image source={Back} />
                </TouchableOpacity>

            </View>

            <View className='my-10'>
                {video.type === 'vod' ? (
                    <Video
                        ref={videoRef}
                        className='w-full h-64'
                        source={{
                            uri: video.url,
                        }}
                        useNativeControls
                        resizeMode="cover"
                        isLooping
                        shouldPlay={true}
                        onPlaybackStatusUpdate={status => setVideoStatus(() => status)}
                    />
                ) : (
                    <YoutubePlayer
                        height={300}
                        play={YTplaying}
                        videoId={video.videoId}
                        onChangeState={onStateChange}
                    />
                )}

            </View>
            {video.type === 'vod' && <Text className='text-white text-justify leading-5'>Vous regardez : {video.name}</Text>}
        </SafeAreaView>
    )
}

export default VideoScreen;