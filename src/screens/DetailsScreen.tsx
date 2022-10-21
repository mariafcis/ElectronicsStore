import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import Constants from '../Constants';
import BackIcon from '../../assets/backIcon.svg';
import ArrowUpIcon from '../../assets/arrowUpIcon.svg';
import ArrowDownIcon from '../../assets/arrowDownIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { Hr } from '../components/Hr';
import { Row } from '../components/Row';
import { INote } from '../models/model';
import { FlatList } from 'react-native-gesture-handler';
import SaveIcon from '../../assets/save.svg';
import { createTable, getDBConnection, getNoteItems, saveNoteItems } from '../services/notes-db-service';

const DetailsScreen = (props) => {
  const navigation = useNavigation();
  const [showModelInfo, setShowModelInfo] = useState(true);
  const [showModelNotes, setShowModelNotes] = useState(true);
  const [newNote, setNewNote] = useState(null);
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

  const onSave = async () => {
    let note: INote = { id: notes.length, username: 'Maria Nabil', date: new Date().toLocaleString(), details: newNote }
    const db = await getDBConnection();
    await saveNoteItems(db, [note])
    setNewNote(null)
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

  const renderSectionTitle = (title: string, onPress: () => void) => {
    return (
      <Row>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
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

  const renderOneNote = ({ item }: { item: INote }) => {
    return (
      <View>
        <Text style={styles.username}>
          {item.username}
        </Text>
        <Text>
          {item.date}
        </Text>
        <Text>
          {item.details}
        </Text>
      </View>
    )
  }

  const renderHistoryNotesHeader = () => <Text style={styles.historyNotes}>  History Notes</Text>
  const renderModelNotesDetails = () => {
    return (
      <View style={styles.historyNotes}>
        {renderNotesInput()}
        {renderHistoryNotesHeader()}
        <FlatList style={styles.notesList} data={notes} renderItem={renderOneNote} keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<Hr />}
        />
      </View>
    );
  };

  const renderModelInfo = () => {
    return (
      <View style={styles.section}>
        {renderSectionTitle('Image Info', () => setShowModelInfo(!showModelInfo))}
        {showModelInfo ? renderModelInfoDetails() : null}
      </View>
    );
  };

  const renderNotesInput = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={newNote}
          onChangeText={(text) => setNewNote(text)}
          style={styles.notesInput}
          placeholder={'Add a note'}
        ></TextInput>
        <TouchableOpacity style={{ marginStart: 10, justifyContent: 'center' }}
          onPress={onSave}
        >
          <SaveIcon />
        </TouchableOpacity>
      </View>
    )
  }

  const renderModelNotes = () => {
    return (
      <View style={styles.section}>
        {renderSectionTitle("Notes", () => setShowModelNotes(!showModelNotes))}
        {showModelNotes ? renderModelNotesDetails() : null}

      </View>
    )
  }
  const renderBody = () => {
    return (
      <ScrollView style={styles.body}>
        {renderImage()}
        <Hr />
        {renderModelInfo()}
        <Hr />
        {renderModelNotes()}
      </ScrollView>
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
  section: {
    flex: 1,
    marginVertical: 20
  },
  notesList: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginTop: 5
  },
  username: {
    fontWeight: 'bold', color: Constants.Text_Color
  },
  historyNotes: {
    marginTop: 10,
    color: Constants.Text_Color,
  },
  notesInput: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    flex: 1
  }
});
