import React from 'react';
import { ScrollView, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const NewEventScreen = () => {
    return (
        <BlurView style={{ height: '100%' }} blurAmount={15} blurType='regular'>
            <ScrollView style={{ flex: 1, height: '100%' }} contentInsetAdjustmentBehavior='automatic'>
                <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repudiandae nostrum obcaecati ratione molestiae velit illo sint vitae, sapiente ea quisquam error nemo, repellat pariatur sit, quos rem. Quis, impedit?</Text>
                <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis repudiandae nostrum obcaecati ratione molestiae velit illo sint vitae, sapiente ea quisquam error nemo, repellat pariatur sit, quos rem. Quis, impedit?</Text>
            </ScrollView>
        </BlurView>
    );
};

export default NewEventScreen;
