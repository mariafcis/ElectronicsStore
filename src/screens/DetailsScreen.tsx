import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Constants from '../Constants';
import { useNavigation } from '@react-navigation/native';
import { Hr } from '../components/Hr';
import { Row } from '../components/Row';
import { INote } from '../models/model';
import { createTable, getDBConnection, getNoteItems, saveNoteItems } from '../services/notes-db-service';
import Header from '../components/Header';
import { SectionTitle } from '../components/SectionTitle';
import { NotesSection } from '../components/NotesSection';
import { ModelSection } from '../components/ModelSection';

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  const [showModelInfo, setShowModelInfo] = useState(true);
  const [notes, setNotes] = useState<INote[]>([]);

  const model = props.route.params.model;
  const goBack = () => navigation.goBack();
  const windowWidth = Dimensions.get('window').width;

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const storedNoteItems = await getNoteItems(db);
      setNotes(storedNoteItems);
    } catch (error) {
      console.error(error);
    }
  }, []);


  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const onSave = async (newNote: string) => {
    let note: INote = { id: notes.length, username: 'Maria Nabil', date: new Date().toLocaleString(), details: newNote }
    const db = await getDBConnection();
    await saveNoteItems(db, [note])
    loadDataCallback()
  }

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
      <View style={styles.section}>
        <SectionTitle title='Image Info' onPress={() => setShowModelInfo(!showModelInfo)} showInfo={showModelInfo} />
        {showModelInfo ? renderModelInfoDetails() : null}
      </View>
    );
  };
  const renderBody = () => {
    return (
      <ScrollView style={styles.body}>
        {renderImage()}
        <Hr />
        {/* {renderModelInfo()} */}
        <ModelSection model={model} />
        <Hr />
        <NotesSection onSaveNotes={onSave} notes={notes} />
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Model Details'} goBack={goBack} />
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
  section: {
    flex: 1,
    marginVertical: 20
  },
});
