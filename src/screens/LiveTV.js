import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { Back } from '../../assets/images'
import { Video } from 'expo-av';

const LiveTV = ({ navigation, route }) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const { channel } = route.params;

    const goBack = () => {
        if (video.current) {
            video.current.pauseAsync();
        }
        navigation.goBack();
    }
    return (
        <SafeAreaView className='bg-dark flex-1'>
            <View className=' px-6'>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image source={Back} />
                </TouchableOpacity>
            </View>

            <View className='px-6 mt-10'>
                <Video
                    className='w-full h-64'
                    ref={video}
                    source={{
                        uri: channel.url,
                    }}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                    shouldPlay={true}
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </View>

            <View className='px-6 mt-5'>
                <Text className='text-white'>Vous suivez {channel.name} en direct 🔴</Text>
            </View>

        </SafeAreaView>
    )
}

export default LiveTV