import React, { Children, cloneElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fontSizes, fontWeights } from '../../../../theme/fonts';
import { SCREEN_PADDING } from '../../../../theme';

const List = ({
    header,
    headerColor,
    hideDividers,
    style,
    children
}) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, style]}>
            { header && (
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                        { header }
                    </Text>
                </View>
            ) }
            <View style={styles.listContainer}>
                { Children.map(children, (child, index) => {
                    const isFirstRow = !index;
                    const isLastRow = index === Children.count(children) - 1;
                    const hideDivider = hideDividers || isLastRow;
                    return cloneElement(
                        child, {
                            ...child.props,
                            hideDivider,
                            radiusTop: isFirstRow,
                            radiusBottom: isLastRow
                        }
                    );
                }) }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: SCREEN_PADDING
    },
    headerContainer: {
        marginHorizontal: 15,
        marginBottom: 5
    },
    headerTitle: {
        fontSize: fontSizes.font12,
        fontWeight: fontWeights.low,
        color: 'white'
    },
    listContainer: {
        borderRadius: 10,
        // overflow: 'hidden'
    }
});

export default List;
