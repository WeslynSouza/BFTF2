import { IDBPDatabase, openDB } from 'idb';

class IndexedDb {

    private datadabe: string;
    private db: any;

    constructor(database: string) {

        this.datadabe = database;
    }

    public async createObjectStore(tableNames: string[]) {
        try {
            this.db = await openDB(this.datadabe, 2, {
                upgrade(db: IDBPDatabase) {
                    for(const tableName of tableNames) {
                        if(db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName);
                    }
                },
            });
        } catch (error) {
            return false;
        }
    }

    public async getValue(tableName: string, key: string) {
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(key);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }

    public async putValue(tableName: string, value: object, key: string) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value, key);
        console.log('Put Data ', JSON.stringify(result));
        return result;
    }

    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if(!result) {
            console.log('Id não encontrado ', id);
            return result;
        }
        await store.delete(id);
        console.log('Delete Data ', id);
        return id;
    }
}

export default IndexedDb;