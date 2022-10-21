import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { INote } from '../models/note';

const tableName = 'notes';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'notes.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(username, date, details);`;

    await db.executeSql(query);
};

export const getNoteItems = async (db: SQLiteDatabase): Promise<INote[]> => {
    try {
        const noteItems: INote[] = [];
        const results = await db.executeSql(`SELECT rowid as id,username, date, details FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                noteItems.push(result.rows.item(index))
            }
        });
        return noteItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get noteItems !!!');
    }
};

export const saveNoteItems = async (db: SQLiteDatabase, noteItems: INote[]) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(rowid,username, date, details) values` +
        noteItems.map(i => `(${i.id}, '${i.username}', '${i.date}', '${i.details}')`).join(',');

    return db.executeSql(insertQuery);
};