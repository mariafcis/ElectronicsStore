import React, { useEffect, useState, useCallback } from 'react';
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
import { IModel } from '../models/model';
import { useNavigation } from '@react-navigation/native';
import { createTable, getDBConnection, getModelItems, saveModelItems } from '../services/db-service';
import Header from '../components/Header';

const ModelScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();


  const [models, setModels] = useState<IModel[]>([]);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedModelItems = await getModelItems(db);
      if (storedModelItems.length) {
        setModels(storedModelItems);
      } else {
        await saveModelItems(db, Constants.initModels);
        setModels(Constants.initModels);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const goBack = () => navigation.goBack();
  const goToModelDetailsScreen = (model: IModel) => {
    navigation.navigate('ModelDetailsScreen', { model: model });
  };

  const renderModelItem = ({ item }: { item: IModel }) => {
    return (
      <TouchableOpacity
        style={{ width: windowWidth * 0.5, alignItems: 'center' }}
        onPress={() => goToModelDetailsScreen(item)}>
        <View
          style={[
            styles.modelItem,
            { width: windowWidth * 0.45, height: windowWidth * 0.45 },
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
      <Header title={'Model'} goBack={goBack} />
      {renderBody()}
    </SafeAreaView>
  );
};

export default ModelScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Background_Color,
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
