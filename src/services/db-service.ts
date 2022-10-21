import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { IModel } from '../models/model';

const tableName = 'model';

enablePromise(true);

export const getDBConnection = async () => {
    return openDatabase({ name: 'model.db', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(name, code, type, cost, category, description, imageLink);`;

    await db.executeSql(query);
};

export const getModelItems = async (db: SQLiteDatabase): Promise<IModel[]> => {
    try {
        const modelItems: IModel[] = [];
        const results = await db.executeSql(`SELECT rowid as id,name,code,type,cost,category,description,imageLink FROM ${tableName}`);
        results.forEach(result => {
            for (let index = 0; index < result.rows.length; index++) {
                modelItems.push(result.rows.item(index))
            }
        });
        return modelItems;
    } catch (error) {
        console.error(error);
        throw Error('Failed to get modelItems !!!');
    }
};

export const saveModelItems = async (db: SQLiteDatabase, modelItems: IModel[]) => {
    const insertQuery =
        `INSERT OR REPLACE INTO ${tableName}(rowid,name,code,type,cost,category,description,imageLink) values` +
        modelItems.map(i => `(${i.id}, '${i.name}', '${i.code}', '${i.type}', '${i.cost}', '${i.category}', '${i.descripton}', '${i.imageLink}')`).join(',');

    return db.executeSql(insertQuery);
};