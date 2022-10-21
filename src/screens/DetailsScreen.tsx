import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from '../Constants';
import BackIcon from '../../assets/backIcon.svg';
import ArrowUpIcon from '../../assets/arrowUpIcon.svg';
import ArrowDownIcon from '../../assets/arrowDownIcon.svg';
import { IModel } from '../models/model';
import { useNavigation } from '@react-navigation/native';
import { Hr } from '../components/Hr';
import { Row } from '../components/Row';

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  const [showModelInfo, setShowModelInfo] = useState(true);

  const model = props.route.params.model;
  const goBack = () => navigation.goBack();
  const windowWidth = Dimensions.get('window').width;
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Model Details</Text>
      </View>
    );
  };

  const renderImage = () => {
    return (
      <View style={styles.image}>
        <Image
          style={{
            width: windowWidth * 0.45,
            height: windowWidth * 0.35,
            resizeMode: 'contain',
          }}
          source={Constants.Images[model.name]}
        />
      </View>
    );
  };

  const renderSectionTitle = (title: string) => {
    return (
      <Row>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={() => setShowModelInfo(!showModelInfo)}>
          {showModelInfo ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </TouchableOpacity>
      </Row>
    );
  };

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

  const renderModelInfo = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderSectionTitle('Image Info')}
        {showModelInfo ? renderModelInfoDetails() : null}
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        {renderImage()}
        <Hr />
        {renderModelInfo()}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderBody()}
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Background_Color,
    flex: 1,
  },
  header: {
    height: 55,
    backgroundColor: Constants.Header_Color,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: '#4E4E4E',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: Constants.Button_Color,
    borderRadius: 20,
  },
});
