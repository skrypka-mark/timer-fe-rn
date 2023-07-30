import React, { memo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

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
        { image && <FastImage source={image} style={{ width: '100%', height: '100%' }} resizeMode='cover' /> }
    </View>
);

export default memo(BackgroundBox);
