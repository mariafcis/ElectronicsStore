import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "../Constants";
import BackIcon from '../../assets/backIcon.svg';

interface Props {
    title: string,
    goBack: () => void
}
const Header = (props: Props) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={props.goBack}>
                <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    headerText: {
        color: Constants.Text_Color,
        fontSize: 18,
        fontWeight: 'bold',
    },
    header: {
        height: 55,
        backgroundColor: Constants.Header_Color,
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
    }
});
