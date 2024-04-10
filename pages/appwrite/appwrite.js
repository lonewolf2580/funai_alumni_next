import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65cdbc3b42063b794d4e');

export const account = new Account(client);
export { ID } from 'appwrite';
