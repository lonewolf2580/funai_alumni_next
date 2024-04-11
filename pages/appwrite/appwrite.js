import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65cdbc3b42063b794d4e');

export const databases = new Databases(client);
export const storage = new Storage(client);

export const account = new Account(client);
export { ID, Query } from 'appwrite';
