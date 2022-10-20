import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Constants from '../Constants';
import BackIcon from '../../assets/backIcon.svg';

const ModelScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <BackIcon />
        <Text style={styles.headerText}>Model</Text>
      </View>
    );
  };

  const renderModelItem = ({item}) => {
    console.log('renderModelItem', item);

    return (
      <TouchableOpacity
        style={{width: windowWidth * 0.5, alignItems: 'center'}}>
        <View
          style={[
            styles.modelItem,
            {width: windowWidth * 0.45, height: windowWidth * 0.45},
          ]}></View>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderBody = () => {
    return (
      <FlatList
        style={styles.flatList}
        numColumns={2}
        data={['printer HS', 'LCD XS', 'Laptops', 'Printer Inc']}
        renderItem={renderModelItem}></FlatList>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderBody()}
    </SafeAreaView>
  );
};

export default ModelScreen;

const styles = StyleSheet.create({
  container: {
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
  modelItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 20,
  },
  flatList: {
    marginTop: 20,
  },
});
