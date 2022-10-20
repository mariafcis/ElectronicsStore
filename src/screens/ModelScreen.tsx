import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from '../Constants';
import BackIcon from '../../assets/backIcon.svg';
import {IModel} from '../models/model';
import {useNavigation} from '@react-navigation/native';

const models: IModel[] = [
  {
    id: 0,
    name: 'printer',
    code: 'Gt2000',
    type: 'Hello1',
    cost: 1000,
    category: '123',
    descripton: 'desc',
    imageLink: '',
  },
  {
    id: 1,
    name: 'lcd',
    code: 'Gt2000',
    type: 'Hello1',
    cost: 1000,
    category: '123',
    descripton: 'desc',
    imageLink: '',
  },
  {
    id: 2,
    name: 'laptop',
    code: 'Gt2000',
    type: 'Hello1',
    cost: 1000,
    category: '123',
    descripton: 'desc',
    imageLink: '',
  },
  {
    id: 3,
    name: 'inc',
    code: 'Gt2000',
    type: 'Hello1',
    cost: 1000,
    category: '123',
    descripton: 'desc',
    imageLink: '',
  },
];
const ModelScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  const goToModelDetailsScreen = (id: number) => {
    navigation.navigate('ModelDetailsScreen', {id: id});
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Model</Text>
      </View>
    );
  };

  const renderModelItem = ({item}: {item: IModel}) => {
    return (
      <TouchableOpacity
        style={{width: windowWidth * 0.5, alignItems: 'center'}}
        onPress={() => goToModelDetailsScreen(item.id)}>
        <View
          style={[
            styles.modelItem,
            {width: windowWidth * 0.45, height: windowWidth * 0.45},
          ]}>
          <Image
            style={{
              width: windowWidth * 0.45,
              height: windowWidth * 0.45,
              resizeMode: 'contain',
            }}
            source={Constants.Images[item.name]}
          />
        </View>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderBody = () => {
    return (
      <FlatList
        style={styles.flatList}
        numColumns={2}
        data={models}
        keyExtractor={(item, index) => `${item.id}`}
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
