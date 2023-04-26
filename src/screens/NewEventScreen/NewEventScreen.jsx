import React from 'react';
import { ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from '@react-native-community/blur';
import { List, Row,  } from 'react-native-ios-list';
import { fontSizes, fontWeights } from '../../theme/fonts';

const NewEventScreen = () => {
    const insets = useSafeAreaInsets();

    const RowLeftText = ({ text = '' }) => (
        <Text style={[styles.rowText, styles.rowLeftText]}>
            { text }
        </Text>
    );

    return (
        <BlurView style={{ height: '100%' }} blurType='regular'>
            <ScrollView
                style={{
                    flex: 1,
                    height: '100%',
                    paddingTop: 30
                }}
                contentContainerStyle={{
                    paddingBottom: insets.bottom,
                    flexDirection: 'column',
                    gap: 20
                }}
                contentInsetAdjustmentBehavior='automatic'
            >
                {/* <List header='Name' headerColor='black' inset>
                    <Row>
                        <TextInput style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black' }]} />
                    </Row>
                </List>
                <List header='Date and Time' headerColor='black' inset>
                    <Row trailing={<Text style={[styles.rowText, styles.rowRightText]}>25.07.2023</Text>}>
                        <RowLeftText text='Date' />
                    </Row>
                    <Row trailing={<Text style={[styles.rowText, styles.rowRightText]}>00:00</Text>}>
                        <RowLeftText text='Time' />
                    </Row>
                </List>
                <List header='Action after timer expires' headerColor='black' inset>
                    <Row trailing={<Text style={[styles.rowText, styles.rowRightText]}>Not</Text>}>
                        <RowLeftText text='Repeat' />
                    </Row>
                </List>
                <List header='Notification' headerColor='black' inset>
                    <Row trailing={<Text>+_+_+_+_+_+_+_+_</Text>}>
                        <RowLeftText text='Send notification' />
                    </Row>
                </List>
                <List header='Image' headerColor='black' inset>
                    <Row trailing={<Text>+_+_+_+_+_+_+_+_</Text>}>
                        <RowLeftText text='Background image' />
                    </Row>
                </List>
                <List header='Timer interface' headerColor='black' inset>
                    <Row trailing={<Text>+_+_+_+_+_+_+_+_</Text>}>
                        <RowLeftText text='Font color' />
                    </Row>
                    <Row trailing={<Text>+_+_+_+_+_+_+_+_</Text>}>
                        <RowLeftText text='Font background color' />
                    </Row>
                    <Row trailing={<Text style={[styles.rowText, styles.rowRightText]}>40%</Text>}>
                        <RowLeftText text='Font background opacity' />
                    </Row>
                </List>
                <List header='Time display' headerColor='black' inset>
                    <Row>
                        <RowLeftText text='Year' />
                    </Row>
                    <Row>
                        <RowLeftText text='Month' />
                    </Row>
                    <Row>
                        <RowLeftText text='Week' />
                    </Row>
                    <Row>
                        <RowLeftText text='Day' />
                    </Row>
                    <Row>
                        <RowLeftText text='Hour' />
                    </Row>
                    <Row>
                        <RowLeftText text='Minute' />
                    </Row>
                    <Row>
                        <RowLeftText text='Second' />
                    </Row>
                </List> */}
            </ScrollView>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    rowText: {
        fontSize: fontSizes.font16,
        fontWeight: fontWeights.low
    },
    rowLeftText: {
        color: 'black'
    },
    rowRightText: {
        color: 'rgba(0, 0, 0, .5)'
    }
});

export default NewEventScreen;
