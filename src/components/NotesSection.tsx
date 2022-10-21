import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import SaveIcon from '../../assets/save.svg';
import Constants from '../Constants';
import { INote } from '../models/model';
import { Hr } from './Hr';
import { SectionTitle } from './SectionTitle';

interface Props {
    onSaveNotes: (newNote: string) => void,
    notes: INote[]
}
const NotesSection = ({ onSaveNotes, notes }: Props) => {
    const [newNote, setNewNote] = useState(null);
    const [showModelNotes, setShowModelNotes] = useState(true);

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
                    onPress={() => {
                        onSaveNotes(newNote)
                        setNewNote(null)
                    }}
                >
                    <SaveIcon />
                </TouchableOpacity>
            </View>
        )
    }

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

    return (
        <View style={styles.section}>
            <SectionTitle title='Notes' onPress={() => setShowModelNotes(!showModelNotes)} showInfo={showModelNotes} />
            {showModelNotes ? renderModelNotesDetails() : null}

        </View>
    )
};

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


export { NotesSection }