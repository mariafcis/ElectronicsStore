import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { IModel } from '../models/model';
import { Row } from './Row';
import { SectionTitle } from './SectionTitle';

interface Props {
    model: IModel
}

const ModelSection = ({ model }: Props) => {
    const [showModelInfo, setShowModelInfo] = useState(true);

    const renderModelInfoDetails = () => {
        return (
            <View>
                <Row>
                    <Text>Model</Text>
                    <Text>{model.name}</Text>
                </Row>

                <Row>
                    <Text>Model Type</Text>
                    <Text>{model.type}</Text>
                </Row>

                <Row>
                    <Text>Cost</Text>
                    <Text>{model.cost}</Text>
                </Row>
            </View>
        );
    };


    return (
        <View style={styles.section}>
            <SectionTitle title='Image Info' onPress={() => setShowModelInfo(!showModelInfo)} showInfo={showModelInfo} />
            {showModelInfo ? renderModelInfoDetails() : null}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        flex: 1,
        marginVertical: 20
    },
});

export { ModelSection }