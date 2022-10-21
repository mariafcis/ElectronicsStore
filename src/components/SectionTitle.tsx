import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Constants from '../Constants';
import ArrowUpIcon from '../../assets/arrowUpIcon.svg';
import ArrowDownIcon from '../../assets/arrowDownIcon.svg';
import { Row } from './Row';
interface Props {
    title: string, onPress: () => void, showInfo: boolean
}
const SectionTitle = ({ title, onPress, showInfo }: Props) => {
    return (
        <Row>
            <Text style={styles.headerText}>{title}</Text>
            <TouchableOpacity onPress={onPress}>
                {showInfo ? <ArrowDownIcon /> : <ArrowUpIcon />}
            </TouchableOpacity>
        </Row>
    );
};

const styles = StyleSheet.create({
    headerText: {
        color: Constants.Text_Color,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export { SectionTitle };


