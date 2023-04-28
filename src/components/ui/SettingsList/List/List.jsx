import React, { Children, cloneElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { fontSizes, fontWeights } from '../../../../theme/fonts';

const List = ({
    header,
    headerColor,
    hideDividers,
    children
}) => {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            { header && (
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
                        { header }
                    </Text>
                </View>
            ) }
            <View style={styles.listContainer}>
                { Children.map(children, (child, index) => {
                    const hideDivider = hideDividers || index === Children.count(children) - 1;
                    return cloneElement(child, { ...child.props, hideDivider });
                }) }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
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
        overflow: 'hidden'
    }
});

export default List;
