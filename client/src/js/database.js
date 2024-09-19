import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the database
  const db = await openDB('jate', 1);

  // Start a new transaction and specify the object store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Put content into the database (adds or updates an entry)
  const request = store.put({ id: 1, value: content });

  // Wait for the transaction to complete
  const result = await request;
  console.log('Data saved to the database', result);
};

// Method to get all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open the database
  const db = await openDB('jate', 1);

  // Start a new transaction and specify the object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get the data from the database (we're assuming we fetch by ID = 1)
  const request = store.get(1);

  // Wait for the transaction to complete
  const result = await request;
  console.log('Data retrieved from the database', result?.value);
  return result?.value;
};

// Initialize the database
initdb();
