import React, { memo } from 'react';
import { View, Image } from 'react-native';

const BackgroundBox = ({ color, image }) => (
    <View
        style={{
            width: 25,
            height: 25,
            borderRadius: 5,
            backgroundColor: !image && (color || 'transparent'),
            overflow: 'hidden'
        }}
    >
        { image && <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode='cover' /> }
    </View>
);

export default memo(BackgroundBox);
