import React, { forwardRef } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SFSymbol } from 'react-native-sfsymbols';
import { fontSizes, fontWeights } from '../../../../theme/fonts';

const BORDER_RADIUS = 10;

const Row = forwardRef(({
    title,
    titleInfo,
    leading,
    trailing,
    hasArrow,
    editable,
    placeholder,
    hideDivider,
    checked,
    radiusTop,
    radiusBottom,
    style,
    onPress,
    onChange,
    onBlur,
    ...props
}, forwardedRef) => {
    const theme = useTheme();

    const getRadiusStyles = () => ({
        ...(radiusTop && styles.radiusTop),
        ...(radiusBottom && styles.radiusBottom),
    });

    const renderRowContent = () => (
        editable ? (
            <TextInput
                style={[StyleSheet.absoluteFillObject, styles.title, styles.editableText, { color: theme.colors.text }]}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
            />
        ) : (
            <View style={styles.contentContainer}>
                <View style={styles.titleBox}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        { title }
                    </Text>
                </View>
                <View style={styles.rightSideBox}>
                    { trailing ? trailing : null }
                    <Text style={[styles.titleInfo, { color: theme.colors.textSecondary }]}>
                        { titleInfo }
                    </Text>
                    { checked && (
                        <SFSymbol
                            name='checkmark'
                            scale='medium'
                            weight='semibold'
                            size={18}
                            resizeMode='center'
                            style={{ marginLeft: 10, width: 18, height: 18 }}
                        />
                    ) }
                    { hasArrow && (
                        <SFSymbol
                            name='chevron.forward'
                            scale='medium'
                            size={14}
                            color={theme.colors.textSecondary}
                            style={{ marginLeft: 10, width: 14, height: 14 }}
                        />
                    ) }
                </View>
                { !hideDivider && <View style={styles.divider} /> }
            </View>
        )
    );
    const renderRow = () => (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.card },
                getRadiusStyles(),
                style
            ]}
            ref={forwardedRef}
            { ...props }
        >
            { leading ? leading : null }
            { renderRowContent() }
        </View>
    );
    if(onPress) return (
        <TouchableHighlight onPress={onPress} style={[style, getRadiusStyles()]}>
            { renderRow() }
        </TouchableHighlight>
    );
    return renderRow();
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        minHeight: 40,
        backgroundColor: '#2B2D33',
        paddingLeft: 15
    },
    contentContainer: {
        // position: 'relative',
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15
    },

    titleBox: {},
    title: {
        fontSize: fontSizes.font16,
        fontWeight: fontWeights.low
    },

    rightSideBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleInfo: {
        fontSize: fontSizes.font16,
        fontWeight: fontWeights.low,
        color: 'rgba(255, 255, 255, .5)'
    },

    divider: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        // width: '100%',
        // borderBottomWidth: StyleSheet.hairlineWidth * 1.2,
        borderBottomWidth: 1,
        borderColor: 'rgba(145, 145, 145, .2)'
    },

    editableText: {
        paddingHorizontal: 15
    },

    radiusTop: {
        borderTopLeftRadius: BORDER_RADIUS,
        borderTopRightRadius: BORDER_RADIUS
    },
    radiusBottom: {
        borderBottomLeftRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS
    }
});

export default Row;
