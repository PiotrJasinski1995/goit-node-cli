import * as fs from "node:fs/promises";
import * as path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

// helpers
const readContacts = async () => {
  // find file by path
  const data = await fs.readFile(contactsPath, "utf-8");
  // convert data to JSON
  return JSON.parse(data);
};

const writeContacts = async (contacts) => {
  // save new data to file
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// main functions
export const listContacts = async () => {
  return await readContacts();
};

export const getContactById = async (contactId) => {
  // read contacts
  const contacts = await readContacts();
  // filter JSON to find given contact
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  // read contacts
  const contacts = await readContacts();
  // find removed contact
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  // modify contacts
  const [removed] = contacts.splice(index, 1);
  // write contacts
  await writeContacts(contacts);
  return removed;
};

export const addContact = async (name, email, phone) => {
  // read contacts
  const contacts = await readContacts();
  // create new contact
  const newContact = { id: nanoid(21), name, email, phone };
  // add new contact
  contacts.push(newContact);
  // write contacts
  await writeContacts(contacts);
  return newContact;
};
