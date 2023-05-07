import React, { forwardRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import { SCREEN_PADDING } from '../../theme';

const { width, height } = Dimensions.get('window');

const SharableEventShot = forwardRef(({ title, image, timer }, forwardedRef) => {
    return (
        <View style={{ position: 'absolute', left: 100000, width, height, opacity: 0 }}>
            <View style={[{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }]} ref={forwardedRef}>
                <Image
                    source={image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode='cover'
                />
                <Timer
                    title={title}
                    timer={timer}
                    style={{
                        position: 'absolute',
                        top: 200,
                        left: SCREEN_PADDING,
                        right: SCREEN_PADDING,
                        height: 130,
                        borderRadius: 20
                    }}
                />
            </View>
        </View>
    );
});

export default SharableEventShot;
