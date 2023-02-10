import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

const ChannelCard = ({ channel, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className='bg-white py-4 mb-5 mx-5 border rounded-lg'>
                <Text className='text-dark text-center'>{channel.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChannelCard