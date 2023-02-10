import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Play } from '../../assets/images'

const VideoCard = ({ title, image }) => {
    return (
        <View className='mmt-2 mb-10 px-6 relative'>
            <TouchableOpacity>
                <Text className='text-white font-[r-regular] text-base'>{title}</Text>
                <Image source={{ uri: image }} className='w-full h-52 self-center mt-3' />
                {/* <Image source={Play} className='w-16 h-16 absolute left-1/2 ml' /> */}
                <Image source={Play} className='w-16 h-16 absolute top-1/3 left-1/3 ml-10 mt-5' />
            </TouchableOpacity>
        </View>
    )
}

export default VideoCard