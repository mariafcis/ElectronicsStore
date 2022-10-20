import React from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import Constants from '../Constants';
import BackIcon from '../../assets/backIcon.svg';
import CheckIcon from '../../assets/checkIcon.svg';
import RoundButton from '../components/RoundButton';

const PictureScreen = () => {
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <BackIcon />
        <Text style={styles.headerText}>Picture</Text>
        <View style={styles.checkIcon}>
          <CheckIcon />
        </View>
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <RoundButton label="Asset Inventory" onPress={() => {}} />
        <RoundButton label="Model" onPress={() => {}} />
        <RoundButton label="Person" onPress={() => {}} />
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

export default PictureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Background_Color,
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
  checkIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 50,
  },
});
