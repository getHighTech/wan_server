
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

export const db =  new PouchDB('http://jiangshan.ml:5984/jiangshan', {
    username: 'admin',
    password: 'xsq@519'
});

